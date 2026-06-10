'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Custom cursor: a small dot that snaps to the pointer plus a trailing ring.
 * Elements opt into states via data attributes:
 *   data-cursor="hover"  -> ring grows (links / buttons)
 *   data-cursor="view"   -> ring becomes a filled "View" badge (work cards)
 *   data-cursor="text"   -> ring shrinks to a caret-ish bar (inputs)
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [variant, setVariant] = useState<'default' | 'hover' | 'view' | 'text'>('default');
  const [pressed, setPressed] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 400, damping: 38, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 400, damping: 38, mass: 0.6 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    if (!finePointer.matches) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-cursor]');
      if (target) {
        setVariant((target.dataset.cursor as 'hover' | 'view' | 'text') ?? 'hover');
      } else {
        setVariant('default');
      }
    };
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize =
    variant === 'view' ? 88 : variant === 'hover' ? 56 : variant === 'text' ? 4 : 36;

  return (
    <>
      {/* Trailing ring / badge */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[120] flex items-center justify-center rounded-full"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: ringSize,
          height: variant === 'text' ? 28 : ringSize,
          scale: pressed ? 0.85 : 1,
          backgroundColor: variant === 'view' ? '#D9FF3F' : 'rgba(217, 255, 63, 0)',
          borderColor:
            variant === 'default' ? 'rgba(237, 234, 227, 0.4)' : 'rgba(217, 255, 63, 0.9)',
          borderRadius: variant === 'text' ? 2 : 999,
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        initial={false}
      >
        <div className="absolute inset-0 rounded-[inherit] border" style={{ borderColor: 'inherit' }} />
        <motion.span
          className="font-display text-[11px] font-medium uppercase tracking-widest text-ink"
          animate={{ opacity: variant === 'view' ? 1 : 0, scale: variant === 'view' ? 1 : 0.5 }}
          transition={{ duration: 0.18 }}
        >
          View
        </motion.span>
      </motion.div>

      {/* Dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[121] h-1.5 w-1.5 rounded-full bg-volt"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: variant === 'view' ? 0 : 1 }}
      />
    </>
  );
}
