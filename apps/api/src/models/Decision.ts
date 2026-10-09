import mongoose, { Schema, Document } from "mongoose";

export interface IDecision extends Document {
  projectId: mongoose.Types.ObjectId;
  title: string;
  summary: string;
  rationale: string;
  sources: unknown[];
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const decisionSchema = new Schema<IDecision>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
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

  rationale: {
    type: String,
    required: true,
  },

  sources: {
    type: [Schema.Types.Mixed],
    default: [],
  },

  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// { projectId, createdAt: -1 }
decisionSchema.index({
  projectId: 1,
  createdAt: -1,
});

export const Decision = mongoose.model<IDecision>(
  "Decision",
  decisionSchema
);