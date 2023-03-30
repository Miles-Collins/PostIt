import { dbContext } from "../db/DbContext";

class PicturesService {
  async Create(pictureData) {
    let picture = await dbContext.Picture.create(pictureData);
    await picture.populate("creator");
    await picture.populate("album");
    return picture;
  }
}

export const picturesService = new PicturesService();
