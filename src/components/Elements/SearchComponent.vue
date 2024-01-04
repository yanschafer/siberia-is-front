<template>
  <div>
    <div class="input-group mb-3" style="margin: 0!important;">
      <input
          type="text"
          class="form-control"
          placeholder="Search..."
          :value="searchQuery"
          @input="handleSearch"
          style="margin-bottom: 0;"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SearchComponent',
  props: {
    modelValue: String,
  },
  data() {
    return {
      searchQuery: this.modelValue,
    };
  },
  methods: {
    handleSearch(event) {
      this.searchQuery = event.target.value;
      this.$emit('update:modelValue', this.searchQuery);
      this.$emit('search', this.searchQuery);
    },
  },
};
</script>