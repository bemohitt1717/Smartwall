/**
 * Converts mouse event coordinates to canvas coordinates
 * @param {MouseEvent} e - Mouse event
 * @param {HTMLCanvasElement} canvas - Canvas element
 * @returns {Object|null} Canvas coordinates {x, y} or null
 */
export function getCanvasCoordinates(e, canvas) {
  if (!canvas) return null;

  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}
