import {
  type HydratedDocument,
  type InferSchemaType,
  type Types,
  model,
  models,
  Schema,
} from "mongoose";

import {
  type SoftDeleteFields,
  type SoftDeleteModel,
  withSoftDelete,
} from "@/features/shared/server/db/soft-delete.plugin";

const userPreferencesSchema = new Schema(
  {
    locale: {
      type: String,
      trim: true,
      default: "en-IN",
    },
    timezone: {
      type: String,
      trim: true,
      default: "Asia/Kolkata",
    },
  },
  { _id: false },
);

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      sparse: true,
      maxlength: 320,
    },
    phone: {
      type: String,
      trim: true,
      sparse: true,
      maxlength: 20,
    },
    avatarUrl: {
      type: String,
      trim: true,
      default: null,
    },
    role: {
      type: String,
      enum: ["owner", "admin", "member"],
      default: "owner",
    },
    preferences: {
      type: userPreferencesSchema,
      default: () => ({}),
    },
    lastActiveAt: {
      type: Date,
      default: null,
    },
    metadata: {
      type: Map,
      of: Schema.Types.Mixed,
      default: () => ({}),
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

withSoftDelete(userSchema);

userSchema.index(
  { email: 1 },
  {
    unique: true,
    partialFilterExpression: {
      email: { $type: "string" },
      isDeleted: false,
    },
  },
);

userSchema.index(
  { phone: 1 },
  {
    unique: true,
    partialFilterExpression: {
      phone: { $type: "string" },
      isDeleted: false,
    },
  },
);

userSchema.index({ createdAt: -1, isDeleted: 1 });

export type User = InferSchemaType<typeof userSchema>;
export type UserDocument = HydratedDocument<User>;
export type UserModel = SoftDeleteModel<User>;
export type UserId = Types.ObjectId;
export type UserWithSoftDelete = User & SoftDeleteFields;

export const UserModel =
  (models.User as UserModel | undefined) ??
  model<User, UserModel>("User", userSchema);
