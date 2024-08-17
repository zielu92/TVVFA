<template>
  <v-row class="mt-2">
    <index-details :details="details" v-for="idx in sortedIndexes" :key="idx._id" :pair="idx" />
  </v-row>
</template>

<script>
import IndexDetails from "./IndexDetails";

export default {
  name: "IndexList",
  props: ['details'],
  components: { IndexDetails },
  computed: {
    indexes() {
      return this.$store.getters.getIndexes;
    },
    sortedIndexes() {
      return [...this.indexes].sort((a, b) => b.rank - a.rank);
    }
    
  },
  methods: {
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