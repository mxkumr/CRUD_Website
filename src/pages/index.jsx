import MacbookScrollDemo from '@/components/ui/macbook-scroll-demo'

export default function Home() {
  return (
    <>
      <section className="relative left-1/2 mb-16 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-hidden">
        <MacbookScrollDemo />
      </section>
      <h1 className="text-3xl font-semibold tracking-tight">Next.js</h1>
      <p className="mt-4 text-neutral-600">
        Edit{' '}
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm text-neutral-900 ring-1 ring-neutral-200">
          src/pages/index.jsx
        </code>{' '}
        to get started. Shared UI lives under{' '}
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm text-neutral-900 ring-1 ring-neutral-200">
          src/components
        </code>{' '}
        and{' '}
        <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-sm text-neutral-900 ring-1 ring-neutral-200">
          src/layouts
        </code>
        .
      </p>
    </>
  )
}
