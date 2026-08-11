import { drawPolygon } from './drawPolygon';
import { drawControlPoints } from './drawControlPoints';
import { drawCurrentPolygon } from './drawCurrentPolygon';

/**
 * Main canvas rendering function
 * Orchestrates all drawing operations
 * @param {Object} params - Drawing parameters
 */
export function drawCanvas({
  ctx,
  canvas,
  imageRef,
  walls,
  draftWall,
  currentPoints,
  selectedWallId,
  isDrawing,
  previewColor,
  isCompareMode = false,
  mode = 'SELECT', // Add mode parameter
}) {
  if (!canvas || !ctx || !imageRef) return;

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw original image
  ctx.drawImage(imageRef, 0, 0, canvas.width, canvas.height);

  // COMPARE MODE: Show only original image, skip all edits
  if (isCompareMode) {
    return;
  }

  // Draw all saved walls
  walls.forEach((wall) => {
    const isSelected = wall.id === selectedWallId;
    
    // NO thick outline - all walls look same (finalized)
    // Border same as fill color - invisible border effect
    drawPolygon(ctx, wall.points, wall.color, wall.opacity, false, false);

    // Show control points ONLY if:
    // 1. Wall is selected
    // 2. In DRAW mode (NOT SELECT mode)
    // 3. Not currently drawing something else
    if (isSelected && mode === 'DRAW' && !isDrawing) {
      drawControlPoints(ctx, wall.points);
    }
  });

  // Draw draft wall (newly closed polygon being edited in DRAW mode)
  if (draftWall) {
    const isDraftSelected = draftWall.id === selectedWallId;
    
    // NO thick outline - draft wall also looks finalized
    drawPolygon(ctx, draftWall.points, draftWall.color, draftWall.opacity, false, false);
    
    // Show control points on draft wall ONLY in DRAW mode
    if (mode === 'DRAW') {
      drawControlPoints(ctx, draftWall.points);
    }
  }

  // Draw current drawing polygon (while actively drawing)
  if (isDrawing && currentPoints.length > 0) {
    drawCurrentPolygon(ctx, currentPoints, previewColor);
  }
}
