import { getCanvasCoordinates } from '../geometry';

/**
 * Handles mouse move events
 * Updates wall/point positions during drag operations
 */
export function createMouseMoveHandler({
  canvasRef,
  draftWall,
  isDraggingRef,
  dragWallRef,
  dragStartPosRef,
  dragWallIdRef,
  dragPointIndexRef,
  hasMovedRef,
  setDraftWall,
  setWalls,
}) {
  return (e) => {
    if (!isDraggingRef.current) return;

    // FIX: Mark that we're actually dragging
    hasMovedRef.current = true;

    const coords = getCanvasCoordinates(e, canvasRef.current);
    if (!coords) return;

    const wallId = dragWallIdRef.current;
    
    // ============================================
    // Entire wall dragging
    // ============================================
    if (dragWallRef.current && dragStartPosRef.current) {
      const deltaX = coords.x - dragStartPosRef.current.x;
      const deltaY = coords.y - dragStartPosRef.current.y;

      // Update draft wall
      if (draftWall && draftWall.id === wallId) {
        setDraftWall((prev) => ({
          ...prev,
          points: prev.points.map((point) => ({
            x: point.x + deltaX,
            y: point.y + deltaY,
          })),
        }));
        dragStartPosRef.current = coords;
        return;
      }

      // Update saved wall
      setWalls((prevWalls) =>
        prevWalls.map((wall) => {
          if (wall.id === wallId) {
            return {
              ...wall,
              points: wall.points.map((point) => ({
                x: point.x + deltaX,
                y: point.y + deltaY,
              })),
            };
          }
          return wall;
        })
      );
      dragStartPosRef.current = coords;
      return;
    }

    // ============================================
    // Single point dragging
    // ============================================
    const pointIndex = dragPointIndexRef.current;

    // Update draft wall point
    if (draftWall && draftWall.id === wallId) {
      setDraftWall((prev) => ({
        ...prev,
        points: prev.points.map((point, idx) =>
          idx === pointIndex ? coords : point
        ),
      }));
      return;
    }

    // Update saved wall point
    setWalls((prevWalls) =>
      prevWalls.map((wall) => {
        if (wall.id === wallId) {
          const newPoints = [...wall.points];
          newPoints[pointIndex] = coords;
          return { ...wall, points: newPoints };
        }
        return wall;
      })
    );
  };
}
