/**
 * Deletes the currently selected wall
 * Auto-selects another wall if available
 */
export function createDeleteWallHandler({
  selectedWallId,
  draftWall,
  setDraftWall,
  setWalls,
  setSelectedWallId,
  setPreviewColor,
  setPreviewOpacity,
  recordHistory,
}) {
  return () => {
    if (!selectedWallId) return;

    // Record history BEFORE deleting
    if (recordHistory) {
      recordHistory();
    }

    // ============================================
    // Delete draft wall
    // ============================================
    if (draftWall && draftWall.id === selectedWallId) {
      setDraftWall(null);
      setSelectedWallId(null);
      return;
    }

    // ============================================
    // Delete saved wall
    // ============================================
    setWalls((prevWalls) => {
      const filtered = prevWalls.filter((wall) => wall.id !== selectedWallId);
      
      // Auto-select another wall after deletion
      if (filtered.length > 0) {
        const nextWall = filtered[filtered.length - 1];
        setSelectedWallId(nextWall.id);
        setPreviewColor(nextWall.color);
        setPreviewOpacity(nextWall.opacity);
      } else {
        setSelectedWallId(null);
      }
      
      return filtered;
    });
  };
}
