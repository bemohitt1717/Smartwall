import { getCanvasCoordinates, isNearFirstPoint, isPointInsidePolygon } from '../geometry';
import { generateId, generateWallName } from '../utils';
import { EDITOR_MODES } from '../constants';

/**
 * Handles canvas click events
 * Mode-aware: behavior changes based on current editor mode
 */
export function createCanvasClickHandler({
  canvasRef,
  mode,
  isDrawing,
  currentPoints,
  walls,
  draftWall,
  previewColor,
  previewOpacity,
  hasMovedRef,
  setIsDrawing,
  setCurrentPoints,
  setDraftWall,
  setSelectedWallId,
  setPreviewColor,
  setPreviewOpacity,
  setWalls,
  setMode, // ADD: To switch mode after polygon closes
  recordHistory,
}) {
  return (e) => {
    // FIX: Ignore clicks that were actually drags
    if (hasMovedRef.current) {
      return;
    }

    const coords = getCanvasCoordinates(e, canvasRef.current);
    if (!coords) return;

    // ============================================
    // DRAW MODE: Adding polygon points
    // ============================================
    if (mode === EDITOR_MODES.DRAW && isDrawing) {
      // Check if near first point to close polygon
      if (isNearFirstPoint(coords, currentPoints)) {
        // Record history BEFORE closing polygon
        if (recordHistory) {
          recordHistory();
        }
        
        setIsDrawing(false);
        
        // Create draft wall immediately
        const newDraftWall = {
          id: generateId(),
          name: generateWallName(walls, draftWall),
          points: [...currentPoints],
          color: previewColor,
          opacity: previewOpacity,
          isDraft: true,
        };
        setDraftWall(newDraftWall);
        setSelectedWallId(newDraftWall.id);
        setCurrentPoints([]);
        
        // Automatically switch to SELECT mode after polygon closes
        setMode(EDITOR_MODES.SELECT);
        return;
      }

      // Add new point
      setCurrentPoints((prev) => [...prev, coords]);
      return;
    }

    // ============================================
    // SELECT MODE: Wall selection
    // ============================================
    
    // Check if clicking on draft wall
    if (draftWall && isPointInsidePolygon(coords, draftWall.points)) {
      setSelectedWallId(draftWall.id);
      setPreviewColor(draftWall.color);
      setPreviewOpacity(draftWall.opacity);
      return;
    }

    // Check if clicking on existing wall
    const clickedWall = walls.find((wall) =>
      isPointInsidePolygon(coords, wall.points)
    );

    if (clickedWall) {
      setSelectedWallId(clickedWall.id);
      setPreviewColor(clickedWall.color);
      setPreviewOpacity(clickedWall.opacity);
      return;
    }

    // Clicked on empty space in SELECT mode - deselect all
    if (mode === EDITOR_MODES.SELECT) {
      setSelectedWallId(null);
      return;
    }

    // ============================================
    // Empty space clicked: Start new polygon (DRAW mode only)
    // ============================================
    if (mode === EDITOR_MODES.DRAW) {
      // Check if clicking on ANY wall (saved + draft)
      const clickedOnAnyWall = 
        (draftWall && isPointInsidePolygon(coords, draftWall.points)) ||
        walls.some(wall => isPointInsidePolygon(coords, wall.points));
      
      if (!clickedOnAnyWall) {
        // Convert draft wall to saved before starting new polygon
        if (draftWall) {
          const savedWall = {
            ...draftWall,
            isDraft: false,
          };
          delete savedWall.isDraft;
          setWalls((prev) => [...prev, savedWall]);
          setDraftWall(null);
        }
        
        // Start new polygon
        setSelectedWallId(null);
        setIsDrawing(true);
        setCurrentPoints([coords]);
      }
    }
  };
}
