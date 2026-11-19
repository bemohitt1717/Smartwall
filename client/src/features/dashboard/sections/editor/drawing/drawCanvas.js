import { drawPolygon } from './drawPolygon';
import { drawControlPoints } from './drawControlPoints';
import { drawCurrentPolygon } from './drawCurrentPolygon';
import { getCanvasDisplayScale } from '../geometry';

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
  hoveredPointIndex = null,
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

    if (isSelected && !isDrawing) {
      drawControlPoints(ctx, wall.points, getCanvasDisplayScale(canvas), hoveredPointIndex);
    }
  });

  // Draw draft wall (newly closed polygon being edited in DRAW mode)
  if (draftWall) {
    const isDraftSelected = draftWall.id === selectedWallId;
    
    // NO thick outline - draft wall also looks finalized
    drawPolygon(ctx, draftWall.points, draftWall.color, draftWall.opacity, false, false);
    
    if (isDraftSelected && !isDrawing) {
      drawControlPoints(ctx, draftWall.points, getCanvasDisplayScale(canvas), hoveredPointIndex);
    }
  }

  // Draw current drawing polygon (while actively drawing)
  if (isDrawing && currentPoints.length > 0) {
    drawCurrentPolygon(ctx, currentPoints, previewColor);
  }
}
