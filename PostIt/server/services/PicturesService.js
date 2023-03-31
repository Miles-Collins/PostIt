import { dbContext } from "../db/DbContext";
import { Forbidden } from "../utils/Errors";

class PicturesService {
  async Create(pictureData) {
    let albumId = pictureData.albumId;
    let accountId = pictureData.creatorId;
    let collaborator = await dbContext.AlbumMember.findOne({
      albumId,
      accountId,
    });
    if (collaborator == null) {
      throw new Forbidden(`You are not a collaborator on this Album.`);
    }
    let picture = await dbContext.Picture.create(pictureData);
    await picture.populate("creator");
    await picture.populate("album");
    return picture;
  }
}

export const picturesService = new PicturesService();
