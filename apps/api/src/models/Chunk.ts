import mongoose, { Schema, Document } from "mongoose";

export interface IChunk extends Document {
  projectId: mongoose.Types.ObjectId;
  artifactId: mongoose.Types.ObjectId | null;
  type: string;
  path: string | null;
  url: string;
  title: string;
  language: string | null;
  startLine: number;
  text: string;
  gen: number;
}

const chunkSchema = new Schema<IChunk>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  artifactId: {
    type: Schema.Types.ObjectId,
    ref: "Artifact",
    default: null,
  },

  type: {
    type: String,
    required: true,
  },

  path: {
    type: String,
    default: null,
  },

  url: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  language: {
    type: String,
    default: null,
  },

  startLine: {
    type: Number,
    required: true,
  },

  text: {
    type: String,
    required: true,
  },

  gen: {
    type: Number,
    required: true,
  },
});

// Text search index
chunkSchema.index({
  projectId: 1,
  text: "text",
  path: "text",
  title: "text",
});

// Project and language index
chunkSchema.index({
  projectId: 1,
  language: 1,
});

// Export the Chunk model
export const Chunk = mongoose.model<IChunk>("Chunk", chunkSchema);