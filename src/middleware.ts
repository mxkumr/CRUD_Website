import { NextRequest, NextResponse } from 'next/server';

/**
 * Per-IP rate limiting (fixed window, in-memory).
 *
 * This is best-effort, per-server-instance protection against bursts and
 * cheap script abuse. Real volumetric DoS must be absorbed at the edge
 * (Cloudflare / Vercel WAF) — no app-level code can survive that.
 */

const WINDOW_MS = 60_000;
/** Page loads, prefetches, RSC requests */
const GET_LIMIT = 120;
/** Non-GET requests — the site is static, so keep this tight */
const MUTATION_LIMIT = 15;
/** Hard cap on tracked IPs so the limiter itself can't be memory-bombed */
const MAX_TRACKED_IPS = 10_000;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

function getClientIp(request: NextRequest): string {
  // Behind a proxy/CDN the left-most x-forwarded-for entry is the client.
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') ?? 'unknown';
}

function isRateLimited(key: string, limit: number): { limited: boolean; retryAfterSec: number } {
  const now = Date.now();

  // Prune expired buckets opportunistically; if the map is still oversized
  // (forged IP flood), reset it — losing counters is safer than OOM.
  if (buckets.size > MAX_TRACKED_IPS) {
    for (const [k, b] of buckets) {
      if (b.resetAt <= now) buckets.delete(k);
    }
    if (buckets.size > MAX_TRACKED_IPS) buckets.clear();
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, retryAfterSec: 0 };
  }

  bucket.count += 1;
  if (bucket.count > limit) {
    return { limited: true, retryAfterSec: Math.ceil((bucket.resetAt - now) / 1000) };
  }
  return { limited: false, retryAfterSec: 0 };
}

export function middleware(request: NextRequest) {
  const ip = getClientIp(request);
  const isMutation = request.method !== 'GET' && request.method !== 'HEAD';

  const { limited, retryAfterSec } = isMutation
    ? isRateLimited(`${ip}:mut`, MUTATION_LIMIT)
    : isRateLimited(`${ip}:get`, GET_LIMIT);

  if (limited) {
    return new NextResponse('Too many requests. Slow down.', {
      status: 429,
      headers: {
        'Retry-After': String(retryAfterSec),
        'Content-Type': 'text/plain',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  // Skip static assets — rate limiting them only hurts legitimate users.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff2?)$).*)'],
};
