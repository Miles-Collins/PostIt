import { AppState } from "../AppState.js"
import { Picture } from "../models/Picture.js";
import { api } from "./AxiosService.js"


class PicturesService{

  async getAlbumPictures(albumId){
    // NOTE why do we need to state here that pictures is an empty array?
    AppState.pictures = []
    const res = await api.get(`api/albums/${albumId}/pictures`)
    console.log('[GETTING ALBUM PICTURES]', res.data);
    AppState.pictures = res.data.map(p => new Picture(p))
  }

  async createPicture(pictureData){
    const res = await api.post('api/pictures', pictureData)
    console.log('[CREATING A PICTURE]', res.data);
    AppState.pictures.push(new Picture(res.data))
  }

}


export const picturesService = new PicturesService()