'use client';

import * as THREE from 'three';
import { motion } from 'framer-motion';
import { identity } from '@/lib/data';
import { useThreeScene } from './useThreeScene';

const credentials = ['ICSE 2026 · A* Publication', '2× Founder', '50+ Projects Shipped'];

/* ============================================================
   Ambient 3D object — a slowly rotating wireframe icosahedron
   wrapped in a thin point cloud. Monochrome + indigo, reacts
   subtly to the pointer. Tasteful, not a takeover.
   ============================================================ */
function AmbientObject() {
  const ref = useThreeScene((ctx) => {
    const group = new THREE.Group();
    ctx.scene.add(group);

    // wireframe core
    const geo = new THREE.IcosahedronGeometry(1.7, 1);
    const wire = new THREE.WireframeGeometry(geo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x5b6cff, transparent: true, opacity: 0.45 });
    const mesh = new THREE.LineSegments(wire, lineMat);
    group.add(mesh);

    // solid faint inner shell
    const shellMat = new THREE.MeshBasicMaterial({ color: 0x14141b, transparent: true, opacity: 0.55 });
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1.66, 1), shellMat);
    group.add(shell);

    // surrounding point cloud
    const COUNT = 1400;
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const r = 2.5 + Math.random() * 0.9;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    const ptsGeo = new THREE.BufferGeometry();
    ptsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const ptsMat = new THREE.PointsMaterial({ size: 0.014, color: 0xeceae3, transparent: true, opacity: 0.55, sizeAttenuation: true, depthWrite: false });
    const pts = new THREE.Points(ptsGeo, ptsMat);
    group.add(pts);

    const mouse = { x: 0, y: 0 };

    return {
      update: (c, _t, delta) => {
        mouse.x += (c.pointer.x - mouse.x) * 0.04;
        mouse.y += (c.pointer.y - mouse.y) * 0.04;
        group.rotation.y += delta * 0.14;
        group.rotation.x = mouse.y * 0.3;
        group.rotation.z = mouse.x * 0.12;
        pts.rotation.y -= delta * 0.05;
      },
      dispose: () => {
        geo.dispose();
        wire.dispose();
        lineMat.dispose();
        shellMat.dispose();
        shell.geometry.dispose();
        ptsGeo.dispose();
        ptsMat.dispose();
      },
    };
  }, 5.4, 50);

  return <div ref={ref} className="h-full w-full" aria-hidden />;
}

export default function Hero() {
  return (
    <section id="hero" className="grain relative flex min-h-screen items-center overflow-hidden">
      {/* ambient 3D, right-biased */}
      <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
        <AmbientObject />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(70% 70% at 70% 50%, transparent 30%, #08080b 78%), linear-gradient(90deg, #08080b 18%, transparent 60%)' }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.35em] text-accent-soft"
        >
          <span className="h-px w-8 bg-accent" /> Security researcher · founder · designer
        </motion.p>

        <h1 className="mt-6 font-display text-[15vw] font-bold uppercase leading-[0.86] tracking-[-0.03em] sm:text-[12vw] lg:text-[8.5rem]">
          {['Manish', 'Kumar', 'Bala Kumar'].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.15 + i * 0.1, ease: [0.65, 0, 0.13, 1] }}
                className={`block ${i === 2 ? 'text-outline' : 'text-gradient'}`}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-mute"
        >
          I research how systems break, design how they should feel, and build ventures that teach others to do both. Currently turning{' '}
          <span className="text-bone">9.14 billion data points</span> into an{' '}
          <span className="text-bone">ICSE 2026</span> publication.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2.5 rounded-full bg-bone px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-ink transition-transform hover:scale-[1.03]"
          >
            View work
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 rounded-full border border-line px-7 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-bone transition-colors hover:border-accent/60"
          >
            Get in touch
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-mute"
        >
          {credentials.map((c) => (
            <li key={c} className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full bg-accent" /> {c}
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="pointer-events-none absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-mute">scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-7 w-px bg-gradient-to-b from-accent to-transparent"
        />
      </div>
    </section>
  );
}
