<template>
  <v-row class="mt-2">
    <v-col cols="12">
      <index-details v-for="idx in indexes" :key="idx.pair" :pair="idx" @update="sortIndexes">
      </index-details>
    </v-col>
  </v-row>
</template>

<script>
import IndexDetails from "./IndexDetails";

export default {
  name: "IndexList",
  components: {IndexDetails},
  data()  {
    return {
      indexes: [],
      indexDetails: [],
      polling: null
    }
  },
  methods: {
    sortIndexes(){
      this.indexes.sort((a, b) => b.rank - a.rank );
    }
  },
  created() {
    this.indexes = this.$store.getters.getIndexes;
  }

}
</script>

<style scoped>
.index-details-enter-form,
.index-details-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.index-details-enter-active {
  transition: all 0.3s ease-out;
}

.index-details-leave-active {
  transition: all 0.3s ease-in;
}

.index-details-enter-to,
.index-details-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>