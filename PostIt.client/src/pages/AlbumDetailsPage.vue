<template>
  <div class="row AlbumDetails" v-if="album">
    <div class="col-md-4">
      <div class="row">
        <div class="col-md-6">
          <img class="img-fluid" :src="album.coverImg" alt="">
        </div>
        <div class="col-md-6">
          <h4>{{ album.title }}</h4>
          <p>{{ album.creator?.name }}</p>
          <button class="btn btn-info">Add Picture</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <p># Collaborators</p>
        </div>
        <div class="col-md-6">
          <button class="btn btn-primary">Collaborate</button>
        </div>
      </div>
      <div class="row">
        <!-- STUB COLLABORATOR CARDS WILL GO HERE -->
        <p>Collaborator images</p>
        <img src="" alt="">
      </div>
    </div>

    <div class="col-md-8">
      <div class="row">
        <div class="card col-md-3 p-2 m-2" v-for="p in pictures" :key="p.id">
          <!-- STUB ALBUM PICTURES WILL GO HERE -->
          <img class="img-fluid" :src="p.imgUrl" alt="">
        </div>
      </div>
    </div>

  </div>
</template>



<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import Pop from '../utils/Pop.js';
import { albumsService } from '../services/AlbumsService.js';
import { useRoute } from 'vue-router';
import { picturesService } from '../services/PicturesService.js';
import { albumMembersService } from '../services/AlbumMembersService.js'


export default {
  setup() {
    const route = useRoute()

    async function getAlbumById() {
      try {
        const albumId = route.params.albumId
        await albumsService.getAlbumById(albumId)
      } catch (error) {
        console.error(error)
        // @ts-ignore 
        Pop.error(('[ERROR]'), error.message)
      }
    }

    async function getAlbumPictures() {
      try {
        const albumId = route.params.albumId
        await picturesService.getAlbumPictures(albumId)
      } catch (error) {
        console.error(error)
        // @ts-ignore 
        Pop.error(('[ERROR]'), error.message)
      }
    }

    async function getAlbumMembers() {
      try {
        const albumId = route.params.albumId
        await albumMembersService.getAlbumMembers(albumId)
      } catch (error) {
        console.error(error)
        // @ts-ignore 
        Pop.error(('[ERROR]'), error.message)
      }
    }

    watchEffect(() => {
      getAlbumById()
      getAlbumPictures()
      getAlbumMembers()
    })

    return {
      album: computed(() => AppState.album),
      pictures: computed(() => AppState.pictures)
    }
  }
};
</script>


<style lang="scss" scoped></style>