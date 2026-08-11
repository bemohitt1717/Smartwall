import { generateId, generateWallName } from '../utils';

/**
 * Applies color to the selected wall (draft or saved)
 */
export function createApplyColorHandler({
  draftWall,
  selectedWallId,
  isDrawing,
  currentPoints,
  previewColor,
  previewOpacity,
  walls,
  setWalls,
  setDraftWall,
  setSelectedWallId,
  setCurrentPoints,
  recordHistory,
}) {
  return () => {
    // Record history BEFORE applying color
    if (recordHistory) {
      recordHistory();
    }

    // ============================================
    // Convert draft wall to saved wall
    // ============================================
    if (draftWall && draftWall.id === selectedWallId) {
      const savedWall = {
        ...draftWall,
        color: previewColor,
        opacity: previewOpacity,
        isDraft: false,
      };
      delete savedWall.isDraft;
      
      setWalls((prev) => [...prev, savedWall]);
      setDraftWall(null);
      setSelectedWallId(savedWall.id);
      return;
    }

    // ============================================
    // Update existing saved wall
    // ============================================
    if (selectedWallId) {
      setWalls((prevWalls) =>
        prevWalls.map((wall) =>
          wall.id === selectedWallId
            ? { ...wall, color: previewColor, opacity: previewOpacity }
            : wall
        )
      );
      return;
    }

    // ============================================
    // Legacy: Create wall from current polygon (fallback)
    // ============================================
    if (!isDrawing && currentPoints.length >= 3) {
      const newWall = {
        id: generateId(),
        name: generateWallName(walls, draftWall),
        points: [...currentPoints],
        color: previewColor,
        opacity: previewOpacity,
      };

      setWalls((prev) => [...prev, newWall]);
      setCurrentPoints([]);
      setSelectedWallId(newWall.id);
    }
  };
}
