<template>
  <div>
    <Navigation />
    <div class="container" style="margin-top: 20px;">
      <h1>Edit Photo</h1>
      <form id="my-form" @submit.prevent="edit" enctype="multipart/form-data" method="post">
              <div class="form-group">
                <label for="exampleFormControlInput1">Title</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Title"
                  v-model="title"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlTextarea1">Description</label>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="description"
                ></textarea>
              </div>
              <div class="form-group">
                <label for="exampleFormControlInput1">Photographer</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Photographer"
                  v-model="photographer"
                />
              </div>
              <div class="form-group">
                <label for="exampleFormControlSelect1">Categories</label>
                <select
                  class="form-control"
                  id="exampleFormControlSelect1"
                  v-model="categories"
                >
                  <option disabled selected value=""
                    >---Select category---</option
                  >
                  <option value="nature">nature</option>
                  <option value="game">game</option>
                  <option value="animal">animal</option>
                  <option value="mountain">mountain</option>
                  <option value="other">other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="exampleFormControlFile1">Photo Url</label>
                <input
                v-model="photo_url"
                  type="url"
                  class="form-control-file"
                  id="exampleFormControlFile1"
                  
                  name="photo_url"
                />
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="toHome()"
                >
                  Cancel
                </button>
                <button type="submit" class="btn btn-primary">Edit</button>
              </div>
            </form>
    </div>
  </div>
</template>

<script>
import Navigation from '../components/Navigation'
export default {
  name: 'EditPhoto',
  components: {
    Navigation
  },
  data(){
    return {
      title: '', description: '', photographer: '', photo_url: '', categories: ''
    }
  },
  methods: {
    getPhotoById(){
      let id = this.$route.params.id
      this.$store.dispatch('getPhotoById', +id)
      .then(({data}) => {
        console.log(data)
        this.title = data[0].title
        this.description = data[0].description
        this.photographer = data[0].photographer
        this.photo_url = data[0].photo_url
        this.categories = data[0].categories
      })
    },
    toHome(){
      this.$router.push('/')
    },
    edit(){
      this.$store.dispatch('editPhoto', {
        id: +this.$route.params.id,
        title: this.title,
        description: this.description,
        photographer: this.photographer,
        photo_url: this.photo_url,
        categories: this.categories
      })
    }
  },
  created(){
    this.getPhotoById()
  }
}
</script>

<style>

</style>