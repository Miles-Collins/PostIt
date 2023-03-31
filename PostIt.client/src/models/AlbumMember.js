import { Profile } from "./Account.js"


export class AlbumMember extends Profile{
  constructor(data){
    super(data.profile)
    this.albumMemberId = data.id
  }
}