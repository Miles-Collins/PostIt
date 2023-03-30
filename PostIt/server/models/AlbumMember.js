import { Schema } from "mongoose";

export const AlbumsMemberSchema = new Schema(
  {
    albumId: { type: Schema.Types.ObjectId, required: true, ref: "Album" },
    accountId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

AlbumsMemberSchema.virtual("album", {
  localField: "albumId",
  foreignField: "_id",
  ref: "Album",
});

AlbumsMemberSchema.virtual("account", {
  localField: "accountId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});
