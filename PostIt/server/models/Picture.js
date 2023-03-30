import { Schema } from "mongoose";

export const PictureSchema = new Schema(
  {
    imgUrl: { type: String, required: true, minLength: 3, maxLength: 500 },
    albumId: { type: Schema.Types.ObjectId, required: true, ref: "Album" },
    creatorId: { type: Schema.Types.ObjectId, required: true, ref: "Account" },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

PictureSchema.virtual("creator", {
  localField: "creatorId",
  foreignField: "_id",
  justOne: true,
  ref: "Account",
});

PictureSchema.virtual("album", {
  localField: "albumId",
  foreignField: "_id",
  ref: "Album",
  justOne: true,
});
