<template>
  <v-row :class="[setClass(summary['RECOMMENDATION']), 'rounded-lg', 'mb-2']" v-if="summary">
    <v-col
        cols="1"
    >
     <v-avatar
         color="primary"
         size="90"
     >
       <span class="white--text"> {{pairName}}</span>
     </v-avatar>
    </v-col>
    <v-col
        cols="3"
    >
      <v-row no-gutters :class="[setClass(summary['RECOMMENDATION']), 'rounded-lg', 'pl-1']">
        <v-col cols="12">
          <b>Summary:</b> {{ summary['RECOMMENDATION'] }}
        </v-col>
        <v-col cols="12">
          BUY {{summary['BUY']}}
        </v-col>
        <v-col cols="12">
          SELL {{summary['SELL']}}
        </v-col>
        <v-col cols="12">
          NEUTRAL {{summary['NEUTRAL']}}
        </v-col>
      </v-row>
    </v-col>
    <v-col
        cols="3"
    >
      <v-row no-gutters :class="[setClass(oscillators['RECOMMENDATION']), 'rounded-lg', 'pl-1']">
        <v-col cols="12">
          <b>Oscillators:</b> {{ oscillators['RECOMMENDATION'] }}
        </v-col>
        <v-col cols="12">

        </v-col>
        <v-col cols="12">
          BUY {{oscillators['BUY']}}
        </v-col>
        <v-col cols="12">
          SELL {{oscillators['SELL']}}
        </v-col>
        <v-col cols="12">
          NEUTRAL {{oscillators['NEUTRAL']}}
        </v-col>

      </v-row>
    </v-col>
    <v-col
        cols="3"
    >
      <v-row no-gutters :class="[setClass(ma['RECOMMENDATION']), 'rounded-lg', 'pl-1']">
        <v-col cols="12">
          <b>MA:</b> {{ ma['RECOMMENDATION'] }}
        </v-col>
        <v-col cols="12">

        </v-col>
        <v-col cols="12">
          BUY {{ma['BUY']}}
        </v-col>
        <v-col cols="12">
          SELL {{ma['SELL']}}
        </v-col>
        <v-col cols="12">
          NEUTRAL {{ma['NEUTRAL']}}
        </v-col>
      </v-row>
    </v-col>

    <v-col
        cols="2"
    >
      <v-row no-gutters class="black rounded-lg pl-1">
        <v-col cols="12">
          <b>Forecast:</b>
        </v-col>
        <v-col cols="12">

        </v-col>
        <v-col cols="12">
          LOW: XXX
        </v-col>
        <v-col cols="12">
          HIGH: XXX
        </v-col>
        <v-col cols="12">
          Confidence: 0.XX
        </v-col>
      </v-row>
    </v-col>
    <v-row no-gutters>
      <v-col cols="12" class="ma-4">
        <v-chip
            color="white"
            outlined
            pill
            class="mt-1 ml-2"
        >{{rank}}</v-chip>
        <v-tooltip
            v-model="show"
            bottom
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                icon
                v-bind="attrs"
                v-on="on"
            >
              <v-icon>mdi-gauge</v-icon>
            </v-btn>
          </template>
          <span>
            {{pairName}}:
            <u v-for="(ind, val) in indicators" :key="val">{{val}}({{ind}}) </u>
          </span>
        </v-tooltip>
        <v-chip
            color="white"
            outlined
            pill
            class="mt-1 ml-2"
        >{{time}}</v-chip>
        <v-chip
            color="white"
            outlined
            pill
            class="mt-1 ml-2"
        >{{pair.interval}}</v-chip>
        <v-chip
            color="white"
            outlined
            pill
            class="mt-1 ml-2"
        >VP: XX</v-chip>

      </v-col>
    </v-row>
  </v-row>

</template>

<script>
export default {
  name: "IndexDetails",
  props: ['pair'],
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
      rank: 0
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
      this.polling = setInterval(async () => {
        this.getData();
      }, 40000);
    },
    async getData() {
      const response = await fetch(
        `${process.env.VUE_APP_TV_ENDPOINT}/?symbol=${this.pairName}&screener=${this.pair.screener}&exchange=${this.pair.exchange}&interval=${this.pair.interval}&include_volume=true`,
        {
          method: 'GET',
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(response.message || "failed to fetch!");
      }
      let result = responseData.result;
      this.summary = result['summary'];
      
      if (this.pairName) {
        this.rank = result['summary']['SELL'] > result['summary']['BUY'] ? result['summary']['SELL'] : result['summary']['BUY'];
        this.$store.commit('updateRank', {'pair': this.pairName, 'rank': this.rank});
        this.$emit('update');
        if (this.rank == this.$store.getters.getRankSound) {
          this.playAlertSound();
        }
      }
      
      this.oscillators = result['oscillators'];
      this.ma = result['moving_averages'];
      this.indicators = result['indicators'];
      this.time = result['time'];
    },
    playAlertSound() {
      if(this.$store.getters.getSoundSetting) {
        const audio = new Audio(require('@/assets/alert.mp3'));
        audio.play();
      }
    },
  },
  beforeMount() {
    this.getData();
  },
  beforeDestroy () {
    clearInterval(this.polling)
  },
  created() {
    this.fetchData();
  },
}
</script>

<style scoped>

</style>