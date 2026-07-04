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

const rsvpQuestionResponseSchema = new Schema(
  {
    questionKey: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      trim: true,
      default: null,
    },
    value: {
      type: Schema.Types.Mixed,
      default: null,
    },
  },
  { _id: false },
);

const rsvpSchema = new Schema(
  {
    invitationId: {
      type: Schema.Types.ObjectId,
      ref: "Invitation",
      required: true,
      index: true,
    },
    guestId: {
      type: Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["pending", "attending", "declined", "maybe"],
      default: "pending",
    },
    attendance: {
      confirmedGuests: {
        type: Number,
        default: 0,
        min: 0,
      },
      adults: {
        type: Number,
        default: 0,
        min: 0,
      },
      children: {
        type: Number,
        default: 0,
        min: 0,
      },
    },
    responses: {
      type: [rsvpQuestionResponseSchema],
      default: [],
    },
    note: {
      type: String,
      trim: true,
      default: null,
      maxlength: 2000,
    },
    source: {
      type: String,
      enum: ["guest", "host", "admin", "import"],
      default: "guest",
    },
    respondedAt: {
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

withSoftDelete(rsvpSchema);

rsvpSchema.index(
  { invitationId: 1, guestId: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isDeleted: false,
    },
  },
);
rsvpSchema.index({ invitationId: 1, status: 1, respondedAt: -1, isDeleted: 1 });

export type Rsvp = InferSchemaType<typeof rsvpSchema>;
export type RsvpDocument = HydratedDocument<Rsvp>;
export type RsvpModel = SoftDeleteModel<Rsvp>;
export type RsvpId = Types.ObjectId;
export type RsvpResponse = InferSchemaType<typeof rsvpQuestionResponseSchema>;
export type RsvpWithSoftDelete = Rsvp & SoftDeleteFields;

export const RsvpModel =
  (models.Rsvp as RsvpModel | undefined) ??
  model<Rsvp, RsvpModel>("Rsvp", rsvpSchema);
