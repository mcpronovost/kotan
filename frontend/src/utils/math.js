export const mokpClamp = (value, min, max) => Math.max(min, Math.min(max, value));

export const mokpGridDistance = (x1, y1, x2, y2) => Math.hypot(x1 - x2, y1 - y2);

export const mokpIndex2Coords = (index, totalCols) => {
  const x = index % totalCols;
  const y = Math.floor(index / totalCols);
  return [x, y];
};

export const mokpCoords2Index = (x, y, totalCols) => {
  return (y - 1) * totalCols + (x - 1);
};
