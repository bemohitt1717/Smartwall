/**
 * Editor configuration constants
 */
export const EDITOR_CONFIG = {
  // Polygon closing threshold (pixels)
  CLOSE_POLYGON_THRESHOLD: 20,
  
  // Control point detection threshold (pixels)
  CONTROL_POINT_THRESHOLD: 12,

  // Control point hit area (screen pixels)
  CONTROL_POINT_HIT_RADIUS: 18,
  
  // Stroke widths
  STROKE_WIDTH: {
    DEFAULT: 4,
    SELECTED: 6,
    DRAFT: 6,
    DRAWING: 5,
  },
  
  // Colors
  COLORS: {
    SELECTED_OUTLINE: '#10B981',  // Green
    CONTROL_POINT: '#6457FF',     // Brand purple
    CONTROL_POINT_HOVER: '#F59E0B',
    CONTROL_POINT_OUTLINE: '#0F172A',
    CONTROL_POINT_BORDER: '#fff', // White
    FIRST_POINT: '#10B981',       // Green (larger)
  },
  
  // Control point sizes
  CONTROL_POINT_SIZE: {
    DEFAULT: 10,
    FIRST: 10,
  },
  
  // Default preview settings
  DEFAULT_PREVIEW: {
    COLOR: '#6366F1',  // Indigo
    OPACITY: 25,       // 25%
  },
};
