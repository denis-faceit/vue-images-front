<template>
  <div id="new-image" class="my-6 mx-6">
    <form @submit.prevent="newImage">
      <div class="columns">
        <div class="column">
          <h3 class="title is-2">New Image</h3>
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="name"
                placeholder="Name (4 to 30 characters)"
                required
              />
            </div>
          </div>
          <div class="file has-name is-right is-fullwidth">
            <label class="file-label">
              <input class="file-input" type="file" v-on:change="onChange" />
              <span class="file-cta">
                <span class="file-label">
                  Select image
                </span>
                <span class="icon">
                  <font-awesome-icon icon="file-image" />
                </span>
              </span>
              <span class="file-name" v-if="this.file">
                {{ this.file.name }}
              </span>
              <span class="file-name" v-else>
                No image selected (format jpg, jpeg or png)
              </span>
            </label>
          </div>
          <div class="field my-5" v-if="this.urlPreview">
            <div class="control">
              <figure class="preview">
                <img
                  class="preview-image"
                  :src="this.urlPreview"
                  alt="preview"
                  width="400"
                  height="400"
                />
              </figure>
            </div>
          </div>
          <div class="buttons my-5">
            <button class="button is-success" style="margin-left: auto;">
              <span class="mt-1">Upload</span>
              <span class="icon">
                <font-awesome-icon icon="upload" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </form>
    <router-link :to="{ name: 'images_path' }" class="button is-info">
      <span class="icon">
        <font-awesome-icon icon="arrow-left" />
      </span>
      <span>Back to the index of images</span>
    </router-link>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "new-image",
  data() {
    return {
      name: "",
      file: "",
      urlPreview: "",
    };
  },
  computed: {
    ...mapState("forms", ["errors"]),
    ...mapState("notifications", ["notification"]),
  },
  destroyed() {
    this.$store.dispatch("notifications/cleanNotification");
  },
  methods: {
    onChange(e) {
      this.file =
        e.target.files[0] && e.target.files[0].type.includes("image/")
          ? e.target.files[0]
          : "";
      this.urlPreview = this.file ? URL.createObjectURL(this.file) : "";
    },
    displaySave(message) {
      this.$store.dispatch("notifications/successMessage", message);
      this.flashMessage.success(this.notification);
    },
    displayError(message) {
      this.$store.dispatch("notifications/errorMessage", message);
      this.flashMessage.error(this.notification);
      this.$store.dispatch("forms/cleanErrors");
    },
    newImage() {
      this.$store.dispatch("forms/formsValidations", {
        name: this.name,
        file: this.file,
      });
      if (!this.errors) {
        let image = new FormData();
        image.append("archive[name]", this.name);
        image.append("archive[image]", this.file);
        this.$store
          .dispatch("images/postImage", image)
          .then((response) => {
            this.displaySave("Image saved with success");
            this.$router.push({
              name: "show_image_path",
              params: { token: response.token },
            });
          })
          .catch(() => {
            this.displayError(
              "Oops! a problem has occurred, the action you were taking has been aborted"
            );
            this.$router.push({ name: "images_path" });
          });
      } else {
        this.displayError(this.errors);
      }
    },
  },
};
</script>
