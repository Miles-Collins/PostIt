<template>
  <!-- SECTION MY ALBUMS -->
  <div class="row justify-content-center">
    <div class="col-md-10">
      <h1>My Albums</h1>
    </div>
  </div>

  <!-- SECTION FILTER BAR -->
  <div class="row justify-content-center">
    <div class="col-md-8">
      <h1>Search Bar</h1>
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
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import AlbumCard from '../components/AlbumCard.vue';
import { albumsService } from '../services/AlbumsService.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

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
    onMounted(() => {
      getAllAlbums();
    });

    return {
      albums: computed(() => AppState.albums)
    };
  },
  components: { AlbumCard }
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
