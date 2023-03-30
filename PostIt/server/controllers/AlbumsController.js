import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumsService } from "../services/AlbumsService";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger";

export class AlbumsController extends BaseController {
  constructor() {
    super("api/albums");
    this.router
      .get("", this.getAll)
      .get("/:id", this.getOne)
      .get("/:id/pictures", this.getPictures)
      .get("/:id/collaborators", this.getMembers)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.archive);
  }

  // CREATE
  async create(req, res, next) {
    try {
      let albumData = req.body;
      albumData.creatorId = req.userInfo.id;
      let album = await albumsService.Create(albumData);
      return res.send(album);
    } catch (error) {
      next(error);
    }
  }

  // GET ALL
  async getAll(req, res, next) {
    try {
      let albums = await albumsService.GetAll();
      return res.send(albums);
    } catch (error) {
      next(error);
    }
  }

  // GET ONE
  async getOne(req, res, next) {
    try {
      let albumId = req.params.id;
      let album = await albumsService.getOne(albumId);
      return res.send(album);
    } catch (error) {
      next(error);
    }
  }

  // EDIT
  async edit(req, res, next) {
    try {
      let albumData = req.body;
      albumData.id = req.params.id;
      albumData.creatorId = req.userInfo.id;
      let album = await albumsService.Edit(albumData);
      return res.send(album);
    } catch (error) {
      next(error);
    }
  }

  // "DELETE"
  async archive(req, res, next) {
    try {
      let userId = req.userInfo.id;
      let albumId = req.params.id;
      let string = await albumsService.Archive(albumId, userId);
      return res.send(string);
    } catch (error) {
      next(error);
    }
  }

  // SECTION PICTURES

  async getPictures(req, res, next) {
    try {
      let albumId = req.params.id;
      let pictures = await albumsService.getPictures(albumId);
      return res.send(pictures);
    } catch (error) {
      next(error);
    }
  }

  // SECTION MEMBERS

  async getMembers(req, res, next) {
    try {
      let albumId = req.params.id;
      let member = await albumsService.getMembers(albumId);
      return res.send(member);
    } catch (error) {
      next(error);
    }
  }
}
