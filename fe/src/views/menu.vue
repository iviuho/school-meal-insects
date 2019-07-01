<template>
  <v-layout justify-space-around>
    <v-flex>
      <div class="row">
        <div class="column_center">
          <h4>{{id}}</h4>
          <v-btn icon large @click="postReq(id, 'like')" style="width:64px; height:64px;">
            <v-icon size="64">thumb_up</v-icon>
          </v-btn>
          <p><strong> &nbsp;&nbsp;{{like}}&nbsp;&nbsp;&nbsp;</strong></p>
          <v-btn icon large @click="postReq(this.id, 'dislike')" style="width:64px; height:64px;">
            <v-icon size="64">thumb_down</v-icon>
          </v-btn>
          <p><strong> &nbsp;&nbsp;{{dislike}}</strong></p>
        </div>
        <div class="date">
          <h2 v-for="dates in date" v-bind:key="dates">
            -----------------------
            <br>
            {{dates}}
            <br>
            -----------------------
          </h2>
        </div>
      </div>
    </v-flex>
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
    },
    postReq (name, order) {
      const baseURI = 'http://localhost:3000/menu/'
      this.$http.post(`${baseURI + name}`, {
        order: order
      })
        .then((r) => {
          console.log('성공')
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
    font-size:150px;
  }
  p {
    text-align: center;
    font-size:64px;
    display: inline;
    position: relative;
    top: 13px;
  }
  h1 {
    display: inline
  }
  /* .row {
  } */
  .column_center {
    position: relative;
    width: 1300px;

  }
  .date {
    position:absolute;
    right: 150px;
    top: 50px;
    border: 5px solid;
    width: 200px;
    height: auto;
  }
</style>
