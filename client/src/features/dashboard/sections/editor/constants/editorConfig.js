/**
 * Editor configuration constants
 */
export const EDITOR_CONFIG = {
  // Polygon closing threshold (pixels)
  CLOSE_POLYGON_THRESHOLD: 20,
  
  // Control point detection threshold (pixels)
  CONTROL_POINT_THRESHOLD: 12,
  
  // Stroke widths
  STROKE_WIDTH: {
    DEFAULT: 4,
    SELECTED: 6,
    DRAFT: 6,
  },
  
  // Colors
  COLORS: {
    SELECTED_OUTLINE: '#10B981',  // Green
    CONTROL_POINT: '#10B981',     // Green
    CONTROL_POINT_BORDER: '#fff', // White
    FIRST_POINT: '#10B981',       // Green (larger)
  },
  
  // Control point sizes
  CONTROL_POINT_SIZE: {
    DEFAULT: 8,
    FIRST: 10,
  },
  
  // Default preview settings
  DEFAULT_PREVIEW: {
    COLOR: '#6366F1',  // Indigo
    OPACITY: 25,       // 25%
  },
};
