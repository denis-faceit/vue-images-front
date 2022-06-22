<template>
  <div id="card" class="card pointer" @click="openModal(image.url)">
    <div class="card-image">
      <figure class="image is-16by9">
        <img :src="image.url" :alt="image.name" />
      </figure>
    </div>
    <div class="card-content is-overlay is-clipped">
      <router-link
        class="button is-small is-info"
        :to="{ name: 'show_image_path', params: { token: image.token } }"
      >
        <span>{{ image.name }}</span>
        <span class="icon">
          <font-awesome-icon icon="link" />
        </span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "card",
  props: ["image"],
  data() {
    return {
      modal: "",
      modalBackground: "",
      imageModal: "",
      modalIsOpen: false,
    };
  },
  mounted() {
    this.setModalValues();
    this.closeModal();
  },
  methods: {
    setModalValues() {
      this.modal = document.getElementById("modal");
      this.modalBackground = document.getElementById("modal-background");
      this.imageModal = document.getElementById("image-modal");
    },
    closeModal() {
      document.addEventListener("click", (event) => {
        if (this.modalIsOpen && event.target === this.modalBackground) {
          this.modalIsOpen = false;
          this.disableModalStyles();
        }
      });
    },
    disableModalStyles() {
      this.imageModal.src = "";
      this.imageModal.classList.add("is-hidden");
      this.modal.classList.remove("modal");
      this.modalBackground.classList.remove("modal-background");
    },
    openModal(imageUrl) {
      this.modalIsOpen = true;
      this.enableModalStyles(imageUrl);
    },
    enableModalStyles(imageUrl) {
      this.imageModal.classList.remove("is-hidden");
      this.imageModal.src = imageUrl;
      this.modal.classList.add("modal");
      this.modalBackground.classList.add("modal-background");
    },
  },
};
</script>
