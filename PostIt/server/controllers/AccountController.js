import { Auth0Provider } from "@bcwdev/auth0provider";
import { accountService } from "../services/AccountService";
import { albumsService } from "../services/AlbumsService";
import BaseController from "../utils/BaseController";

export class AccountController extends BaseController {
  constructor() {
    super("account");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserAccount)
      .get("/albums", this.getAlbums);
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo);
      res.send(account);
    } catch (error) {
      next(error);
    }
  }

  async getAlbums(req, res, next) {
    try {
      let creatorId = req.userInfo.id;
      const albums = await albumsService.getMyAccounts(creatorId);
      return res.send(albums);
    } catch (error) {
      next(error);
    }
  }
}
