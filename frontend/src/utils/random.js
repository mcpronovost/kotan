/**
 * Creates a deterministic pseudo-random number generator using the
 * Mulberry32 algorithm.
 *
 * The returned function generates a sequence of pseudo-random numbers
 * between 0 (inclusive) and 1 (exclusive). The same seed always produces
 * the same sequence.
 *
 * @param {number} seed - The initial seed for the random number generator.
 * @returns {() => number} A function that generates the next pseudo-random number.
 */
export const mokpSeed = (seed) => {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

/**
 * Generates a deterministic numeric seed from a string.
 *
 * The same string always produces the same seed, making it suitable
 * for reproducible procedural generation.
 *
 * @param {string} str - The string to convert into a numeric seed.
 * @returns {number} A 32-bit unsigned integer derived from the string.
 */
export const mokpStr2Seed = (str) => {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return (h ^ (h >>> 16)) >>> 0;
};
