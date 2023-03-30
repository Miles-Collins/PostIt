import { Auth0Provider } from "@bcwdev/auth0provider";
import { albumMembersService } from "../services/AlbumMembersService";
import BaseController from "../utils/BaseController";

export class AlbumMembersController extends BaseController {
  constructor() {
    super("api/collaborators");
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post("", this.create)
      .delete("/:id", this.delete);
  }

  async create(req, res, next) {
    try {
      let memberData = req.body;
      memberData.accountId = req.userInfo.id;
      let member = await albumMembersService.create(memberData);
      return res.send(member);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      let userId = req.userInfo.id;
      let memberId = req.params.id;
      let string = await albumMembersService.delete(memberId, userId);
      return res.send(string);
    } catch (error) {
      next(error);
    }
  }
}
