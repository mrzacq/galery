<template>
  <div class="container">
    <button
      type="button"
      class="btn btn-primary"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      Create Post
    </button>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create Post</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form id="my-form" @submit.prevent="upload" enctype="multipart/form-data" method="post">
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
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Upload</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPhoto",
  data() {
    return {
      title: "",
      description: "",
      photographer: "",
      categories: "",
      photo_url: ""
    };
  },
  methods: {
    upload() {
      this.$store.dispatch("addPhoto", {
        title: this.title,
        description: this.description,
        photographer: this.photographer,
        categories: this.categories,
        photo_url: this.photo_url
      });
    },
  },
};
</script>

<style></style>
