import { EDITOR_CONFIG } from '../constants';

/**
 * Draws control points for selected walls
 * @param {CanvasRenderingContext2D} ctx - Canvas context
 * @param {Array} points - Control points
 */
export function drawControlPoints(ctx, points, displayScale = 1, hoveredPointIndex = null) {
  const scale = displayScale > 0 ? displayScale : 1;
  const radius = EDITOR_CONFIG.CONTROL_POINT_SIZE.DEFAULT / scale;

  points.forEach((point, index) => {
    const isHovered = index === hoveredPointIndex;

    ctx.beginPath();
    ctx.arc(point.x, point.y, radius + 2 / scale, 0, Math.PI * 2);
    ctx.fillStyle = EDITOR_CONFIG.COLORS.CONTROL_POINT_OUTLINE;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    ctx.fillStyle = EDITOR_CONFIG.COLORS.CONTROL_POINT_BORDER;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(point.x, point.y, (isHovered ? radius * 0.62 : radius * 0.52), 0, Math.PI * 2);
    ctx.fillStyle = isHovered
      ? EDITOR_CONFIG.COLORS.CONTROL_POINT_HOVER
      : EDITOR_CONFIG.COLORS.CONTROL_POINT;
    ctx.fill();

    ctx.strokeStyle = EDITOR_CONFIG.COLORS.CONTROL_POINT_BORDER;
    ctx.lineWidth = 1 / scale;
    ctx.stroke();
  });
}
