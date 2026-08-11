import { getCanvasCoordinates, getNearbyControlPoint, isPointInsidePolygon } from '../geometry';
import { EDITOR_MODES } from '../constants';

/**
 * Handles mouse down events
 * Initiates dragging operations for control points or entire walls
 * ONLY in DRAW mode - SELECT mode doesn't allow stretching/dragging
 */
export function createMouseDownHandler({
  canvasRef,
  mode, // ADD: Check current mode
  draftWall,
  selectedWallId,
  walls,
  isDraggingRef,
  dragPointIndexRef,
  dragWallIdRef,
  dragWallRef,
  dragStartPosRef,
  recordHistory,
}) {
  return (e) => {
    const coords = getCanvasCoordinates(e, canvasRef.current);
    if (!coords) return;

    // ============================================
    // IMPORTANT: Only allow dragging in DRAW mode
    // SELECT mode = color change only, NO stretching
    // ============================================
    if (mode !== EDITOR_MODES.DRAW) {
      return; // Block all dragging in SELECT mode
    }

    // ============================================
    // Check draft wall first (DRAW mode only)
    // ============================================
    if (draftWall) {
      const pointIndex = getNearbyControlPoint(coords, draftWall.points);
      if (pointIndex !== null) {
        // Record history BEFORE starting drag
        if (recordHistory) {
          recordHistory();
        }
        isDraggingRef.current = true;
        dragPointIndexRef.current = pointIndex;
        dragWallIdRef.current = draftWall.id;
        dragWallRef.current = false;
        return;
      }

      // Check if clicking inside draft wall for entire wall drag
      if (isPointInsidePolygon(coords, draftWall.points)) {
        // Record history BEFORE starting drag
        if (recordHistory) {
          recordHistory();
        }
        isDraggingRef.current = true;
        dragWallIdRef.current = draftWall.id;
        dragWallRef.current = true;
        dragStartPosRef.current = coords;
        return;
      }
    }

    // ============================================
    // Check selected wall (DRAW mode only)
    // ============================================
    const selectedWall = walls.find((wall) => wall.id === selectedWallId);
    
    if (selectedWallId && selectedWall) {
      const pointIndex = getNearbyControlPoint(coords, selectedWall.points);
      if (pointIndex !== null) {
        // Record history BEFORE starting drag
        if (recordHistory) {
          recordHistory();
        }
        isDraggingRef.current = true;
        dragPointIndexRef.current = pointIndex;
        dragWallIdRef.current = selectedWallId;
        dragWallRef.current = false;
        return;
      }

      // Check if clicking inside selected wall for entire wall drag
      if (isPointInsidePolygon(coords, selectedWall.points)) {
        // Record history BEFORE starting drag
        if (recordHistory) {
          recordHistory();
        }
        isDraggingRef.current = true;
        dragWallIdRef.current = selectedWallId;
        dragWallRef.current = true;
        dragStartPosRef.current = coords;
        return;
      }
    }
  };
}
