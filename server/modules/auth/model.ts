import { model, Schema, Document } from "mongoose";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export default interface User extends Document {
  email: string;
  password: string;
  fullName: string;
  role: USER_ROLES;
}

const schema = new Schema(
  {
    fullName: {
      type: Schema.Types.String,
      required: false,
    },
    role: {
      type: Schema.Types.String,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: Schema.Types.String,
      select: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);

export enum USER_ROLES {
  CREATOR = "creator",
  VIEWER = "viewer",
}
