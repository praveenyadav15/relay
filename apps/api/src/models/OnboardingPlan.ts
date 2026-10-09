import mongoose, { Schema, Document } from "mongoose";

export interface IOnboardingItem {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  artifactIds: mongoose.Types.ObjectId[];
}

export interface IOnboardingPlan extends Document {
  projectId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  title: string;
  items: IOnboardingItem[];
  createdAt: Date;
  updatedAt: Date;
}

const onboardingItemSchema = new Schema<IOnboardingItem>(
  {
    id: {
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

    completed: {
      type: Boolean,
      required: true,
      default: false,
    },

    artifactIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Artifact",
      },
    ],
  },
  { _id: false }
);

const onboardingPlanSchema = new Schema<IOnboardingPlan>(
  {
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

    title: {
      type: String,
      required: true,
    },

    items: {
      type: [onboardingItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// One onboarding plan per project + user
onboardingPlanSchema.index(
  { projectId: 1, userId: 1 },
  { unique: true }
);

export const OnboardingPlan = mongoose.model<IOnboardingPlan>(
  "OnboardingPlan",
  onboardingPlanSchema
);