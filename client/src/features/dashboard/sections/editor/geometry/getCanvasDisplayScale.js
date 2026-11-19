export function getCanvasDisplayScale(canvas) {
  if (!canvas?.width) return 1;

  const { width } = canvas.getBoundingClientRect();
  return width > 0 ? width / canvas.width : 1;
}
