/**
 * Calculates Euclidean distance between two points
 * @param {Object} point1 - First point {x, y}
 * @param {Object} point2 - Second point {x, y}
 * @returns {number} Distance between points
 */
export function distance(point1, point2) {
  return Math.sqrt(
    (point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2
  );
}
