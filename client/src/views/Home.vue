<template>
  <div class="home">
    <Navigation></Navigation>
    <AddPhoto></AddPhoto>
    <div class="container">
      <table class="table">
  <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Title</th>
      <th scope="col">Description</th>
      <th scope="col">Date</th>
      <th scope="col">Photographer</th>
      <th scope="col">Image</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(photo, index) in photos" :key="index">
      <th>{{index+1}}.</th>
      <td>{{ photo.title }}</td>
      <td>{{photo.description}}</td>
      <td>{{photo.date | formatDate}}</td>
      <td>{{photo.photographer}}</td>
      <td><img v-bind:src="photo.photo_url" v-bind:alt="photo.title" style="width: 150px; height: 150px;"></td>
      <td>
        <button class="btn btn-outline-success" @click="edit(photo.id)">Edit</button>
        <button class="btn btn-outline-danger" @click.prevent="destroy(photo.id)">Delete</button>
      </td>
    </tr>
  </tbody>
</table>
    </div>
  </div>
</template>

<script>
import EditPhoto from './EditPhoto'
import Navigation from "../components/Navigation";
import AddPhoto from "./AddPhoto";

export default {
  name: "Home",
  components: {
    Navigation,
    AddPhoto,
  },
  created(){
    this.fetchPhotos()
  },
  computed: {
    photos(){
      return this.$store.state.photos
    }
  },
  methods: {
    fetchPhotos(){
      this.$store.dispatch('fetchPhotos')
    },
    destroy(id){
      this.$store.dispatch('destroy', id)
    },
    edit(id){
      this.$router.push(`/edit/${id}`)
    }
  }
};
</script>
<style scoped>
.container {
  margin-top: 20px;
}
button{
  margin-left: 10px;
}
</style>
