const LEVEL_THRESHOLDS = [
  0, 1907, 5722, 13351, 28610, 59128, 120163, 242234, 486374, 974656, 1951220,
  3904346, 7810600, 15623108, 31248122, 62498152, 124998212, 249998331,
  499998569, 999999046, 2000000000,
];

export function getLevelFromXP(xp: number): number {
  for (let level = LEVEL_THRESHOLDS.length - 1; level >= 0; level--) {
    if (xp >= LEVEL_THRESHOLDS[level]) {
      return level;
    }
  }
  return 0;
}
