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
          <p>Collaborators: <span>{{ albumMembers.length }}</span></p>
        </div>
        <div class="col-md-6" v-if="!foundCollab">
          <button class="btn btn-primary" @click="collabOnAlbum()">Collab</button>
        </div>

        <div class="col-md-6" v-else>
          <button class="btn btn-danger" @click="removeCollab(foundCollab.albumMemberId)">Remove Collab</button>
        </div>

      </div>
      <div class="row">
        <!-- STUB COLLABORATOR CARDS WILL GO HERE -->
        <!-- <p>{{ a.name }}</p> -->
        <div class="col-md-2" v-for="a in albumMembers" :key="a.id">
          <img class="img-fluid rounded-circle" :src="a.picture" alt="">
        </div>
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
      pictures: computed(() => AppState.pictures),
      albumMembers: computed(() => AppState.albumMembers),
      foundCollab: computed(() => AppState.albumMembers.find(a => a.id == AppState.account.id)),

      async collabOnAlbum() {
        try {
          await albumMembersService.collabOnAlbum({ albumId: route.params.albumId })
        } catch (error) {
          console.error(error)
          // @ts-ignore 
          Pop.error(('[ERROR]'), error.message)
        }
      },

      async removeCollab(albumMemberId) {
        try {
          if (await Pop.confirm('Are you sure you want to stop collabing?')) {
            await albumMembersService.removeCollab(albumMemberId)
          }
        } catch (error) {
          console.error(error)
          // @ts-ignore 
          Pop.error(('[ERROR]'), error.message)
        }
      }

    }
  }
};
</script>


<style lang="scss" scoped></style>