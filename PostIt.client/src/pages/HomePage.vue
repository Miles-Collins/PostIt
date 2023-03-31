<template>
  <!-- SECTION MY ALBUMS or ALBUMS I COLLABORATE ON -->
  <div class="row justify-content-center">
    <div class="col-md-10" v-if="account.id && myAlbums.length">
      <h1>My Albums</h1>
      <div class="row">
        <div class="col-md-4" v-for="a in myAlbums" :key="a.id">
          <AlbumCard :album="a" />
        </div>
      </div>
    </div>
  </div>

  <!-- SECTION FILTER BAR -->
  <div class="row justify-content-center">
    <div class="col-md-10">
      <div class="d-flex justify-content-around p-3">
        <button class="btn btn-outline-dark" @click="changeFilterCategory('')">All</button>
        <button class="btn btn-outline-dark" @click="changeFilterCategory('cars')">Cars</button>
        <button class="btn btn-outline-dark" @click="changeFilterCategory('animals')">Animals</button>
        <button class="btn btn-outline-dark" @click="changeFilterCategory('pokemon')">Pokemon</button>
        <button class="btn btn-outline-dark" @click="changeFilterCategory('germs')">Germs</button>
        <button class="btn btn-outline-dark" @click="changeFilterCategory('food')">Food</button>
        <button class="btn btn-outline-dark" @click="changeFilterCategory('coding')">Coding</button>
        <button class="btn btn-outline-dark" @click="changeFilterCategory('games')">Games</button>
        <button class="btn btn-outline-dark" @click="changeFilterCategory('music')">Music</button>
        <button class="btn btn-outline-dark" @click="changeFilterCategory('fish')">Fish</button>
        <button class="btn btn-outline-dark" @click="changeFilterCategory('misc')">Misc</button>
      </div>
    </div>
  </div>

  <!-- SECTION ALL ALBUMS -->
  <div class="row justify-content-center">
    <!-- NOTE data dump to check that we are getting albums from the appState -->
    <!-- {{ albums }} -->
    <div class="col-md-7">
      <div class="row">
        <div class="col-md-3" v-for="a in albums" :key="a.id">
          <!-- STUB ALBUMS COMPONENT -->
          <AlbumCard :album="a" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import AlbumCard from '../components/AlbumCard.vue';
import { albumMembersService } from '../services/AlbumMembersService.js';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const filterCategory = ref('')

    async function getAllAlbums() {
      try {
        await albumsService.getAllAlbums();
      }
      catch (error) {
        console.error(error);
        // @ts-ignore 
        Pop.error(("[ERROR]"), error.message);
      }
    }

    // async function getMyCollabAlbums() {
    //   try {
    //     await albumMembersService.getMyCollabAlbums()
    //   } catch (error) {
    //     console.error(error)
    //     // @ts-ignore 
    //     Pop.error(('[ERROR]'), error.message)
    //   }
    // }

    onMounted(() => {
      getAllAlbums();
      // getMyCollabAlbums()
    });

    return {
      albums: computed(() => {
        if (!filterCategory.value) {
          return AppState.albums
        } else {
          return AppState.albums.filter(a => a.category == filterCategory.value)
        }
      }),
      myAlbums: computed(() => AppState.myAlbums),
      account: computed(() => AppState.account),

      changeFilterCategory(category) {
        filterCategory.value = category
      }

    };
  },
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
