import { api } from "./AxiosService.js";


class AlbumMembersService{

  async getAlbumMembers(albumId){
    // debugger
    const res = await api.get(`api/albums/${albumId}/collaborators`)
    console.log('[GETTING ALBUM COLLABORATORS]', res.data);
  }

}


export const albumMembersService = new AlbumMembersService()