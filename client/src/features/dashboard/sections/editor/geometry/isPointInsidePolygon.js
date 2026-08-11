/**
 * Determines if a point is inside a polygon using ray-casting algorithm
 * @param {Object} point - Point to test {x, y}
 * @param {Array} polygon - Array of polygon points
 * @returns {boolean} True if point is inside polygon
 */
export function isPointInsidePolygon(point, polygon) {
  let inside = false;
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x;
    const yi = polygon[i].y;
    const xj = polygon[j].x;
    const yj = polygon[j].y;

    const intersect =
      yi > point.y !== yj > point.y &&
      point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;

    if (intersect) inside = !inside;
  }
  
  return inside;
}
