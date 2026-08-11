/**
 * Undo/Redo History Manager
 * Tracks and restores complete editor state
 */

/**
 * Creates a complete history snapshot of current editor state
 * @param {Object} state - Current editor state
 * @returns {Object} Complete state snapshot
 */
export function createHistorySnapshot(state) {
  return {
    walls: JSON.parse(JSON.stringify(state.walls)),
    draftWall: state.draftWall ? JSON.parse(JSON.stringify(state.draftWall)) : null,
    selectedWallId: state.selectedWallId,
    previewColor: state.previewColor,
    previewOpacity: state.previewOpacity,
    currentPoints: JSON.parse(JSON.stringify(state.currentPoints)),
    isDrawing: state.isDrawing,
    mode: state.mode,
    timestamp: Date.now(),
  };
}

/**
 * Restores complete editor state from a history snapshot
 * @param {Object} snapshot - History snapshot
 * @param {Object} setters - State setters
 */
export function restoreFromSnapshot(snapshot, setters) {
  const {
    setWalls,
    setDraftWall,
    setSelectedWallId,
    setPreviewColor,
    setPreviewOpacity,
    setCurrentPoints,
    setIsDrawing,
    setMode,
  } = setters;

  setWalls(JSON.parse(JSON.stringify(snapshot.walls)));
  setDraftWall(snapshot.draftWall ? JSON.parse(JSON.stringify(snapshot.draftWall)) : null);
  setSelectedWallId(snapshot.selectedWallId);
  setPreviewColor(snapshot.previewColor);
  setPreviewOpacity(snapshot.previewOpacity);
  setCurrentPoints(JSON.parse(JSON.stringify(snapshot.currentPoints)));
  setIsDrawing(snapshot.isDrawing);
  setMode(snapshot.mode);
}

/**
 * History Manager Class
 * Manages undo/redo stacks with optimized memory usage
 */
export class HistoryManager {
  constructor(maxSize = 50) {
    this.undoStack = [];
    this.redoStack = [];
    this.maxSize = maxSize;
  }

  /**
   * Records a new action in history
   * @param {Object} snapshot - State snapshot
   */
  record(snapshot) {
    this.undoStack.push(snapshot);

    // Clear redo stack when new action is recorded
    this.redoStack = [];

    // Limit stack size (remove oldest)
    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }
  }

  /**
   * Undo last action
   * @returns {Object|null} Previous state snapshot or null
   */
  undo() {
    if (this.undoStack.length <= 1) return null; // Keep initial state

    const current = this.undoStack.pop();
    this.redoStack.push(current);

    return this.undoStack[this.undoStack.length - 1];
  }

  /**
   * Redo last undone action
   * @returns {Object|null} Next state snapshot or null
   */
  redo() {
    if (this.redoStack.length === 0) return null;

    const snapshot = this.redoStack.pop();
    this.undoStack.push(snapshot);

    return snapshot;
  }

  /**
   * Check if undo is available
   * @returns {boolean}
   */
  canUndo() {
    return this.undoStack.length > 1; // More than initial state
  }

  /**
   * Check if redo is available
   * @returns {boolean}
   */
  canRedo() {
    return this.redoStack.length > 0;
  }

  /**
   * Clear all history
   */
  clear() {
    this.undoStack = [];
    this.redoStack = [];
  }

  /**
   * Get current stack sizes (for debugging)
   */
  getStackSizes() {
    return {
      undoStack: this.undoStack.length,
      redoStack: this.redoStack.length,
    };
  }
}
