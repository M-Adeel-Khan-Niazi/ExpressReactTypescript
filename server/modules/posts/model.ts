import { model, Schema, Document } from "mongoose";
import { UserModel } from "../auth/model";

export const DOCUMENT_NAME = "Post";
export const COLLECTION_NAME = "posts";

export default interface Post extends Document {
  title: string;
  description: string;
  image: string;
  createdBy: string;
}

const schema = new Schema(
  {
    title: {
      type: Schema.Types.String,
      required: true,
    },
    description: {
      type: Schema.Types.String,
      required: false,
    },
    image: {
      type: Schema.Types.String,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: UserModel.modelName,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const PostModel = model<Post>(DOCUMENT_NAME, schema, COLLECTION_NAME);
