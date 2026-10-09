import mongoose, { Schema, Document } from "mongoose";

export interface IArtifact extends Document {
  projectId: mongoose.Types.ObjectId;
  type: string;
  externalId: string;
  title: string;
  path: string | null;
  url: string | null;
  summary: string | null;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  gen: number | null;
}

const artifactSchema = new Schema<IArtifact>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  externalId: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  path: {
    type: String,
    default: null,
  },

  url: {
    type: String,
    default: null,
  },

  summary: {
    type: String,
    default: null,
  },

  body: {
    type: String,
    required: true,
  },

  // Source creation/update time
  createdAt: {
    type: Date,
    required: true,
  },

  updatedAt: {
    type: Date,
    required: true,
  },

  gen: {
    type: Number,
    default: null,
  },
});

// Unique artifact inside each project
artifactSchema.index(
  { projectId: 1, externalId: 1 },
  { unique: true }
);

// Used for filtering/sorting artifacts
artifactSchema.index({
  projectId: 1,
  type: 1,
  updatedAt: -1,
});

export const Artifact = mongoose.model<IArtifact>(
  "Artifact",
  artifactSchema
);