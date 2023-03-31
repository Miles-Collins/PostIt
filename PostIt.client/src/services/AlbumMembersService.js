import { AppState } from "../AppState.js";
import { CollabAlbum } from "../models/Album.js";
import { AlbumMember } from "../models/AlbumMember.js";
import { api } from "./AxiosService.js";


class AlbumMembersService {

  async getAlbumMembers(albumId) {
    // debugger
    const res = await api.get(`api/albums/${albumId}/collaborators`)
    console.log('[GETTING ALBUM COLLABORATORS]', res.data);
    AppState.albumMembers = res.data.map(m => new AlbumMember(m))
  }

  async collabOnAlbum(albumData) {
    const res = await api.post('api/collaborators', albumData)
    console.log('[CREATING A COLLAB]', res.data);
    AppState.albumMembers.push(new AlbumMember(res.data))
    AppState.myAlbums.push(new CollabAlbum(res.data))
  }

  async removeCollab(albumMemberId) {
    const res = await api.delete(`api/collaborators/${albumMemberId}`)
    console.log('[REMOVING COLLAB]', res.data);
    const collabIndex = AppState.albumMembers.findIndex(a => a.albumMemberId == albumMemberId)
    if (collabIndex !== -1) {
      AppState.albumMembers.splice(collabIndex, 1)
    }
    const collabAlbumIndex = AppState.myAlbums.findIndex(m => m.collaboratorId == albumMemberId)
    if (collabAlbumIndex !== -1) {
      AppState.myAlbums.splice(collabAlbumIndex, 1)
    }
  }

  async getMyCollabAlbums() {
    const res = await api.get('account/collaborators')
    console.log('[GETTING MY COLLABS]', res.data);
    AppState.myAlbums = res.data.map(a => new CollabAlbum(a))
  }

}


export const albumMembersService = new AlbumMembersService()