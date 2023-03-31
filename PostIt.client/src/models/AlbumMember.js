

export class AlbumMember{
  constructor(data){
    this.albumMemberId = data.id
    this.albumId = data.albumId
    this.accountId = data.accountId
  }
}