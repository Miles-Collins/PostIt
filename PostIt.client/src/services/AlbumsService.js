import { AppState } from "../AppState.js";
import { Album } from "../models/Album.js";
import { api } from "./AxiosService.js"


class AlbumsService{

  async getAllAlbums(){
    const res = await api.get('api/albums')
    // console.log('[GETTING ALBUMS]', res.data);
    AppState.albums = res.data.map(a => new Album(a))
    console.log('[ALBUMS IN THE APPSTATE]', AppState.albums);
  }

}


export const albumsService = new AlbumsService()