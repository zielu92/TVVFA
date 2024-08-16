<template>
  <v-list two-line>
    <v-list-item-group>
      <template v-for="(item, index) in pairs">
        <v-list-item :key="item._id">
          <v-list-item-content>
            <v-list-item-title v-text="item.pair"></v-list-item-title>
            <v-list-item-subtitle
              class="text--primary"
              v-text="item.screener"
            ></v-list-item-subtitle>
            <v-list-item-subtitle v-text="item.exchange"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-action-text v-text="item.interval"></v-list-item-action-text>
            <v-icon
              color="red darken-3"
              @click="remove(item._id)"
            >
              mdi-delete
            </v-icon>
          </v-list-item-action>
        </v-list-item>

        <v-divider
          v-if="index < pairs.length - 1"
          :key="index"
        ></v-divider>
      </template>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: "PairsList",
  data: () => ({
    pairs: [],
  }),
  methods: {
    remove(id) {
      this.$store.dispatch('removePair', id);
      this.pairs = this.$store.getters.getIndexes;
    },
  },
  created() {
    this.pairs = this.$store.getters.getIndexes;
  }
}
</script>