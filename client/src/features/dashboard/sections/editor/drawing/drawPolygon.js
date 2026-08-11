import { hexToRgba } from '../utils';
import { EDITOR_CONFIG } from '../constants';

/**
 * Draws a single polygon on the canvas
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} points - Polygon points
 * @param {string} color - HEX color
 * @param {number} opacity - Opacity (0-100)
 * @param {boolean} isSelected - Whether polygon is selected
 * @param {boolean} isDraft - Whether polygon is draft (not used anymore)
 */
export function drawPolygon(ctx, points, color, opacity, isSelected = false, isDraft = false) {
  if (points.length < 3) return;

  ctx.beginPath();
  ctx.moveTo(points[0].x, points[0].y);

  points.slice(1).forEach((point) => {
    ctx.lineTo(point.x, point.y);
  });

  ctx.closePath();

  // Fill with color
  ctx.fillStyle = hexToRgba(color, opacity / 100);
  ctx.fill();

  // Stroke - Use SAME color as fill for invisible border effect (actual wall feel)
  // Only show green outline if actively selected in SELECT mode
  if (isSelected) {
    ctx.strokeStyle = EDITOR_CONFIG.COLORS.SELECTED_OUTLINE;
    ctx.lineWidth = EDITOR_CONFIG.STROKE_WIDTH.SELECTED;
  } else {
    // Border same as fill color - creates seamless wall appearance
    ctx.strokeStyle = hexToRgba(color, opacity / 100);
    ctx.lineWidth = EDITOR_CONFIG.STROKE_WIDTH.DEFAULT;
  }
  ctx.stroke();
}
