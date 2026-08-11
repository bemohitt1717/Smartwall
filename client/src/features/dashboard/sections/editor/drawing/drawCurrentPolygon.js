import { EDITOR_CONFIG } from '../constants';

/**
 * Draws the current polygon being drawn
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} points - Current polygon points
 * @param {string} previewColor - Preview color
 */
export function drawCurrentPolygon(ctx, points, previewColor) {
  if (points.length === 0) return;

  // Draw lines
  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  points.slice(1).forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });

  ctx.strokeStyle = previewColor;
  ctx.lineWidth = EDITOR_CONFIG.STROKE_WIDTH.DEFAULT;
  ctx.stroke();

  // Draw control points
  points.forEach((point, index) => {
    ctx.beginPath();
    const size = index === 0 
      ? EDITOR_CONFIG.CONTROL_POINT_SIZE.FIRST 
      : EDITOR_CONFIG.CONTROL_POINT_SIZE.DEFAULT;
    
    ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
    
    ctx.fillStyle = index === 0 
      ? EDITOR_CONFIG.COLORS.FIRST_POINT 
      : previewColor;
    ctx.fill();
    
    ctx.strokeStyle = EDITOR_CONFIG.COLORS.CONTROL_POINT_BORDER;
    ctx.lineWidth = 2;
    ctx.stroke();
  });
}
