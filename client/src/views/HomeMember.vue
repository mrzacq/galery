<template>
  <div>
    <Navigation></Navigation>
    <div class="container">
      <div class="card" style="width: 18rem;" v-for="(photo, index) in photos" :key="index">
        <img
          class="card-img-top"
          v-bind:src="photo.photo_url"
          alt="Card image cap"
        />
        <div class="card-body">
          <h5 class="card-title">{{ photo.title }}</h5>
          <footer class="blockquote-footer">{{photo.photographer}} {{photo.date | formatDate}}</footer>
          <br />
          <p class="card-text">
            {{photo.description}}
          </p>
          {{photos.title}}
          <a class="btn btn-outline-danger" @click.prevent="like()">Like</a>
        </div>
      </div>
    </div>
    <div class="pagination">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a class="page-link" href="#">Previous</a></li>
          <li class="page-item"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item"><a class="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Navigation from "../components/Navigation";
export default {
  name: "HomeMember",
  components: {
    Navigation,
  },
  methods: {
    like() {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Liked",
      });
    },
    fetchPhotos() {
      this.$store.dispatch("fetchPhotos");
    },
  },
  computed: {
    photos() {
      return this.$store.state.photos;
    },
  },
  created() {
    this.fetchPhotos();
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
}
.card {
  margin: 20px;
}
.pagination {
  display: flex;
  justify-content: center;
}
</style>
