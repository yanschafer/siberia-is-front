<template>
  <div>
    <div class="input-group mb-3">
      <input
          type="text"
          class="form-control"
          placeholder="Search..."
          v-model="searchTerm"
          @input="handleSearch"
      />
    </div>
  </div>
</template>

<script lang="ts">

export default {
  name: 'SearchComponent',
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchTerm);
    },
  },
};
</script>