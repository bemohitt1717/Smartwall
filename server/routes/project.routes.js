import express from "express";
import upload from "../middlewares/project.middleware.js";
import { createProject, getProject, getProjects, saveEditedImage, updateProject, deleteProject, exportEditedImage } from "../controllers/project.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import optionalAuthMiddleware from "../middlewares/optionalAuth.middleware.js";

const projectRouter = express.Router();

// Create project
projectRouter.post("/create", optionalAuthMiddleware, upload.single("image"), createProject);

// Get all projects
projectRouter.get("/", authMiddleware, getProjects);

// Specific routes MUST come before generic /:id routes
projectRouter.patch("/:id/edited-image", optionalAuthMiddleware, upload.single("image"), saveEditedImage);
projectRouter.get("/:id/export", exportEditedImage);

// Generic /:id routes come last
projectRouter.get("/:id", getProject);
projectRouter.put("/:id", authMiddleware, updateProject);
projectRouter.delete("/:id", authMiddleware, deleteProject);

export default projectRouter;
