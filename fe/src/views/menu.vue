<template>
  <v-layout justify-space-around>
    <v-flex>
      <div class="column">
        <div>
        <h4>{{id}}</h4>
        <h1>like</h1>
        <v-icon size="64">thumb_up</v-icon>
        <p><strong> &nbsp;&nbsp;{{like}}</strong></p>
        <h1>dislike</h1>
        <v-icon size="64">thumb_down</v-icon>
        <p><strong> &nbsp;&nbsp;{{dislike}}</strong></p>
        </div>
      </div>
    </v-flex>
  <v-timeline>

    <v-timeline-item v-for="dates in date" v-bind:key="dates"
      color="purple lighten-2"
      fill-dot
    >
      <v-card>
        <v-card-title class="purple lighten-2">
          <h2 class="display-1 white--text font-weight-light">{{ dates }}</h2>
        </v-card-title>
      </v-card>
    </v-timeline-item>

  </v-timeline>
  </v-layout>
</template>
<script>
// import router from '../router'

export default {
  props: ['id'],
  data () {
    return {
      like: 0,
      dislike: 0,
      date: []
    }
  },
  mounted () {
    console.log(this.id)
    this.getData()
  },
  methods: {
    getData () {
      const baseURI = `http://localhost:3000/menu/${this.id}`
      this.$http.get(`${baseURI}`)
        .then((r) => {
          console.log(r)
          this.like = r.data.like
          console.log(this.like)
          this.dislike = r.data.dislike
          console.log(this.dislike)
          this.date = r.data.frequency
        })
        .catch((e) => {
          console.error(e.message)
        })
    }
  }
}
</script>
<style>
  div {
    text-align: center;
  }
  h4 {
    text-align: center;
    font-size:150px;
  }
  p {
    text-align: center;
    font-size:64px;
    display: inline
  }
  h1 {
    display: inline
  }
  .column {
    
  }
</style>
