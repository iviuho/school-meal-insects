<template>
  <v-container>
    <column-chart
      :data="chartData"
      :dataset="{borderWidth: 5}"
      :messages="{empty: 'Loading...'}"
      height=650px
    >
    </column-chart>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      chartData: []
    }
  },
  mounted () {
    this.$http.get('http://localhost:3000/ranking').then(r => {
      r.data.data.forEach(item => {
        this.chartData.push([item.name, item.like])
      })
    })
  }
}
</script>
