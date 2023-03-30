import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";
import { albumsService } from "./AlbumsService";

class AlbumMembersService {
  async delete(memberId, userId) {
    let member = await dbContext.AlbumMember.findById(memberId).populate(
      "account"
    );
    if (member == null) {
      throw new BadRequest("This member does not exist.");
    }
    if (member.accountId != userId) {
      throw new Forbidden(`You are not that member.`);
    }
    await member.remove();
    return `Successfully deleted member.`;
  }
  async create(memberData) {
    let album = await albumsService.getOne(memberData.albumId);

    if (album.archived == true) {
      throw new BadRequest(`${album.title} is archived, you can not join it.`);
    }

    let member = await dbContext.AlbumMember.create(memberData);
    await member.populate("album");
    await member.populate("account");
    return member;
  }
}

export const albumMembersService = new AlbumMembersService();
