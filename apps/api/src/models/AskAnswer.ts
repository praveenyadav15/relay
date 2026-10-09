import mongoose, { Schema, Document } from "mongoose";

export interface IAskAnswer extends Document {
  projectId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  question: string;
  answer: string;
  sources: unknown[];
  confidence: number;
  insufficientEvidence: boolean;
  trace: {
    retrievedChunkIds: mongoose.Types.ObjectId[];
    model: string;
    latencyMs: number;
  };
  createdAt: Date;
}

const askAnswerSchema = new Schema<IAskAnswer>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  question: {
    type: String,
    required: true,
  },

  answer: {
    type: String,
    required: true,
  },

  sources: {
    type: [Schema.Types.Mixed],
    default: [],
  },

  confidence: {
    type: Number,
    required: true,
  },

  insufficientEvidence: {
    type: Boolean,
    required: true,
    default: false,
  },

  trace: {
    retrievedChunkIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Chunk",
      },
    ],

    model: {
      type: String,
      required: true,
    },

    latencyMs: {
      type: Number,
      required: true,
    },
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// { projectId, userId, createdAt: -1 }
askAnswerSchema.index({
  projectId: 1,
  userId: 1,
  createdAt: -1,
});

export const AskAnswer = mongoose.model<IAskAnswer>(
  "AskAnswer",
  askAnswerSchema
);