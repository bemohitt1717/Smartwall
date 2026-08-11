/**
 * Generates a unique ID for walls
 * @returns {string} Unique wall ID
 */
export function generateId() {
  return `wall_${Date.now()}_${Math.random()}`;
}
