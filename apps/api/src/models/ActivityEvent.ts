import mongoose, { Schema, Document } from "mongoose";

export interface IActivityEvent extends Document {
  projectId: mongoose.Types.ObjectId;
  type: string;
  title: string;
  description: string;
  createdAt: Date;
}

const activityEventSchema = new Schema<IActivityEvent>({
  projectId: {
    type: Schema.Types.ObjectId,
    ref: "Project",
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// { projectId, createdAt: -1 }
activityEventSchema.index({
  projectId: 1,
  createdAt: -1,
});

export const ActivityEvent = mongoose.model<IActivityEvent>(
  "ActivityEvent",
  activityEventSchema
);