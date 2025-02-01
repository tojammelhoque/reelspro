import mongoose, { model, Schema, models } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1280,
  height: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  controls?: boolean;
  transformations?: {
    width: number;
    height: number;
    quality?: number;
  };
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    controls: {
      type: Boolean,
      default: true,
    },
    transformations: {
      width: {
        type: Number,
        default: VIDEO_DIMENSIONS.width,
      },
      height: {
        type: Number,
        default: VIDEO_DIMENSIONS.height,
      },
      quality: {
        type: Number,
        min: 1,
        max: 100,
        default: 100,
      },
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Video = models.Video || model<IVideo>("Video", videoSchema);

export default Video;
