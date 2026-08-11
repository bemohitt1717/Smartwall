import { distance } from './distance';

/**
 * Finds a control point near the click position
 * @param {Object} clickPoint - Click position {x, y}
 * @param {Array} points - Array of control points
 * @param {number} threshold - Distance threshold (default: 12)
 * @returns {number|null} Index of nearby point or null
 */
export function getNearbyControlPoint(clickPoint, points, threshold = 12) {
  for (let i = 0; i < points.length; i++) {
    if (distance(clickPoint, points[i]) < threshold) {
      return i;
    }
  }
  return null;
}
