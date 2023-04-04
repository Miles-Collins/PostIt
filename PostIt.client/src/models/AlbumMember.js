import { Profile } from "./Account.js"


export class AlbumMember extends Profile {
  constructor(data) {
    super(data.profile)
    // this is the collaborator.id
    this.albumMemberId = data.id
  }
}