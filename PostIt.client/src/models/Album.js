import { Profile } from "./Account.js"


export class Album {
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.coverImg = data.coverImg
    this.category = data.category
    this.archived = data.archived
    this.creatorId = data.creatorId
    this.creator = new Profile(data.creator)
    this.memberCount = data.memberCount || 0
  }
}

export class CollabAlbum extends Album {
  constructor(data) {
    super(data.album)
    this.collaboratorId = data.id
  }
}