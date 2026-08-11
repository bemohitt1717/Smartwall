/**
 * Generates the next wall name based on existing walls
 * @param {Array} walls - Array of existing walls
 * @param {Object|null} draftWall - Current draft wall if any
 * @returns {string} Wall name (e.g., "Wall 1", "Wall 2")
 */
export function generateWallName(walls, draftWall) {
  const wallCount = walls.length + (draftWall ? 1 : 0) + 1;
  return `Wall ${wallCount}`;
}
