/**
 * Converts HEX color to RGBA format
 * @param {string} hex - HEX color code (e.g., "#6366F1")
 * @param {number} alpha - Alpha value between 0 and 1
 * @returns {string} RGBA color string (e.g., "rgba(99, 102, 241, 0.5)")
 */
export function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
