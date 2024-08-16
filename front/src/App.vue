<template>
  <v-app>
    <v-app-bar
      app
      dark
    >
      <div class="d-flex align-center">
        TVVFA
      </div>

      <v-spacer></v-spacer>
      <v-switch
      class="pt-6"
      v-model="detailedLayout"
      inset
      :label="`Show details: ${detailedLayout.toString()}`"
      ></v-switch>
      <settings-dialog></settings-dialog>
    </v-app-bar>

    <v-main>
      <v-container>
        <index-list :details="detailedLayout"></index-list>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import IndexList from "./components/Main/IndexList";
import SettingsDialog from "./components/Settings/SettingsDialog";
export default {
  name: 'App',
  components: {
    IndexList,
    SettingsDialog
  },
  data() {
    return {
        detailedLayout: true,
    }
  },
  beforeMount() {
    this.$store.commit('initApi');
  }
};
</script>
