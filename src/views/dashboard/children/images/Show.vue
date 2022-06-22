<template>
  <div id="images-show">
    <div class="my-6  has-text-centered">
      <h1 class="title is-2">{{ image.name }}</h1>
      <h2 class="title is-4">Uploaded by @{{ image.user_name }}</h2>
      <figure class="preview">
        <img
          class="preview-image"
          :src="image.url"
          alt="image"
          width="768"
          height="216"
        />
      </figure>
    </div>
    <router-link :to="{ name: 'images_path' }" class="button is-info ml-6">
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
  name: "images-show",
  computed: {
    ...mapState("images", ["image"]),
  },
  mounted() {
    this.$store.dispatch("images/getImage", this.$route.params.token);
  },
  destroyed() {
    this.$store.dispatch("images/cleanImage");
  },
};
</script>
