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

}


export const picturesService = new PicturesService()