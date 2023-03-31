<template>
  <form action="" @submit.prevent="createPicture()">
    <div>
      <label for="">Add a picture</label>
      <input required class="form-control" type="text" name="imgUrl" id="imgUrl" v-model="editable.imgUrl">
    </div>

    <div>
      <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Create</button>
    </div>

  </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { picturesService } from '../services/PicturesService.js';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const editable = ref({})

    const route = useRoute()

    return {
      editable,

      async createPicture() {
        try {
          let pictureData = editable.value
          pictureData.albumId = route.params.albumId
          await picturesService.createPicture(pictureData)
          pictureData = {}
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