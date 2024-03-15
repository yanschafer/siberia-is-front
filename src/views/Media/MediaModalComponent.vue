<template>
  <Dialog
    :visible.sync="visible"
    modal
    :style="{ width: '50vw' }"
    header="Image Details"
  >
    <div class="d-flex flex-row">
      <div class="flex flex-column col-auto w-50 photo-col">
        <div class="container image-cont">
          <img :src="image.url" alt="Image" class="media-image-full" />
        </div>
      </div>
    </div>

    <div class="d-flex flex-column justify-center mt-3">
      <div class="flex-grow-1 d-flex flex-row justify-content-start pl-3">
        <div class="d-flex flex-row flex-grow-1 gap-4 text-col">
          <div class="d-flex flex-column justify-center">
            <h5 class="m-0 heading-list">FILE NAME</h5>
            <p class="text-muted m-0">{{ image.name }}</p>
            <InputText :placeholder="'Media name...'" />
          </div>
          <div class="d-flex flex-column justify-center">
            <h5 class="heading-list m-0">USED FOR</h5>
            <p class="text-muted m-0">Product #1</p>
          </div>
          <div class="d-flex flex-column justify-center">
            <h5 class="heading-list m-0">DATE</h5>
            <p class="text-muted m-0">24/24/24</p>
          </div>
          <!--          <div class="d-flex flex-column justify-center">-->
          <!--            <h5 class="heading-list m-0">SIZE</h5>-->
          <!--            <p class="text-muted m-0">20KB</p>-->
          <!--          </div>-->
        </div>
      </div>
      <h5 class="heading-list m-0">DESCRIPTION</h5>
      <p class="text-muted m-0">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam eaque
        est excepturi hic iste labore modi, pariatur quod similique vero.
      </p>
      <Textarea class="text-area" :placeholder="'Description...'"></Textarea>
      <div class="d-flex flex-row justify-content-start gap-2 mt-3">
        <Button class="btn btn-outline-black utility-btn">EDIT</Button>
        <Button class="btn btn-danger utility-btn">DELETE</Button>
      </div>
      <div class="d-flex flex-row justify-content-start gap-2 mt-3">
        <Button class="btn btn-outline-black utility-btn">CANCEL</Button>
        <Button class="btn btn-success utility-btn">SAVE</Button>
      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
export default {
  name: "MediaModalComponent",
  components: {
    Dialog,
    InputText,
    Textarea,
  },
  props: {
    image: {
      type: Object,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.media-image-full {
  width: 100%;
}
.image-cont {
  width: 90%;
  padding: 0;
  margin: 0;
  border: 10px solid black;
}
.photo-col {
  display: flex;
  justify-content: center;
}
.text-col {
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;
  justify-content: start !important;
}
.p-dialog {
  width: 78vw !important;
}
.text-area {
  min-height: 5rem;
}
</style>
