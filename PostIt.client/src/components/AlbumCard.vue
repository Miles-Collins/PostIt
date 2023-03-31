<template>
  <div class="card AlbumCard">
    <router-link :to="{ name: 'AlbumDetails', params: { albumId: album.id } }">
      <div class="row">
        <img :src="album.coverImg" alt="">
      </div>

      <div class="row">
        <p>{{ album.title }}</p>
      </div>

      <!-- TODO memberCount will go here -->
      <div class="row text-dark">
        <div class="col-md-12">
          <p>{{ album.memberCount }}</p>
        </div>
      </div>

    </router-link>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Album } from '../models/Album.js';
import { RouterLink } from 'vue-router';

export default {
  // NOTE this keeps giving me a vue warning even though I mapped it to the model, had to change it to Object
  props: {
    album: { type: Object, required: true }
  },
  setup() {
    return {};
  },
  components: { RouterLink }
};
</script>


<style lang="scss" scoped></style>