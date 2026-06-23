import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import { colors, PAGE } from './theme';

const d = StyleSheet.create({
  /** Site-style section top border */
  sectionRule: {
    position: 'absolute',
    top: 0,
    left: PAGE.x,
    right: PAGE.x,
    borderTopWidth: 1,
    borderTopColor: colors.line,
  },
  /** Subtle dot field — echoes HeroCanvas particles */
  dotField: {
    position: 'absolute',
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 72,
  },
  particle: {
    width: 2,
    height: 2,
    borderRadius: 1,
    backgroundColor: colors.lineSolid,
    margin: 5,
  },
  /** Capabilities-style dashed orbit */
  dashedRing: {
    position: 'absolute',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: colors.lineSolid,
    borderRadius: 999,
  },
  /** Soft hue blob (capabilities gradient stand-in) */
  hueBlob: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.18,
  },
  /** Bento corner tile */
  bentoTile: {
    position: 'absolute',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.line,
    backgroundColor: colors.inkRaise,
  },
  /** Dark cover band */
  coverBand: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '38%',
    backgroundColor: colors.charcoal,
  },
  cardAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});

function DotField({ style, count = 20, fixed }: { style?: object; count?: number; fixed?: boolean }) {
  return (
    <View style={[d.dotField, style]} fixed={fixed}>
      {Array.from({ length: count }).map((_, i) => (
        <View key={i} style={d.particle} />
      ))}
    </View>
  );
}

/** Per-page chrome — line borders, dots, dashed rings (no heavy color fills) */
export function PageChrome({ hue = '#3F9DFF' }: { hue?: string }) {
  return (
    <>
      <View style={d.sectionRule} fixed />
      <DotField style={{ top: 36, right: 36 }} count={16} fixed />
      <View style={[d.dashedRing, { width: 100, height: 100, top: 28, right: 120, opacity: 0.45 }]} fixed />
      <View style={[d.hueBlob, { width: 140, height: 140, backgroundColor: hue, bottom: 60, left: -30 }]} fixed />
    </>
  );
}

/** Cover — dark left band + bento tiles on cream side */
export function CoverChrome() {
  return (
    <>
      <View style={d.coverBand} />
      <View style={[d.bentoTile, { top: 48, right: 48, width: 64, height: 64 }]} />
      <View style={[d.bentoTile, { top: 124, right: 124, width: 40, height: 40, backgroundColor: colors.inkSoft }]} />
      <View style={[d.bentoTile, { top: 124, right: 48, width: 72, height: 32, backgroundColor: colors.inkSoft }]} />
      <View style={[d.dashedRing, { width: 120, height: 120, top: 40, right: 200, opacity: 0.35 }]} />
      <DotField style={{ bottom: 72, right: 48 }} count={12} />
      <View style={[d.hueBlob, { width: 180, height: 180, backgroundColor: '#3FFFB5', bottom: -40, right: 80 }]} />
      <View style={[d.hueBlob, { width: 120, height: 120, backgroundColor: '#9D3FFF', top: 60, right: 280, opacity: 0.12 }]} />
    </>
  );
}

export function CardTopAccent({ color }: { color: string }) {
  return <View style={[d.cardAccent, { backgroundColor: color }]} />;
}
