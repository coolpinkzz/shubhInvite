import { type HydratedDocument, type Model, Schema } from "mongoose";

export type SoftDeleteFields = {
  isDeleted: boolean;
  deletedAt: Date | null;
};

export type SoftDeleteDocument<T> = HydratedDocument<T & SoftDeleteFields>;

export type SoftDeleteModel<T> = Model<T & SoftDeleteFields>;

export function withSoftDelete<T>(schema: Schema<T>) {
  schema.add({
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  } as never);

  schema.index({ isDeleted: 1, deletedAt: 1 });
}
