import { EDITOR_CONFIG } from '../constants';

/**
 * Draws control points for selected walls
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} points - Control points
 */
export function drawControlPoints(ctx, points) {
  points.forEach((point) => {
    ctx.beginPath();
    ctx.arc(point.x, point.y, EDITOR_CONFIG.CONTROL_POINT_SIZE.DEFAULT, 0, Math.PI * 2);
    ctx.fillStyle = EDITOR_CONFIG.COLORS.CONTROL_POINT;
    ctx.fill();
    ctx.strokeStyle = EDITOR_CONFIG.COLORS.CONTROL_POINT_BORDER;
    ctx.lineWidth = 3;
    ctx.stroke();
  });
}
