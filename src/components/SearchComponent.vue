<template>
  <div>
    <div class="input-group mb-3" style="margin: 0!important;">
      <input
          type="text"
          class="form-control"
          placeholder="Search..."
          v-model="searchTerm"
          @input="handleSearch"
          style="margin-bottom: 0;"
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