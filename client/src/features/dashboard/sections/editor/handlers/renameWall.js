/**
 * Renames a wall (draft or saved)
 */
export function createRenameWallHandler({
  draftWall,
  setDraftWall,
  setWalls,
  recordHistory,
}) {
  return (wallId, newName) => {
    // Record history BEFORE renaming
    if (recordHistory) {
      recordHistory();
    }

    // ============================================
    // Rename draft wall
    // ============================================
    if (draftWall && draftWall.id === wallId) {
      setDraftWall((prev) => ({ ...prev, name: newName }));
      return;
    }

    // ============================================
    // Rename saved wall
    // ============================================
    setWalls((prevWalls) =>
      prevWalls.map((wall) =>
        wall.id === wallId ? { ...wall, name: newName } : wall
      )
    );
  };
}
