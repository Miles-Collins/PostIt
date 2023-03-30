<template>
  <div class="card AlbumCard">
    <div class="row">
      <img :src="album.coverImg" alt="">
    </div>

    <div class="row">
      <p>{{ album.title }}</p>
    </div>

    <!-- TODO memberCount will go here -->
    <!-- <div class="row">
      <p>{{}}</p>
    </div> -->

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Album } from '../models/Album.js';

export default {
  props: {
    album: { type: Album, required: true }
  },

  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped></style>