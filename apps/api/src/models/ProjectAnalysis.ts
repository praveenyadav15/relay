import mongoose, { Schema, Document } from "mongoose";

export interface IProjectAnalysis extends Document {
  projectId: mongoose.Types.ObjectId;
  overview: string;
  architecture: string;
  keyFiles: unknown[];
  gettingStarted: unknown[];
  generatedAt: Date;
}

const projectAnalysisSchema = new Schema<IProjectAnalysis>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  overview: {
    type: String,
    required: true,
  },

  architecture: {
    type: String,
    required: true,
  },

  keyFiles: {
    type: [Schema.Types.Mixed],
    default: [],
  },

  gettingStarted: {
    type: [Schema.Types.Mixed],
    default: [],
  },

  generatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// One analysis document per project
projectAnalysisSchema.index(
  { projectId: 1 },
  { unique: true }
);

export const ProjectAnalysis = mongoose.model<IProjectAnalysis>(
  "ProjectAnalysis",
  projectAnalysisSchema
);