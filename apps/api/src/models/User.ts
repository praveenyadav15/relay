import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  githubId: number;
  githubLogin: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  encToken: {
    iv: string;
    tag: string;
    data: string;
  };
  scope: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    githubId: {
      type: Number,
      required: true,
      unique: true,
    },

    githubLogin: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    avatarUrl: {
      type: String,
      default: null,
    },

    encToken: {
      iv: {
        type: String,
        required: true,
      },
      tag: {
        type: String,
        required: true,
      },
      data: {
        type: String,
        required: true,
      },
    },

    scope: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", userSchema);