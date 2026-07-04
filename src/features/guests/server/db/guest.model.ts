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

const guestContactSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
      maxlength: 320,
    },
    phone: {
      type: String,
      trim: true,
      default: null,
      maxlength: 20,
    },
  },
  { _id: false },
);

const guestSchema = new Schema(
  {
    invitationId: {
      type: Schema.Types.ObjectId,
      ref: "Invitation",
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    householdId: {
      type: String,
      trim: true,
      default: null,
      index: true,
    },
    primaryGuestId: {
      type: Schema.Types.ObjectId,
      ref: "Guest",
      default: null,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 140,
    },
    firstName: {
      type: String,
      trim: true,
      default: null,
      maxlength: 70,
    },
    lastName: {
      type: String,
      trim: true,
      default: null,
      maxlength: 70,
    },
    contact: {
      type: guestContactSchema,
      default: () => ({}),
    },
    relationship: {
      type: String,
      trim: true,
      default: null,
    },
    tags: {
      type: [String],
      default: [],
    },
    partySize: {
      type: Number,
      default: 1,
      min: 1,
    },
    adults: {
      type: Number,
      default: 1,
      min: 0,
    },
    children: {
      type: Number,
      default: 0,
      min: 0,
    },
    accessCode: {
      type: String,
      trim: true,
      uppercase: true,
      default: null,
      maxlength: 32,
    },
    notes: {
      type: String,
      trim: true,
      default: null,
      maxlength: 1000,
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

withSoftDelete(guestSchema);

guestSchema.index({ invitationId: 1, householdId: 1, isDeleted: 1 });
guestSchema.index({ invitationId: 1, fullName: 1, isDeleted: 1 });
guestSchema.index(
  { invitationId: 1, accessCode: 1 },
  {
    unique: true,
    partialFilterExpression: {
      accessCode: { $type: "string" },
      isDeleted: false,
    },
  },
);
guestSchema.index(
  { invitationId: 1, "contact.email": 1 },
  {
    partialFilterExpression: {
      "contact.email": { $type: "string" },
      isDeleted: false,
    },
  },
);

export type Guest = InferSchemaType<typeof guestSchema>;
export type GuestDocument = HydratedDocument<Guest>;
export type GuestModel = SoftDeleteModel<Guest>;
export type GuestId = Types.ObjectId;
export type GuestWithSoftDelete = Guest & SoftDeleteFields;

export const GuestModel =
  (models.Guest as GuestModel | undefined) ??
  model<Guest, GuestModel>("Guest", guestSchema);
