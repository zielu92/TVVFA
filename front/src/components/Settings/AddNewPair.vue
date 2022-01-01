<template>
  <v-form>
      <v-row class="ml-1">
        <v-col
            cols="12"
            md="3"
        >
          <v-text-field
              v-model="newPair.pair"
              label="Pair/Index"
              required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="3"
        >
          <v-text-field
              v-model="newPair.screener"
              label="Screener"
              required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="3"
        >
          <v-text-field
              v-model="newPair.exchange"
              label="Exchange"
              required
          ></v-text-field>
        </v-col>

        <v-col
            cols="12"
            md="2"
        >
          <v-text-field
              v-model="newPair.interval"
              label="Interval"
              required
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
            md="1"
        >
          <v-btn color="primary" @click="addPairToTheList">
            Add
          </v-btn>
        </v-col>
      </v-row>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    newPair: { rank: 0 }
  }),
  methods: {
    addPairToTheList() {
      this.$store.dispatch('addPair', this.newPair)
      this.newPair = { rank: 0 }
    }
  }
}
</script>