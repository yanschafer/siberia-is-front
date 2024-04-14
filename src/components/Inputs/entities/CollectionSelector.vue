<template>
  <div class="d-flex flex-row gap-4 mb-2">
    <SelectComponent
      :placeholder="placeholder"
      class="animate__animated animate__flipInX animate__faster"
      :class="{ 'p-invalid': !collectionSelectorStore.validateRes }"
      :items="collectionList"
      v-model="collectionSelectorStore.value"
    />
    <DialogComponentTrigger
      :button-text="createButtonText"
      :init-object="initCollectionDialog"
    />
  </div>
</template>

<script lang="ts">
import SelectComponent from "@/components/Elements/Selectors/SelectComponent.vue";
import DialogComponentTrigger from "@/components/Elements/Dialogs/DialogComponentTrigger.vue";
import PrintUtil from "@/utils/localization/print.util";
import { useCollectionSelectorStore } from "@/stores/components/collection-selector.store";
import { useCollectionStore } from "@/stores/collection.store";
import loggerUtil from "@/utils/logger/logger.util";
import CollectionModel from "@/api/modules/collection/models/collection.model";
import LoggerUtil from "@/utils/logger/logger.util";

export default {
  name: "CollectionSelector",
  components: {
    SelectComponent,
    DialogComponentTrigger,
  },
  props: {
    initValue: {
      type: Object,
      default: null,
    },
    placeholder: {
      type: String,
      default: "SELECT COLLECTION",
    },
  },
  emits: ["changed"],
  data() {
    return {
      createButtonText: "CREATE",
      initCollectionDialog: {
        header: this.localize("createACollection"),
        inputName: this.localize("collectionName"),
        methodOnSave: async (collection) => {
          const loadRes = await this.collectionStore.loadCollectionList();
          loadRes.toastIfError(this.$toast, this.$nextTick);
          LoggerUtil.debug(collection);
          this.collectionSelectorStore.value = collection;
        },
        methodOnClose: () => loggerUtil.debug("workds"),
        model: new CollectionModel(),
        toastSuccessText: this.localize("collectionIsCreated"),
        toastErrorText: this.localize("collectionCreationFailed"),
      },
    };
  },
  async setup() {
    const collectionStore = useCollectionStore();
    const collectionSelectorStore = useCollectionSelectorStore();

    return {
      collectionStore,
      collectionSelectorStore,
      loadList: await collectionStore.loadCollectionList(),
    };
  },
  mounted() {
    if (this.initValue)
      this.collectionSelectorStore.value = { ...this.initValue };
  },
  created() {
    this.loadList.toastIfError(this.$toast, this.$nextTick);
  },
  methods: {
    localize(key, module = "products") {
      return PrintUtil.localize(key, module);
    },
  },
  computed: {
    collectionList() {
      return this.collectionStore.getCollectionList;
    },
  },
};
</script>

<style scoped></style>
