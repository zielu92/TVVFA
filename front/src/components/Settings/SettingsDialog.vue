<template>
  <v-row justify="center">
    <v-btn :color="soundButtonColor" dark @click="setSound" :disabled="isLoading">
      <span class="mr-2"></span>
      <v-icon> {{ soundEnabled ? 'mdi-volume-high' : 'mdi-volume-off' }}</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" :disabled="isLoading">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="secondary" dark v-bind="attrs" v-on="on">
          <span class="mr-2">Settings</span>
          <v-icon>mdi-wrench</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark text @click="saveSettings">
              Save
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-row class="mt-1">
          <v-col cols="12" md="6">
            <h2 class="ml-2">Pairs</h2>
          </v-col>
          <v-col cols="12" md="6">
            <v-btn color="primary" dark class="float-right mr-6" @click="addPair = !addPair">
              <span class="mr-2">Add new pair</span>
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="12" md="12" v-if="addPair">
            <add-new-pair></add-new-pair>
          </v-col>
          <v-col cols="12" md="12">
            <pairs-list></pairs-list>
          </v-col>
        </v-row>

        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-row>
            <v-col cols="4" class="pl-7">
              <v-text-field v-model="localRankNumber" label="Play sound notification if rank is equal (for buy or sell) number:"
                type="number" :rules="numberRules" min="1" max="30" required></v-text-field>
            </v-col>
            <v-col cols="1" class="pt-7">
              <v-btn :color="soundButtonColor" dark @click="playAlertSound">Test sound notification</v-btn>
            </v-col>
          </v-row>
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
  components: { PairsList, AddNewPair },
  data() {
    return {
      addPair: false,
      dialog: false,
      notifications: false,
      localRankNumber: null,
    };
  },
  watch: {
    isLoading(newVal) {
      if (!newVal) {
        this.localRankNumber = this.$store.getters.getRankSound;
      }
    },
  },
  mounted() {
    if (!this.isLoading) {
      this.localRankNumber = this.$store.getters.getRankSound;
    }
  },
  methods: {
    setSound() {
      this.$store.dispatch('toggleSound');
    },
    playAlertSound() {
      const audio = new Audio(require('@/assets/alert.mp3'));
      audio.play().catch(() => {
        alert('Unable to play sound. Please enable sound permissions.');
      });
    },
    saveSettings() {
      if (this.localRankNumber !== this.$store.getters.getRankSound) {
        this.$store.dispatch('setRankSound', this.localRankNumber);
      }
      this.dialog = false;
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    soundEnabled() {
      return this.$store.getters.getSoundSetting;
    },
    soundButtonColor() {
      return this.soundEnabled ? 'primary' : 'red darken-1';
    },
    numberRules() {
      return [
        v => !!v || 'Number is required',
        v => (v >= 1 && v <= 30) || 'Number must be between 1 and 15',
      ];
    },
  },
}
</script>
