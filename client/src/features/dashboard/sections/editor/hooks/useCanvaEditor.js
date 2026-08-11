import { useEffect, useRef, useState, useCallback } from "react";
import { drawCanvas } from "../drawing";
import { EDITOR_MODES, DEFAULT_MODE, EDITOR_CONFIG } from "../constants";
import {
  createCanvasClickHandler,
  createMouseDownHandler,
  createMouseMoveHandler,
  createMouseUpHandler,
  createApplyColorHandler,
  createDeleteWallHandler,
  createRenameWallHandler,
  createSelectWallHandler,
} from "../handlers";
import { HistoryManager, createHistorySnapshot, restoreFromSnapshot } from "../history";

/**
 * Main Canvas Editor Hook
 * Orchestrates all editor functionality
 * 
 * Architecture:
 * - State management only
 * - Delegates business logic to handlers
 * - Mode-aware operations
 * - Scalable for future features
 */
export default function useCanvaEditor(image) {
  // ============================================
  // REFS
  // ============================================
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const contextRef = useRef(null);
  
  // Drag state refs
  const isDraggingRef = useRef(false);
  const dragPointIndexRef = useRef(null);
  const dragWallIdRef = useRef(null);
  const dragWallRef = useRef(false);
  const dragStartPosRef = useRef(null);
  const hasMovedRef = useRef(false);

  // History manager
  const historyManagerRef = useRef(new HistoryManager(50));
  const isRestoringRef = useRef(false); // Prevent recording during restore
  const lastRecordedStateRef = useRef(null); // Prevent duplicate recordings

  // ============================================
  // STATE
  // ============================================
  
  // Editor mode
  const [mode, setMode] = useState(DEFAULT_MODE);
  
  // Drawing state
  const [currentPoints, setCurrentPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);

  // Walls state
  const [walls, setWalls] = useState([]);
  const [selectedWallId, setSelectedWallId] = useState(null);
  const [draftWall, setDraftWall] = useState(null);

  // Color state
  const [previewColor, setPreviewColor] = useState(EDITOR_CONFIG.DEFAULT_PREVIEW.COLOR);
  const [previewOpacity, setPreviewOpacity] = useState(EDITOR_CONFIG.DEFAULT_PREVIEW.OPACITY);

  // History state (for UI reactivity)
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  // Compare mode state
  const [isCompareMode, setIsCompareMode] = useState(false);

  // Zoom and pan state
  const [zoomLevel, setZoomLevel] = useState(100); // 100 = 100%
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  // Auto-save state

  // ============================================
  // COMPUTED VALUES
  // ============================================
  const isPolygonClosed = draftWall !== null || selectedWallId !== null || (currentPoints.length > 0 && !isDrawing);
  const selectedWall = walls.find((wall) => wall.id === selectedWallId) || (draftWall?.id === selectedWallId ? draftWall : null);
  const allWalls = draftWall ? [draftWall, ...walls] : walls;

  // ============================================
  // HISTORY MANAGEMENT
  // ============================================
  
  /**
   * Updates undo/redo button states
   */
  const updateHistoryState = useCallback(() => {
    const newCanUndo = historyManagerRef.current.canUndo();
    const newCanRedo = historyManagerRef.current.canRedo();
    
    if (newCanUndo !== canUndo) setCanUndo(newCanUndo);
    if (newCanRedo !== canRedo) setCanRedo(newCanRedo);
  }, [canUndo, canRedo]);

  /**
   * Records current state to history
   * Only records if not currently restoring and state actually changed
   */
  const recordHistory = useCallback(() => {
    if (isRestoringRef.current) {
      return;
    }

    const currentState = {
      walls,
      draftWall,
      selectedWallId,
      previewColor,
      previewOpacity,
      currentPoints,
      isDrawing,
      mode,
    };

    // Check if state actually changed
    const currentStateStr = JSON.stringify(currentState);
    if (lastRecordedStateRef.current === currentStateStr) {
      return;
    }

    const snapshot = createHistorySnapshot(currentState);
    historyManagerRef.current.record(snapshot);
    lastRecordedStateRef.current = currentStateStr;
    
    updateHistoryState();
  }, [walls, draftWall, selectedWallId, previewColor, previewOpacity, currentPoints, isDrawing, mode, updateHistoryState]);

  /**
   * Undo last action
   * Restores previous editor state from history
   */
  const undo = useCallback(() => {
    const snapshot = historyManagerRef.current.undo();
    if (!snapshot) {
      return;
    }

    isRestoringRef.current = true;
    lastRecordedStateRef.current = JSON.stringify({
      walls: snapshot.walls,
      draftWall: snapshot.draftWall,
      selectedWallId: snapshot.selectedWallId,
      previewColor: snapshot.previewColor,
      previewOpacity: snapshot.previewOpacity,
      currentPoints: snapshot.currentPoints,
      isDrawing: snapshot.isDrawing,
      mode: snapshot.mode,
    });
    
    restoreFromSnapshot(snapshot, {
      setWalls,
      setDraftWall,
      setSelectedWallId,
      setPreviewColor,
      setPreviewOpacity,
      setCurrentPoints,
      setIsDrawing,
      setMode,
    });

    requestAnimationFrame(() => {
      updateHistoryState();
      isRestoringRef.current = false;
    });
  }, [updateHistoryState]);

  /**
   * Redo last undone action
   * Restores next editor state from history
   */
  const redo = useCallback(() => {
    const snapshot = historyManagerRef.current.redo();
    if (!snapshot) {
      return;
    }

    isRestoringRef.current = true;
    lastRecordedStateRef.current = JSON.stringify({
      walls: snapshot.walls,
      draftWall: snapshot.draftWall,
      selectedWallId: snapshot.selectedWallId,
      previewColor: snapshot.previewColor,
      previewOpacity: snapshot.previewOpacity,
      currentPoints: snapshot.currentPoints,
      isDrawing: snapshot.isDrawing,
      mode: snapshot.mode,
    });
    
    restoreFromSnapshot(snapshot, {
      setWalls,
      setDraftWall,
      setSelectedWallId,
      setPreviewColor,
      setPreviewOpacity,
      setCurrentPoints,
      setIsDrawing,
      setMode,
    });

    requestAnimationFrame(() => {
      updateHistoryState();
      isRestoringRef.current = false;
    });
  }, [updateHistoryState]);

  // ============================================
  // HANDLERS (Created via factories)
  // ============================================
  
  const handleCanvasClick = useCallback(
    createCanvasClickHandler({
      canvasRef,
      mode,
      isDrawing,
      currentPoints,
      walls,
      draftWall,
      previewColor,
      previewOpacity,
      hasMovedRef,
      setIsDrawing,
      setCurrentPoints,
      setDraftWall,
      setSelectedWallId,
      setPreviewColor,
      setPreviewOpacity,
      setWalls,
      setMode, // ADD: Pass setMode
      recordHistory, // Pass history recording
    }),
    [mode, isDrawing, currentPoints, walls, draftWall, previewColor, previewOpacity, recordHistory]
  );

  const handleMouseDown = useCallback(
    createMouseDownHandler({
      canvasRef,
      mode, // ADD: Pass mode
      draftWall,
      selectedWallId,
      walls,
      isDraggingRef,
      dragPointIndexRef,
      dragWallIdRef,
      dragWallRef,
      dragStartPosRef,
      recordHistory, // Pass history recording
    }),
    [mode, draftWall, selectedWallId, walls, recordHistory]
  );

  const handleMouseMove = useCallback(
    createMouseMoveHandler({
      canvasRef,
      draftWall,
      isDraggingRef,
      dragWallRef,
      dragStartPosRef,
      dragWallIdRef,
      dragPointIndexRef,
      hasMovedRef,
      setDraftWall,
      setWalls,
    }),
    [draftWall]
  );

  const handleMouseUp = useCallback(
    createMouseUpHandler({
      isDraggingRef,
      dragPointIndexRef,
      dragWallIdRef,
      dragWallRef,
      dragStartPosRef,
      hasMovedRef,
    }),
    []
  );

  const applyColor = useCallback(
    createApplyColorHandler({
      draftWall,
      selectedWallId,
      isDrawing,
      currentPoints,
      previewColor,
      previewOpacity,
      walls,
      setWalls,
      setDraftWall,
      setSelectedWallId,
      setCurrentPoints,
      recordHistory, // Pass history recording
    }),
    [draftWall, selectedWallId, isDrawing, currentPoints, previewColor, previewOpacity, walls, recordHistory]
  );

  const deleteWall = useCallback(
    createDeleteWallHandler({
      selectedWallId,
      draftWall,
      setDraftWall,
      setWalls,
      setSelectedWallId,
      setPreviewColor,
      setPreviewOpacity,
      recordHistory, // Pass history recording
    }),
    [selectedWallId, draftWall, recordHistory]
  );

  const renameWall = useCallback(
    createRenameWallHandler({
      draftWall,
      setDraftWall,
      setWalls,
      recordHistory, // Pass history recording
    }),
    [draftWall, recordHistory]
  );

  const selectWall = useCallback(
    createSelectWallHandler({
      draftWall,
      walls,
      setSelectedWallId,
      setPreviewColor,
      setPreviewOpacity,
    }),
    [walls, draftWall]
  );

  // ============================================
  // UTILITY ACTIONS
  // ============================================

  const exportCanvas = useCallback((format = 'png', quality = 1.0) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas not found');
      return null;
    }

    // Get the canvas as blob
    return new Promise((resolve, reject) => {
      const mimeType = format === 'jpg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
      
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to export canvas'));
        }
      }, mimeType, quality);
    });
  }, []);

  const restoreEditorState = useCallback((savedState) => {
  if (!savedState) return;

  setWalls(savedState.walls || []);
  setMode(savedState.mode || DEFAULT_MODE);

  // Agar zoom state hook me already hai
  // to yahan zoom bhi restore karenge
    setZoomLevel((savedState.zoom ?? 1) * 100);

}, []);
  
  const clearCurrentDrawing = useCallback(() => {
    setCurrentPoints([]);
    setIsDrawing(false);
    setDraftWall(null);
  }, []);

  const resetAll = useCallback(() => {
    setWalls([]);
    setCurrentPoints([]);
    setSelectedWallId(null);
    setIsDrawing(false);
    setDraftWall(null);
    setPreviewColor(EDITOR_CONFIG.DEFAULT_PREVIEW.COLOR);
    setPreviewOpacity(EDITOR_CONFIG.DEFAULT_PREVIEW.OPACITY);
  }, []);

  // ============================================
  // ZOOM & PAN CONTROLS
  // ============================================

  const zoomIn = useCallback(() => {
    setZoomLevel(prev => Math.min(prev + 25, 400)); // Max 400%
  }, []);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => Math.max(prev - 25, 25)); // Min 25%
  }, []);

  const resetZoom = useCallback(() => {
    setZoomLevel(100);
    setPanOffset({ x: 0, y: 0 });
  }, []);

  const handleZoomChange = useCallback((newZoom) => {
    setZoomLevel(Math.max(25, Math.min(400, newZoom)));
  }, []);

  // ============================================
  // CANVAS RENDERING
  // ============================================
  
  const redrawCanvas = useCallback(() => {
    drawCanvas({
      ctx: contextRef.current,
      canvas: canvasRef.current,
      imageRef: imageRef.current,
      walls,
      draftWall,
      currentPoints,
      selectedWallId,
      isDrawing,
      previewColor,
      isCompareMode,
      mode, // Pass mode to drawing function
    });
  }, [walls, draftWall, currentPoints, selectedWallId, isDrawing, previewColor, isCompareMode, mode]);

  // ============================================
  // EFFECTS
  // ============================================
  
  // Load image
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image?.preview) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    contextRef.current = ctx;

    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      imageRef.current = img;
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      redrawCanvas();

      // Record initial state after image loads
      recordHistory();
    };

    img.src = image.preview;
  }, [image, redrawCanvas, recordHistory]);

  // Redraw when state changes
  useEffect(() => {
    redrawCanvas();
  }, [redrawCanvas]);

  // Sync draft wall color with preview changes
  useEffect(() => {
    if (draftWall && draftWall.id === selectedWallId) {
      setDraftWall((prev) => {
        if (prev && (prev.color !== previewColor || prev.opacity !== previewOpacity)) {
          return {
            ...prev,
            color: previewColor,
            opacity: previewOpacity,
          };
        }
        return prev;
      });
    }
  }, [previewColor, previewOpacity, selectedWallId]);

  // Keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      // Ctrl+Z or Cmd+Z - Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      // Ctrl+Shift+Z or Cmd+Shift+Z - Redo
      else if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        redo();
      }
      // Ctrl+Y or Cmd+Y - Redo (alternative)
      else if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
      }
      // V - Select Tool
      else if (e.key === 'v' || e.key === 'V') {
        e.preventDefault();
        setMode(EDITOR_MODES.SELECT);
      }
      // P - Draw Polygon Tool
      else if (e.key === 'p' || e.key === 'P') {
        e.preventDefault();
        setMode(EDITOR_MODES.DRAW);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  // Auto-save: Debounced save on walls change
 
  // ============================================
  // PUBLIC API
  // ============================================
  return {
    // Refs
    canvasRef,

    // Mode
    mode,
    setMode,

    // State
    walls,
    allWalls,
    draftWall,
    selectedWallId,
    isPolygonClosed,
    previewColor,
    previewOpacity,
    isDrawing,

    // Setters
    setPreviewColor,
    setPreviewOpacity,
    setSelectedWallId, // ADD: Export for outside click handler

    // Handlers
    handleCanvasClick,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,

    // Actions
    applyColor,
    deleteWall,
    clearCurrentDrawing,
    resetAll,
    renameWall,
    selectWall,
    restoreEditorState,
    exportCanvas,

    // History
    undo,
    redo,
    canUndo,
    canRedo,

    // Compare mode
    isCompareMode,
    setIsCompareMode,

    // Zoom & Pan
    zoomLevel,
    setZoomLevel,
    zoomIn,
    zoomOut,
    resetZoom,
    handleZoomChange,
    panOffset,
    setPanOffset,

    // Auto-save
  };
}
