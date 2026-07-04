import {
  type HydratedDocument,
  type InferSchemaType,
  model,
  models,
  Schema,
  type Types,
} from "mongoose";

import {
  type SoftDeleteFields,
  type SoftDeleteModel,
  withSoftDelete,
} from "@/features/shared/server/db/soft-delete.plugin";

const themeAssetSchema = new Schema(
  {
    kind: {
      type: String,
      enum: ["thumbnail", "cover", "preview", "font", "audio", "other"],
      required: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    alt: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { _id: false },
);

const themeSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 140,
    },
    category: {
      type: String,
      trim: true,
      default: "wedding",
    },
    description: {
      type: String,
      trim: true,
      default: null,
      maxlength: 500,
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
    assets: {
      type: [themeAssetSchema],
      default: [],
    },
    tokens: {
      type: Map,
      of: Schema.Types.Mixed,
      default: () => ({}),
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

withSoftDelete(themeSchema);

themeSchema.index(
  { ownerId: 1, slug: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  },
);

themeSchema.index({ isPublic: 1, category: 1, createdAt: -1, isDeleted: 1 });

export type Theme = InferSchemaType<typeof themeSchema>;
export type ThemeDocument = HydratedDocument<Theme>;
export type ThemeModel = SoftDeleteModel<Theme>;
export type ThemeId = Types.ObjectId;
export type ThemeWithSoftDelete = Theme & SoftDeleteFields;

export const ThemeModel =
  (models.Theme as ThemeModel | undefined) ??
  model<Theme, ThemeModel>("Theme", themeSchema);
