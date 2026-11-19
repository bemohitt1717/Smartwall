/**
 * Handles mouse up events
 * Ends drag operations and resets drag state
 */
export function createMouseUpHandler({
  isDraggingRef,
  dragPointIndexRef,
  dragWallIdRef,
  dragWallRef,
  dragStartPosRef,
  hasMovedRef,
  setIsDragging,
  setHoveredPointIndex,
}) {
  return () => {
    // Reset drag state
    isDraggingRef.current = false;
    dragPointIndexRef.current = null;
    dragWallIdRef.current = null;
    dragWallRef.current = false;
    dragStartPosRef.current = null;
    setIsDragging(false);
    setHoveredPointIndex(null);
    
    // FIX: Reset movement flag after a tiny delay to let onClick fire first
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 10);
  };
}
