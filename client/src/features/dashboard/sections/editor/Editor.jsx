import { useEffect, useRef, useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../../components/Sidebar.jsx";
import Topbar from "../../components/Topbar.jsx";
import EditorToolbar from "./components/EditorToolbar.jsx";
import ToolSidebar from "./components/ToolSidebar.jsx";
import ImageCanvas from "./components/ImageCanvas.jsx";
import PropertiesPanel from "./components/PropertiesPanel.jsx";
import MobileToolbar from "./components/MobileToolbar.jsx";
import SaveToast from "./components/SaveToast.jsx";
import useCanvaEditor from "./hooks/useCanvaEditor.js";
import useImageUpload from "../../../upload/hooks/useImageUpload.js";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorState from "../../../../components/common/ErrorState.jsx";
import {
  getProject,
  saveProject,
  saveEditedImage,
} from "../../../../api/project.api.js";

/**
 * Main Editor Component
 * Handles project loading, editing, and auto-saving
 */
export default function Editor() {
  const { state } = useLocation();
  const initialProjectId = state?.projectId;

  const [projectId, setProjectId] = useState(initialProjectId);
  const [projectTitle, setProjectTitle] = useState("Untitled Project");
  const [project, setProject] = useState(null);
  const [projectLoading, setProjectLoading] = useState(!!initialProjectId);
  const [projectError, setProjectError] = useState(null);
  const [isProjectReady, setIsProjectReady] = useState(false);

  const [showMobileProperties, setShowMobileProperties] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  const { selectedImage, processFile, loadFromUrl } = useImageUpload(
    state?.image,
  );
  const editor = useCanvaEditor(selectedImage);
  const navigate = useNavigate();

  const saveTimeoutRef = useRef(null);

  /**
   * Handle project creation from Editor's UploadPlaceholder
   */
  const handleProjectCreated = useCallback((newProjectId, newProjectName) => {
    setProjectId(newProjectId);
    setProjectTitle(newProjectName);
    setIsProjectReady(true);
  }, []);

  /**
   * Load existing project from backend
   */
  useEffect(() => {
    if (!initialProjectId) {
      setProjectLoading(false);
      return;
    }

    const loadProject = async () => {
      try {
        setProjectLoading(true);
        setProjectError(null);

        const response = await getProject(initialProjectId);

        setProject(response.project);
        setProjectTitle(response.project.name);

        if (response.project.originalImage?.url) {
          loadFromUrl(response.project.originalImage.url);
        }
      } catch (error) {
        console.error("Failed to load project:", error);

        const normalized = error.normalized || {
          status: error?.response?.status ?? null,
          message: error?.message ?? "Failed to load project",
          data: error?.response?.data ?? null,
        };

        if (normalized.status === 404) {
          setProjectError({ type: "not-found", message: "The project you're looking for doesn't exist or may have been deleted." });
        } else if (normalized.isNetworkError) {
          setProjectError({ type: "network", message: "Unable to connect to the SmartWall server. Please check your connection and try again." });
        } else if (normalized.status === 401) {
          // Let the auth flow handle redirects; show an auth error
          setProjectError({ type: "auth", message: "You must be signed in to view this project." });
        } else if (normalized.status === 403) {
          setProjectError({ type: "forbidden", message: "You don't have permission to access this project." });
        } else {
          setProjectError({ type: "unknown", message: normalized.message || "Failed to load project." });
        }
      } finally {
        setProjectLoading(false);
      }
    };

    loadProject();
  }, [initialProjectId, loadFromUrl]);

  /**
   * Restore editor state after image loads
   */
  useEffect(() => {
    if (!project?.editorState || !selectedImage || projectLoading) return;

    const timer = setTimeout(() => {
      // Use the stable `restoreEditorState` callback from the editor hook
      // Avoid depending on the whole `editor` object which changes identity
      // on every render and would re-run this effect repeatedly.
      editor.restoreEditorState(project.editorState);
      setIsProjectReady(true);
    }, 300);

    return () => clearTimeout(timer);
    // Depend on the saved editor state, the selected image load, loading flag,
    // and the stable restore callback only.
  }, [
    project?.editorState,
    selectedImage,
    projectLoading,
    editor.restoreEditorState,
  ]);

  /**
   * Save project changes to backend
   */
  const handleSaveProject = useCallback(async () => {
    if (!projectId) return;

    try {
      setSaving(true);

      const editorState = {
        walls: editor.walls,
        mode: editor.mode,
      };

      await saveProject(projectId, {
        name: projectTitle,
        editorState,
      });

      setSaving(false);
      setShowSaveToast(true);

      setTimeout(() => {
        setShowSaveToast(false);
      }, 2000);
    } catch (error) {
      console.error("Save project failed:", error);
      setSaving(false);
    }
  }, [projectId, projectTitle, editor.walls, editor.mode]);

  /**
   * Export edited canvas as downloadable image
   */
  const handleExport = useCallback(
    async (format = "png", quality = 1.0) => {
      if (!projectId) {
        alert("Please save the project first before exporting");
        return;
      }

      try {
        const blob = await editor.exportCanvas(format, quality);
        if (!blob) {
          throw new Error("Failed to export canvas");
        }

        const fileName = `${projectTitle || "smartwall-project"}-${Date.now()}.${format}`;
        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl);

        try {
          await saveEditedImage(projectId, blob);
        } catch (saveError) {
          console.error(
            "Failed to save to Cloudinary (non-critical):",
            saveError,
          );
        }
      } catch (error) {
        console.error("Export failed:", error);
        throw error;
      }
    },
    [projectId, projectTitle, editor],
  );

  /**
   * Auto-save with 2 second debounce
   */
  useEffect(() => {
    if (!projectId || projectLoading || !isProjectReady) return;

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      handleSaveProject();
    }, 2000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    editor.walls,
    editor.mode,
    projectTitle,
    projectId,
    projectLoading,
    isProjectReady,
    handleSaveProject,
  ]);

  return (
    <div className="h-screen bg-slate-100 flex overflow-hidden">
      <SaveToast show={showSaveToast} />

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden border-l border-slate-200">
        <Topbar />

        <div className="flex-1 flex flex-col overflow-hidden">
          {projectError ? (
            <ErrorState
              title={projectError.type === 'not-found' ? 'Project not found' : 'Unable to load project'}
              message={projectError.message}
              onBack={() => navigate('/projects')}
              onRetry={() => {
                // Retry by re-running the load effect: force reload by toggling projectId
                setProjectLoading(true);
                setProject(null);
                setProjectError(null);
                // trigger the effect by setting projectId to same value
                setProjectId(initialProjectId);
              }}
              backLabel="Back to Projects"
              retryLabel="Retry"
            />
          ) : (
            <>
              <EditorToolbar
                handleSaveProject={handleSaveProject}
                projectTitle={projectTitle}
                setProjectTitle={setProjectTitle}
                undo={editor.undo}
                redo={editor.redo}
                canUndo={editor.canUndo}
                canRedo={editor.canRedo}
                isCompareMode={editor.isCompareMode}
                setIsCompareMode={editor.setIsCompareMode}
                zoomLevel={editor.zoomLevel}
                zoomIn={editor.zoomIn}
                zoomOut={editor.zoomOut}
                resetZoom={editor.resetZoom}
                onExport={handleExport}
                projectId={projectId}
              />

              <div className="flex-1 flex overflow-hidden relative">
            <div className="hidden md:block border-r border-slate-200">
              <ToolSidebar mode={editor.mode} setMode={editor.setMode} />
            </div>

            <div className="flex-1 relative overflow-hidden">
              <ImageCanvas
                editor={editor}
                selectedImage={selectedImage}
                processFile={processFile}
                onProjectCreated={handleProjectCreated}
              />

              {selectedImage && <MobileToolbar editor={editor} />}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileProperties(true)}
                className="lg:hidden fixed bottom-6 right-6 p-4 rounded-full bg-white text-slate-700 shadow-2xl z-40 border border-slate-200"
                type="button"
              >
                <Menu className="size-6" />
              </motion.button>
            </div>

            <div className="hidden lg:block border-l border-slate-200">
              <PropertiesPanel editor={editor} />
            </div>

            <AnimatePresence>
              {showMobileProperties && (
                <div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowMobileProperties(false)}
                    className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden"
                  />

                  <motion.div
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-50 lg:hidden"
                  >
                    <div className="flex items-center justify-between p-4 border-b border-slate-200">
                      <h3 className="text-lg font-bold text-slate-900">
                        Properties
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowMobileProperties(false)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-slate-600"
                        type="button"
                      >
                        <X className="size-5" />
                      </motion.button>
                    </div>

                    <div className="h-[calc(100%-4rem)] overflow-hidden">
                      <PropertiesPanel editor={editor} />
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
