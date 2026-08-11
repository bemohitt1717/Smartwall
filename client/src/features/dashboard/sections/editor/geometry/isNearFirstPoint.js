import { distance } from './distance';

/**
 * Checks if a new point is near the first point of a polygon (to close it)
 * @param {Object} newPoint - The new point {x, y}
 * @param {Array} points - Array of existing polygon points
 * @param {number} threshold - Distance threshold (default: 20)
 * @returns {boolean} True if near first point
 */
export function isNearFirstPoint(newPoint, points, threshold = 20) {
  if (points.length < 3) return false;
  
  const firstPoint = points[0];
  return distance(newPoint, firstPoint) < threshold;
}
