<template>
  <div id="browser" class="field has-addons ml-2 mr-5">
    <div class="control">
      <input
        type="text"
        class="input is-primary"
        placeholder="Search by name..."
        v-model="searchInput"
      />
    </div>
    <button class="button is-primary" @click="search()">
      <span class="icon">
        <font-awesome-icon icon="search" />
      </span>
    </button>
    <button v-if="isSearch" class="button is-info ml-3" @click="refresh()">
      <span class="icon">
        <font-awesome-icon icon="sync" />
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "browser",
  props: ["makeSearch", "requestImages"],
  data() {
    return {
      searchInput: null,
      isSearch: false,
    };
  },
  methods: {
    search() {
      if (this.searchInput) {
        this.isSearch = true;
        this.makeSearch(this.searchInput);
      }
    },
    refresh() {
      this.requestImages();
      this.searchInput = null;
      this.isSearch = false;
    },
  },
};
</script>
