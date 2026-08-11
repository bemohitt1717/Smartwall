/**
 * Selects a wall from dropdown
 * Updates preview colors to match selected wall
 */
export function createSelectWallHandler({
  draftWall,
  walls,
  setSelectedWallId,
  setPreviewColor,
  setPreviewOpacity,
}) {
  return (wallId) => {
    // ============================================
    // Select draft wall
    // ============================================
    if (draftWall && draftWall.id === wallId) {
      setSelectedWallId(wallId);
      setPreviewColor(draftWall.color);
      setPreviewOpacity(draftWall.opacity);
      return;
    }

    // ============================================
    // Select saved wall
    // ============================================
    const wall = walls.find((w) => w.id === wallId);
    if (wall) {
      setSelectedWallId(wallId);
      setPreviewColor(wall.color);
      setPreviewOpacity(wall.opacity);
    }
  };
}
