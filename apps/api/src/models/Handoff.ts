import mongoose, { Schema, Document } from "mongoose";

export interface IHandoffSection {
  id: string;
  heading: string;
  body: string;
  sources: unknown[];
  insufficientEvidence?: boolean;
}

export interface IHandoff extends Document {
  projectId: mongoose.Types.ObjectId;
  version: number;
  title: string;
  summary: string;
  sections: IHandoffSection[];
  authorId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const handoffSectionSchema = new Schema<IHandoffSection>(
  {
    id: {
      type: String,
      required: true,
    },

    heading: {
      type: String,
      required: true,
    },

    body: {
      type: String,
      required: true,
    },

    sources: {
      type: [Schema.Types.Mixed],
      default: [],
    },

    insufficientEvidence: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

const handoffSchema = new Schema<IHandoff>(
  {
    projectId: {
      type: Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    version: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    summary: {
      type: String,
      required: true,
    },

    sections: {
      type: [handoffSectionSchema],
      default: [],
    },

    authorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// One handoff version per project
handoffSchema.index(
  { projectId: 1, version: 1 },
  { unique: true }
);

export const Handoff = mongoose.model<IHandoff>(
  "Handoff",
  handoffSchema
);