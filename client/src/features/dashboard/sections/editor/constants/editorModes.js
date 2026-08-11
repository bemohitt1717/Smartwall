/**
 * Editor Modes - Defines what the user can do
 * Each mode has specific behaviors and restrictions
 */
export const EDITOR_MODES = {
  SELECT: 'SELECT',   // Selecting and editing existing walls (default)
  DRAW: 'DRAW',       // Drawing new polygons
  MOVE: 'MOVE',       // Moving entire walls (future)
  BRUSH: 'BRUSH',     // Brush painting (future)
  ERASER: 'ERASER',   // Eraser tool (future)
  PAN: 'PAN',         // Pan/zoom canvas (future)
};

/**
 * Default editor mode on load
 */
export const DEFAULT_MODE = EDITOR_MODES.SELECT;
