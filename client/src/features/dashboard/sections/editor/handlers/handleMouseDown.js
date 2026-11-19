import { getCanvasCoordinates, getCanvasDisplayScale, getNearbyControlPoint, isPointInsidePolygon } from '../geometry';
import { EDITOR_CONFIG, EDITOR_MODES } from '../constants';

/**
 * Handles mouse down events
 * Initiates dragging operations for selected wall points or, in DRAW mode,
 * the entire selected wall.
 */
export function createMouseDownHandler({
  canvasRef,
  mode, // ADD: Check current mode
  isDrawing, // ADD: Check current mode
  draftWall,
  selectedWallId,
  walls,
  isDraggingRef,
  dragPointIndexRef,
  dragWallIdRef,
  dragWallRef,
  dragStartPosRef,
  hasMovedRef,
  setIsDragging,
  recordHistory,
}) {
  return (e) => {
    const coords = getCanvasCoordinates(e, canvasRef.current);
    if (!coords) return;

    if (mode === EDITOR_MODES.DRAW && isDrawing) return;

    const selectedWall =
      draftWall?.id === selectedWallId
        ? draftWall
        : walls.find((wall) => wall.id === selectedWallId);
    if (!selectedWall) return;

    const displayScale = getCanvasDisplayScale(canvasRef.current);
    const pointIndex = getNearbyControlPoint(
      coords,
      selectedWall.points,
      EDITOR_CONFIG.CONTROL_POINT_HIT_RADIUS / displayScale,
    );

    if (pointIndex !== null) {
      recordHistory?.();
      isDraggingRef.current = true;
      dragPointIndexRef.current = pointIndex;
      dragWallIdRef.current = selectedWall.id;
      dragWallRef.current = false;
      hasMovedRef.current = true;
      setIsDragging(true);
      if (e.currentTarget.setPointerCapture) {
        e.currentTarget.setPointerCapture(e.pointerId);
      }
      return;
    }

    if (
      mode === EDITOR_MODES.DRAW &&
      isPointInsidePolygon(coords, selectedWall.points)
    ) {
      recordHistory?.();
      isDraggingRef.current = true;
      dragWallIdRef.current = selectedWall.id;
      dragWallRef.current = true;
      dragStartPosRef.current = coords;
      hasMovedRef.current = true;
      setIsDragging(true);
      if (e.currentTarget.setPointerCapture) {
        e.currentTarget.setPointerCapture(e.pointerId);
      }
    }
  };
}
