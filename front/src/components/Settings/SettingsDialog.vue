<template>
  <v-row justify="center">
    <v-dialog
        v-model="dialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            color="secondary"
            dark
            v-bind="attrs"
            v-on="on"
        >
          <span class="mr-2">Settings</span>
          <v-icon>mdi-wrench</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar
            dark
            color="primary"
        >
          <v-btn
              icon
              dark
              @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
                dark
                text
                @click="dialog = false"
            >
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-row class="mt-1">
          <v-col cols="12" md="6" >
            <h2 class="ml-2">Pairs</h2>
          </v-col>
          <v-col cols="12" md="6" >
            <v-btn
                color="primary"
                dark
                class="float-right mr-6"
                @click="addPair = !addPair"
            >
              <span class="mr-2">Add new pair</span>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="12"  v-if="addPair">
            <add-new-pair></add-new-pair>
          </v-col>
          <v-col cols="12" md="12">
            <pairs-list></pairs-list>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-list
            three-line
            subheader
        >
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me in future </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>future feature</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import PairsList from './PairsList';
import AddNewPair from './AddNewPair';

export default {
  name: "SettingsDialog",
  components: {PairsList,AddNewPair},
  data () {
    return {
      addPair: false,
      dialog: false,
      notifications: false,
      sound: true,
    }
  },
}
</script>