<template>
    <div>
       {{ id }}
       <br>
        {{like}}
        <br>
        {{dislike}}
        <br>
        <v-container v-for="dates in date" v-bind:key="dates">
            <div>{{dates}}</div>
        </v-container>
    </div>
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
