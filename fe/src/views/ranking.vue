<template>
  <v-container>
    <v-layout flex-center>
      <v-radio-group v-model="radioGroup" @change="onChange" row>
        <v-radio :label="'좋아요'" :value="'like'" on-icon="thumb_up" off-icon="thumb_up"></v-radio>
        <v-radio :label="'싫어요'" :value="'dislike'" on-icon="thumb_down" off-icon="thumb_down"></v-radio>
      </v-radio-group>
    </v-layout>

    <column-chart
      :data="chartData"
      :dataset="{borderWidth: 5}"
      :messages="{empty: 'Loading...'}"
      height="600px"
      style="max-height: 600px;"
    >
    </column-chart>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      chartData: [],
      radioGroup: 'like'
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      this.$http.get('http://localhost:3000/ranking/' + this.radioGroup).then(r => {
        r.data.data.forEach(item => {
          this.chartData.push([item.name, item.like])
        })
      })
    },
    onChange () {
      this.chartData.splice(0, this.chartData.length)
      this.loadData()
    }
  }
}
</script>

<style>
.flex-center {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
