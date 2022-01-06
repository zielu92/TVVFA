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
      <settings-dialog></settings-dialog>
    </v-app-bar>

    <v-main>
      <v-container class="">
        <index-list></index-list>
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
  beforeMount() {
    this.$store.commit('initApi');
  }
};
</script>
