import { AppState } from "../AppState.js";
import { Album } from "../models/Album.js";
import { api } from "./AxiosService.js"


class AlbumsService {

  async getAllAlbums() {
    const res = await api.get('api/albums')
    // console.log('[GETTING ALBUMS]', res.data);
    AppState.albums = res.data.map(a => new Album(a))
    console.log('[ALBUMS IN THE APPSTATE]', AppState.albums);
    // AppState.albums = albums
  }

  async getAlbumById(albumId) {
    const res = await api.get(`api/albums/${albumId}`)
    console.log('[GETTING ALBUM BY ID]', res.data);
    AppState.album = res.data
  }

  async createAlbum(albumData) {
    const res = await api.post('api/albums', albumData)
    console.log('[CREATING AN ALBUM]', res.data);
    AppState.albums.push(res.data)
  }

  async archiveAlbum() {
    const albumId = AppState.album.id
    const res = await api.delete(`api/albums/${albumId}`)
    console.log('[ARCHIVING AN ALBUM]', res.data);
    AppState.album.archived = true
  }

}


export const albumsService = new AlbumsService()