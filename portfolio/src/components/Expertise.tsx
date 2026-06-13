'use client';

import { useRef, useState } from 'react';
import * as THREE from 'three';
import { AnimatePresence, motion } from 'framer-motion';
import { dnaStrands, type DnaStrand } from '@/lib/data';
import { useThreeScene } from './useThreeScene';

const ease = [0.22, 1, 0.36, 1] as const;
const RUNGS = 44;
const BONE = new THREE.Color('#ECEAE3');
const ACCENT = new THREE.Color('#5B6CFF');

/* monochrome double helix; the active strand lights up in indigo */
function HelixCanvas({ activeRef }: { activeRef: React.MutableRefObject<number> }) {
  const ref = useThreeScene((ctx) => {
    const group = new THREE.Group();
    ctx.scene.add(group);

    const sphereGeo = new THREE.SphereGeometry(1, 12, 12);
    const nodeMats: THREE.MeshBasicMaterial[] = [];
    const rungMats: THREE.LineBasicMaterial[] = [];
    const nodeMeshes: { mesh: THREE.Mesh; strandIdx: number }[] = [];

    for (let i = 0; i < RUNGS; i++) {
      const angle = (i / RUNGS) * Math.PI * 5;
      const y = (i / RUNGS) * 7 - 3.5;
      const strandIdx = i % dnaStrands.length;

      const x1 = Math.cos(angle) * 1.4;
      const z1 = Math.sin(angle) * 1.4;
      const x2 = Math.cos(angle + Math.PI) * 1.4;
      const z2 = Math.sin(angle + Math.PI) * 1.4;

      const matA = new THREE.MeshBasicMaterial({ color: BONE, transparent: true, opacity: 0.35 });
      const matB = new THREE.MeshBasicMaterial({ color: BONE, transparent: true, opacity: 0.35 });
      nodeMats.push(matA, matB);

      const meshA = new THREE.Mesh(sphereGeo, matA);
      meshA.position.set(x1, y, z1);
      meshA.scale.setScalar(0.05);
      const meshB = new THREE.Mesh(sphereGeo, matB);
      meshB.position.set(x2, y, z2);
      meshB.scale.setScalar(0.05);
      group.add(meshA, meshB);
      nodeMeshes.push({ mesh: meshA, strandIdx }, { mesh: meshB, strandIdx });

      const rungGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x1, y, z1),
        new THREE.Vector3(x2, y, z2),
      ]);
      const rungMat = new THREE.LineBasicMaterial({ color: BONE, transparent: true, opacity: 0.12 });
      rungMats.push(rungMat);
      const rung = new THREE.Line(rungGeo, rungMat);
      (rung as unknown as { strandIdx: number }).strandIdx = strandIdx;
      group.add(rung);
    }

    return {
      update: (_c, _t, delta) => {
        group.rotation.y += delta * 0.22;
        const active = activeRef.current;
        nodeMeshes.forEach(({ mesh, strandIdx }) => {
          const isActive = strandIdx === active;
          mesh.scale.setScalar(isActive ? 0.09 : 0.05);
          const mat = mesh.material as THREE.MeshBasicMaterial;
          mat.color.copy(isActive ? ACCENT : BONE);
          mat.opacity = isActive ? 1 : 0.3;
        });
        group.children.forEach((child) => {
          const line = child as unknown as { strandIdx?: number; material?: THREE.LineBasicMaterial };
          if (line.strandIdx !== undefined && line.material) {
            const isActive = line.strandIdx === active;
            line.material.color.copy(isActive ? ACCENT : BONE);
            line.material.opacity = isActive ? 0.7 : 0.1;
          }
        });
      },
      dispose: () => {
        sphereGeo.dispose();
        nodeMats.forEach((m) => m.dispose());
        rungMats.forEach((m) => m.dispose());
      },
    };
  }, 6.5, 50);

  return <div ref={ref} className="h-full w-full" aria-hidden />;
}

export default function Expertise() {
  const [active, setActive] = useState<DnaStrand>(dnaStrands[0]);
  const activeRef = useRef(0);

  const select = (s: DnaStrand) => {
    setActive(s);
    activeRef.current = dnaStrands.indexOf(s);
  };

  return (
    <section id="expertise" className="relative mx-auto max-w-7xl px-5 py-28 md:px-10">
      <div className="mb-14">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-mute">[ 05 — Expertise ]</p>
        <h2 className="font-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
          <span className="text-gradient">A multidisciplinary</span>{' '}
          <span className="text-outline">stack</span>
        </h2>
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative order-2 h-[380px] lg:order-1 lg:h-[520px]">
          <HelixCanvas activeRef={activeRef} />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ background: 'radial-gradient(60% 60% at 50% 50%, transparent 55%, #08080b 100%)' }}
          />
        </div>

        <div className="order-1 lg:order-2">
          <div className="flex flex-wrap gap-2.5">
            {dnaStrands.map((s) => (
              <button
                key={s.id}
                onClick={() => select(s)}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-all ${
                  active.id === s.id
                    ? 'border-accent bg-accent text-white'
                    : 'border-line text-mute hover:border-bone/40 hover:text-bone'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease }}
              className="mt-7 rounded-3xl border border-line bg-ink-2 p-7"
            >
              <div className="flex items-center gap-3">
                <span className="h-2.5 w-2.5 rounded-full bg-accent" />
                <h3 className="font-display text-2xl font-bold text-bone">{active.label}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mute">{active.detail.experience}</p>

              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute">Projects</p>
                  <ul className="mt-2 space-y-1.5">
                    {active.detail.projects.map((p) => (
                      <li key={p} className="flex gap-2 text-sm text-bone/80">
                        <span className="text-accent-soft">▸</span> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-mute">Achievements</p>
                  <ul className="mt-2 space-y-1.5">
                    {active.detail.achievements.map((a) => (
                      <li key={a} className="flex gap-2 text-sm text-bone/80">
                        <span className="text-accent-soft">★</span> {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                {active.detail.tools.map((t) => (
                  <span key={t} className="rounded-md border border-line bg-ink px-2.5 py-1 font-mono text-[11px] text-mute">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
