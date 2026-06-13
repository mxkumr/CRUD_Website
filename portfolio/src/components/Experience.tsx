'use client';

import dynamic from 'next/dynamic';
import SmoothScroll from './SmoothScroll';
import Nav from './Nav';
import Intro from './Intro';
import Work from './Work';
import Research from './Research';
import Ventures from './Ventures';
import Lab from './Lab';
import Timeline from './Timeline';
import Contact from './Contact';

/* WebGL sections load client-side only, keeping first paint instant */
const Hero = dynamic(() => import('./Hero'), {
  ssr: false,
  loading: () => (
    <div className="flex h-screen items-center justify-center font-mono text-xs uppercase tracking-[0.4em] text-mute">
      loading…
    </div>
  ),
});
const Expertise = dynamic(() => import('./Expertise'), { ssr: false });

export default function Experience() {
  return (
    <SmoothScroll>
      <Nav />
      <main className="relative">
        <Hero />
        <Intro />
        <Work />
        <Research />
        <Ventures />
        <Expertise />
        <Lab />
        <Timeline />
        <Contact />
      </main>
    </SmoothScroll>
  );
}
