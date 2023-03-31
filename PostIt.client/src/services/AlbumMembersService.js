import { AppState } from "../AppState.js";
import { AlbumMember } from "../models/AlbumMember.js";
import { api } from "./AxiosService.js";


class AlbumMembersService{

  async getAlbumMembers(albumId){
    // debugger
    const res = await api.get(`api/albums/${albumId}/collaborators`)
    console.log('[GETTING ALBUM COLLABORATORS]', res.data);
    AppState.albumMembers = res.data.map(m => new AlbumMember(m))
  }

}


export const albumMembersService = new AlbumMembersService()