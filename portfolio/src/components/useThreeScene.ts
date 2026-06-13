'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type ThreeContext = {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  clock: THREE.Clock;
  pointer: THREE.Vector2;
};

type SetupResult = {
  /** called every frame with elapsed + delta seconds */
  update: (ctx: ThreeContext, elapsed: number, delta: number) => void;
  /** optional cleanup of geometries/materials */
  dispose?: () => void;
};

/**
 * Minimal vanilla-three.js mount hook — replaces @react-three/fiber.
 * Handles renderer creation, resize, pointer tracking, RAF loop and teardown.
 */
export function useThreeScene(
  setup: (ctx: ThreeContext) => SetupResult,
  cameraZ = 6,
  fov = 55
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fov, 1, 0.1, 100);
    camera.position.z = cameraZ;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';

    const clock = new THREE.Clock();
    const pointer = new THREE.Vector2(0, 0);
    const ctx: ThreeContext = { scene, camera, renderer, clock, pointer };

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener('resize', resize);

    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointer);

    const { update, dispose } = setupRef.current(ctx);

    let raf = 0;
    const loop = () => {
      const delta = clock.getDelta();
      const elapsed = clock.elapsedTime;
      update(ctx, elapsed, delta);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointer);
      dispose?.();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [cameraZ, fov]);

  return containerRef;
}
