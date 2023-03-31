<template>
  <div class="AlbumForm">
    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Create an Album!</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>


          <div class="modal-body">
            <form action="" @submit="createAlbum()">
              <div class="m-2">
                <input class="form-control" type="text" name="title" id="title" placeholder="Album Title..."
                  v-model="editable.title">
              </div>

              <div class="m-2">
                <input class="form-control" type="url" name="coverImg" id="coverImg" placeholder="Add an Album Image..."
                  v-model="editable.coverImg">
              </div>

              <div class="m-3">
                <label for="category">Select an Album Category</label>
                <select class="form-select" name="category" id="category" v-model="editable.category">
                  <option value="cars">Cars</option>
                  <option value="animals">Animals</option>
                  <option value="pokemon">Pokemon</option>
                  <option value="misc">Misc</option>
                  <option value="fish">Fish</option>
                  <option value="germs">Germs</option>
                  <option value="coding">Coding</option>
                  <option value="games">Games</option>
                  <option value="music">Music</option>
                </select>
              </div>

              <div class="text-end">
                <button class="btn btn-success" type="click" data-bs-dismiss="modal"
                  @click="createAlbum()">Submit</button>
              </div>

            </form>
          </div>


          <!-- <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Submit</button>
          </div> -->

        </div>
      </div>
    </div>

  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { albumsService } from '../services/AlbumsService.js';
export default {
  setup() {
    const editable = ref({})
    return {
      editable,

      async createAlbum() {
        try {
          window.event.preventDefault()
          const albumData = editable.value
          await albumsService.createAlbum(albumData)
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