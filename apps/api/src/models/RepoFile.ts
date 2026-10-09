import mongoose, { Schema, Document } from "mongoose";

export interface IRepoFile extends Document {
  projectId: mongoose.Types.ObjectId;
  path: string;
  name: string;
  language: string | null;
  size: number;
  sha: string;
  isBinary: boolean;
  isLarge: boolean;
  content: string | null;
  gen: number;
}

const repoFileSchema = new Schema<IRepoFile>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  path: {
    type: String,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    default: null,
  },

  size: {
    type: Number,
    required: true,
  },

  sha: {
    type: String,
    required: true,
  },

  isBinary: {
    type: Boolean,
    required: true,
  },

  isLarge: {
    type: Boolean,
    required: true,
  },

  content: {
    type: String,
    default: null,
  },

  gen: {
    type: Number,
    required: true,
  },
});

// Unique file path inside each project
repoFileSchema.index(
  { projectId: 1, path: 1 },
  { unique: true }
);

// Used for sync generation
repoFileSchema.index({
  projectId: 1,
  gen: 1,
});

export const RepoFile = mongoose.model<IRepoFile>(
  "RepoFile",
  repoFileSchema
);