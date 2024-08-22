<template>
  <v-col :cols="details ? '12' : '4'" class="pl-6">
    <v-row :class="[setClass(summary['RECOMMENDATION']), 'rounded-lg', 'mb-2']" v-if="summary">
      <v-col :cols="details ? '2' : '4'">
        <v-avatar color="primary" size="90">
          <span class="white--text"> {{ pairName }}</span>
        </v-avatar>
      </v-col>
      <v-col :cols="details ? '3' : '8'">
        <v-row no-gutters :class="[setClass(summary['RECOMMENDATION']), 'rounded-lg', 'pl-1']">
          <v-col cols="12">
            <b>Summary:</b> {{ summary['RECOMMENDATION'] }}
          </v-col>
          <v-col cols="12">BUY {{ summary['BUY'] }}</v-col>
          <v-col cols="12">SELL {{ summary['SELL'] }}</v-col>
          <v-col cols="12">NEUTRAL {{ summary['NEUTRAL'] }}</v-col>
        </v-row>
      </v-col>
      <v-col v-if="details" cols="3">
        <v-row no-gutters :class="[setClass(oscillators['RECOMMENDATION']), 'rounded-lg', 'pl-1']">
          <v-col cols="12">
            <b>Oscillators:</b> {{ oscillators['RECOMMENDATION'] }}
          </v-col>
          <v-col cols="12">BUY {{ oscillators['BUY'] }}</v-col>
          <v-col cols="12">SELL {{ oscillators['SELL'] }}</v-col>
          <v-col cols="12">NEUTRAL {{ oscillators['NEUTRAL'] }}</v-col>
        </v-row>
      </v-col>
      <v-col v-if="details" cols="3">
        <v-row no-gutters :class="[setClass(ma['RECOMMENDATION']), 'rounded-lg', 'pl-1']">
          <v-col cols="12">
            <b>MA:</b> {{ ma['RECOMMENDATION'] }}
          </v-col>
          <v-col cols="12">BUY {{ ma['BUY'] }}</v-col>
          <v-col cols="12">SELL {{ ma['SELL'] }}</v-col>
          <v-col cols="12">NEUTRAL {{ ma['NEUTRAL'] }}</v-col>
        </v-row>
      </v-col>

      <v-row no-gutters>
        <v-col cols="12" class="ma-4">
          <v-chip color="white" outlined pill class="mt-1 ml-2">
            {{ rank }}
          </v-chip>

          <v-dialog v-model="dialog" max-width="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on" class="mt-1 ml-2">
                <v-icon>mdi-gauge</v-icon>
              </v-btn>
            </template>
            <v-card>
              <v-card-title>Indicators for {{ pairName }}</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item v-for="(ind, val) in indicators" :key="val">
                    <v-list-item-content>
                      <v-list-item-title>{{ val }}: {{ ind }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">Close</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-chip color="white" outlined pill class="mt-1 ml-2">
            {{ formattedDate }}
          </v-chip>
          <v-chip color="white" outlined pill class="mt-1 ml-2">
            {{ pair.interval }}
          </v-chip>
        </v-col>
      </v-row>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "IndexDetails",
  props: ['pair', 'details'],
  data() {
    return {
      pairName: this.pair.pair,
      show: false,
      summary: null,
      oscillators: null,
      ma: null,
      indicators: null,
      time: null,
      polling: null,
      rank: 0,
      dialog: false,
    }
  },
  methods: {
    setClass(val) {
      const classMap = {
        'STRONG_BUY': 'green darken-4',
        'BUY': 'green',
        'SELL': 'red',
        'STRONG_SELL': 'red darken-4',
        'NEUTRAL': 'grey darken-2'
      };
      return classMap[val] || '';
    },
    async fetchData() {
      const fetchTime = this.$store.getters.getFetchTime;
      this.polling = setInterval(this.getData, fetchTime * 1000);
      this.getData();
    },
    async getData() {
      const response = await fetch(
        `${process.env.VUE_APP_TV_ENDPOINT}/?symbol=${this.pairName}&screener=${this.pair.screener}&exchange=${this.pair.exchange}&interval=${this.pair.interval}`,
        { method: 'GET' }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(response.message || "failed to fetch!");
      }

      let result = responseData.result;
      this.summary = result['summary'];
      
      if (this.pairName) {
        this.rank = result['summary']['SELL'] > result['summary']['BUY'] ? result['summary']['SELL'] : result['summary']['BUY'];
        this.$store.commit('updateRank', { 'pair': this.pairName, 'rank': this.rank });
        if (this.rank >= this.$store.getters.getRankSound) {
          this.playAlertSound();
        }
      }
      
      this.oscillators = result['oscillators'];
      this.ma = result['moving_averages'];
      this.indicators = result['indicators'];
      this.time = result['time'];
    },
    playAlertSound() {
      if (this.$store.getters.getSoundSetting) {
        const audio = new Audio(require('@/assets/alert.mp3'));
        audio.play();
      }
    },
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    formattedDate() {
      const date = new Date(this.time);
      return date.toLocaleString('de', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      }).replace(",", "");
    },
  },
  beforeDestroy() {
    clearInterval(this.polling);
  },
  created() {
    this.fetchData();
  },
}
</script>

<style scoped>

</style>
