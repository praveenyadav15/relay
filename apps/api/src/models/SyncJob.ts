import mongoose, { Schema, Document } from "mongoose";

export interface ISyncJob extends Document {
  projectId: mongoose.Types.ObjectId;
  status: string;
  progress: number;
  error: string | null;
  startedAt: Date;
  completedAt: Date | null;
}

const syncJobSchema = new Schema<ISyncJob>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  progress: {
    type: Number,
    required: true,
    default: 0,
  },

  error: {
    type: String,
    default: null,
  },

  startedAt: {
    type: Date,
    required: true,
  },

  completedAt: {
    type: Date,
    default: null,
  },
});

// { projectId, startedAt: -1 }
syncJobSchema.index({
  projectId: 1,
  startedAt: -1,
});

// Only one queued/running job per project
syncJobSchema.index(
  { projectId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      status: { $in: ["queued", "running"] },
    },
  }
);

export const SyncJob = mongoose.model<ISyncJob>(
  "SyncJob",
  syncJobSchema
);