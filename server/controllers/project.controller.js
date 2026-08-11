import mongoose from "mongoose";
import Project from "../model/project.model.js";
import uploadToCloudinary, { deleteFromCloudinary } from "../services/cloudinary.service.js";

/**
 * Create new project with uploaded image
 * @route POST /api/project/create
 * @access Public (with optional auth)
 */
export const createProject = async (req, res) => {
  try {
    // Validate image upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image",
      });
    }

    // Upload image to Cloudinary
    const { public_id, secure_url } = await uploadToCloudinary(req.file.buffer);

    // Create project in database
    const project = await Project.create({
      user: req.user?.id || null,
      name: req.body.name?.trim() || "untitled",
      originalImage: {
        publicId: public_id,
        url: secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "Project created successfully",
      project,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get single project by ID
 * @route GET /api/project/:id
 * @access Public
 */
export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    // Find project
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }
    
    return res.status(200).json({
      success: true,
      project,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Get all projects for authenticated user
 * @route GET /api/project
 * @access Private
 */
export const getProjects = async (req, res) => {
  try {
    // Fetch user's projects sorted by creation date
    const projects = await Project.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/**
 * Save edited image to Cloudinary
 * @route PATCH /api/project/:id/edited-image
 * @access Public (with optional auth)
 */
export const saveEditedImage = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    // Find project
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Validate image upload
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please provide an edited image",
      });
    }

    // Delete old edited image from Cloudinary if exists
    if (project.editedImage?.publicId) {
      try {
        await deleteFromCloudinary(project.editedImage.publicId);
      } catch (cloudinaryError) {
        // Log error but continue - non-critical
        console.error("Failed to delete old edited image:", cloudinaryError);
      }
    }

    // Upload new edited image to Cloudinary
    const { public_id, secure_url } = await uploadToCloudinary(req.file.buffer);

    // Update project with new edited image
    project.editedImage = {
      publicId: public_id,
      url: secure_url,
    };
    await project.save();

    return res.status(200).json({
      success: true,
      message: "Edited image saved successfully",
      project,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error: " + error.message,
    });
  }
}

/**
 * Export edited image (get download URL)
 * @route GET /api/project/:id/export
 * @access Public
 */
export const exportEditedImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { format = 'png' } = req.query;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    // Find project
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check if edited image exists
    if (!project.editedImage?.url) {
      return res.status(404).json({
        success: false,
        message: "No edited image found for this project",
      });
    }

    // Return edited image URL with metadata
    return res.status(200).json({
      success: true,
      message: "Edited image retrieved successfully",
      editedImage: {
        url: project.editedImage.url,
        format: format,
        projectName: project.name,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

/**
 * Update project (name and editor state)
 * @route PUT /api/project/:id
 * @access Private
 */
export const updateProject = async (req, res)=>{
  try{
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    // Find project
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check authorization - only project owner can update
    if (project.user?.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to update this project",
      });
    }

    // Update fields if provided
    const { name, editorState } = req.body;
    if (name !== undefined) {
      project.name = name.trim();
    }
    if (editorState !== undefined) {
      project.editorState = editorState;
    }

    await project.save();

    return res.status(200).json({
      success: true,
      message: "Project updated successfully",
      project,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

/**
 * Delete project and associated images
 * @route DELETE /api/project/:id
 * @access Private
 */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
    }

    // Find project
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    // Check authorization - only project owner can delete
    if (project.user && project.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to delete this project",
      });
    }

    // Delete images from Cloudinary
    try {
      if (project.originalImage?.publicId) {
        await deleteFromCloudinary(project.originalImage.publicId);
      }
      if (project.editedImage?.publicId) {
        await deleteFromCloudinary(project.editedImage.publicId);
      }
    } catch (cloudinaryError) {
      console.error("Cloudinary deletion error:", cloudinaryError);
      // Continue with project deletion even if Cloudinary fails
    }

    // Delete project from database
    await Project.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Project deleted successfully",
    });

  } catch (error) {
    console.error("Delete project error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}