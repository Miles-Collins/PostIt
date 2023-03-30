import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";

class AlbumsService {
  async Archive(albumId, userId) {
    let album = await this.getOne(albumId);
    if (album.creatorId != userId) {
      throw new Forbidden("You do not have permission to archive this album.");
    }
    album.archived = true;
    await album.save();
    return `${album.title} successfully archived!`;
  }
  async Edit(albumData) {
    let originalAlbum = await this.getOne(albumData.id);
    if (originalAlbum.creatorId != albumData.creatorId) {
      throw new Forbidden("You do not have permission to edit this Album.");
    }
    originalAlbum.title = albumData.title || originalAlbum.title;
    originalAlbum.category = albumData.category || originalAlbum.category;
    originalAlbum.coverImg = albumData.coverImg || originalAlbum.coverImg;

    await originalAlbum.save();
    return originalAlbum;
  }
  async getOne(id) {
    let album = await dbContext.Album.findById(id)
      .populate("members")
      .populate("creator")
      .populate("memberCount");
    if (album == null) {
      throw new BadRequest("Album does not exist.");
    }
    return album;
  }
  async GetAll() {
    let albums = await dbContext.Album.find()
      .populate("creator")
      .populate("memberCount");
    return albums;
  }
  async Create(albumData) {
    let album = await dbContext.Album.create(albumData);
    return album;
  }

  // SECTION PICTURES

  async getPictures(albumId) {
    let pictures = await dbContext.Picture.find({ albumId });
    return pictures;
  }

  // SECTION MEMBERS

  async getMembers(albumId) {
    // let album = await this.getOne(albumId);
    let members = await dbContext.AlbumMember.find({ albumId })
      .populate("account")
      .populate("album");
    return members;
  }

  // SECTION MY ALBUMS

  async getMyAccounts(creatorId) {
    let albums = await dbContext.Album.find({ creatorId });
    return albums;
  }
}

export const albumsService = new AlbumsService();
