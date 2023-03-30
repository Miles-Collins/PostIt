

export class Album{
  constructor(data){
    this.id = data.id
    this.title = data.title
    this.coverImg = data.coverImg
    this.category = data.category
    this.archived = data.archived
    this.creatorId = data.creatorId
  }
}