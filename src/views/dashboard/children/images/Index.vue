<template>
  <div id="images-index">
    <div class="my-bar ml-4 my-3">
      <router-link
        :to="{ name: 'new_image_path' }"
        class="button is-success ml-2"
      >
        <span>New Image</span>
        <span class="icon">
          <font-awesome-icon icon="plus" />
        </span>
      </router-link>
      <Browser :makeSearch="makeSearch" :requestImages="requestImages" />
    </div>
    <div class="columns is-multiline mx-3">
      <div v-if="images.length < 1" class="mt-5 mx-3">
        <h1 class="title is-2">Not image(s) found</h1>
      </div>
      <div
        class="column is-one-quarter-desktop is-half-tablet"
        v-for="(image, index) in images"
        :key="index"
      >
        <Card :image="image" />
      </div>
    </div>
    <div id="modal">
      <div id="modal-background"></div>
      <div class="modal-content">
        <p class="image is-3by3">
          <img id="image-modal" alt="image" class="is-hidden" />
        </p>
      </div>
    </div>
    <div class="my-4 mx-5">
      <nav class="pagination" role="navigation" aria-label="pagination">
        <a
          v-if="prevPage"
          @click="goToPage(prevPage)"
          class="pagination-previous nav-button page-button"
        >
          <span class="icon mr-2">
            <font-awesome-icon icon="arrow-left" />
          </span>
          <span>
            Previous Page
          </span>
        </a>
        <a
          v-if="nextPage"
          @click="goToPage(nextPage)"
          class="pagination-next nav-button page-button"
        >
          <span>
            Next Page
          </span>
          <span class="icon ml-2">
            <font-awesome-icon icon="arrow-right" />
          </span>
        </a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Card from "@/components/Card";
import Browser from "@/components/Browser";
export default {
  name: "images-index",
  components: {
    Card,
    Browser,
  },
  computed: {
    ...mapState("images", ["images", "nextPage", "prevPage"]),
  },
  mounted() {
    this.requestImages();
  },
  destroyed() {
    this.$store.dispatch("images/cleanImages");
  },
  methods: {
    requestImages() {
      this.$store.dispatch("images/getImages", {
        page: 1,
      });
    },
    makeSearch(searchInput) {
      this.$store.dispatch("images/searchImages", {
        page: 1,
        search: searchInput,
      });
    },
    goToPage(page) {
      this.$store.dispatch("images/getImages", {
        page: page,
      });
    },
  },
};
</script>
