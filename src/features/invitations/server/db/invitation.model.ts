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

const invitationEventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 160,
    },
    hosts: {
      type: [String],
      default: [],
    },
    date: {
      type: Date,
      default: null,
    },
    venueName: {
      type: String,
      trim: true,
      default: null,
    },
    venueAddress: {
      type: String,
      trim: true,
      default: null,
    },
    timezone: {
      type: String,
      trim: true,
      default: "Asia/Kolkata",
    },
  },
  { _id: false },
);

const invitationSectionSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    variant: {
      type: String,
      trim: true,
      default: "default",
    },
    label: {
      type: String,
      trim: true,
      default: null,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      required: true,
      min: 0,
    },
    content: {
      type: Schema.Types.Mixed,
      default: () => ({}),
    },
    settings: {
      type: Map,
      of: Schema.Types.Mixed,
      default: () => ({}),
    },
  },
  { _id: false },
);

const invitationSeoSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      default: null,
    },
    description: {
      type: String,
      trim: true,
      default: null,
    },
    imageUrl: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { _id: false },
);

const invitationSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    themeId: {
      type: Schema.Types.ObjectId,
      ref: "Theme",
      default: null,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    event: {
      type: invitationEventSchema,
      required: true,
    },
    seo: {
      type: invitationSeoSchema,
      default: () => ({}),
    },
    sections: {
      type: [invitationSectionSchema],
      default: [],
      validate: {
        validator: (sections: Array<{ id: string }>) => {
          const uniqueIds = new Set(sections.map((section) => section.id));
          return uniqueIds.size === sections.length;
        },
        message: "Invitation sections must have unique ids.",
      },
    },
    settings: {
      type: Map,
      of: Schema.Types.Mixed,
      default: () => ({}),
    },
    publishedAt: {
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

withSoftDelete(invitationSchema);

invitationSchema.index(
  { ownerId: 1, slug: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  },
);

invitationSchema.index({ status: 1, publishedAt: -1, isDeleted: 1 });
invitationSchema.index({ "event.date": 1, isDeleted: 1 });

export type Invitation = InferSchemaType<typeof invitationSchema>;
export type InvitationDocument = HydratedDocument<Invitation>;
export type InvitationModel = SoftDeleteModel<Invitation>;
export type InvitationId = Types.ObjectId;
export type InvitationSection = InferSchemaType<typeof invitationSectionSchema>;
export type InvitationWithSoftDelete = Invitation & SoftDeleteFields;

export const InvitationModel =
  (models.Invitation as InvitationModel | undefined) ??
  model<Invitation, InvitationModel>("Invitation", invitationSchema);
