import { DetectionType, PurifyMetadata } from './PurifyModel';
import { RegionType, Rules } from './rules';

export function toPriority(
  dt: DetectionType,
  mapping: { [r in RegionType]: DetectionType[] }
): number {
  if (mapping.FOCUS.includes(dt)) return 0;
  if (mapping.HARD_PUNISH.includes(dt)) return 1;
  if (mapping.SOFT_PUNISH.includes(dt)) return 2;
  return 3;
}

export function sortByRelevance(
  a: DetectionType,
  b: DetectionType,
  mapping: { [r in RegionType]: DetectionType[] }
): number {
  return toPriority(a, mapping) - toPriority(b, mapping);
}

export function detectionToRegionType(
  name: DetectionType,
  mapping: { [r in RegionType]: DetectionType[] }
): RegionType | undefined {
  if (mapping.FOCUS.some((e) => e === name)) {
    return 'FOCUS';
  }

  if (mapping.HARD_PUNISH.some((e) => e === name)) {
    return 'HARD_PUNISH';
  }

  if (mapping.SOFT_PUNISH.some((e) => e === name)) {
    return 'SOFT_PUNISH';
  }
  return undefined;
}

export function countHardPunishedZones(
  meta: PurifyMetadata,
  rules: Rules
): number {
  return meta.output.detections.filter((detection) =>
    rules.regionMapping.HARD_PUNISH.includes(detection.name)
  ).length;
}
