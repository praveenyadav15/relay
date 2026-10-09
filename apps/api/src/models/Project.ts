import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  ownerId: mongoose.Types.ObjectId;
  repoId: number;
  fullName: string;
  name: string;
  owner: string;
  description: string;
  language: string | null;
  defaultBranch: string;
  visibility: string;
  syncStatus: string;
  lastSyncedAt: Date | null;
  stats: {
    commits: number;
    pullRequests: number;
    issues: number;
    releases: number;
    files: number;
  };
  health?: {
    overall: number;
    documentation: number;
    activity: number;
  };
  healthLabel: string;
  syncGeneration: number;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    repoId: {
      type: Number,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    owner: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    language: {
      type: String,
      default: null,
    },

    defaultBranch: {
      type: String,
      required: true,
    },

    visibility: {
      type: String,
      required: true,
    },

    syncStatus: {
      type: String,
      required: true,
    },

    lastSyncedAt: {
      type: Date,
      default: null,
    },

    stats: {
      commits: { type: Number, default: 0 },
      pullRequests: { type: Number, default: 0 },
      issues: { type: Number, default: 0 },
      releases: { type: Number, default: 0 },
      files: { type: Number, default: 0 },
    },

    health: {
      overall: Number,
      documentation: Number,
      activity: Number,
    },

    healthLabel: {
      type: String,
      required: true,
    },

    syncGeneration: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Teammate's required indexes
projectSchema.index(
  { ownerId: 1, repoId: 1 },
  { unique: true }
);

projectSchema.index({ ownerId: 1, updatedAt: -1 });

export const Project = mongoose.model<IProject>(
  "Project",
  projectSchema
);