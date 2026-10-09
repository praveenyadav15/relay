import { Router, Request, Response } from "express";
import mongoose from "mongoose";
import { Project } from "../models/Project.js";

const router = Router();

// GET /api/projects
router.get("/", async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find()
      .sort({ updatedAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch projects",
    });
  }
});

// GET /api/projects/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      res.status(400).json({
        success: false,
        message: "Invalid project ID",
      });
      return;
    }

    const project = await Project.findById(id).lean();

    if (!project) {
      res.status(404).json({
        success: false,
        message: "Project not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    console.error("Error fetching project:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
    });
  }
});

export default router;