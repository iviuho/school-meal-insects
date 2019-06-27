<template>
  <v-card
    class="mx-auto"
    max-width="400"
    tile
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>Single-line item</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title>Two-line item</v-list-item-title>
        <v-list-item-subtitle>Secondary text</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title>Three-line item</v-list-item-title>
        <v-list-item-subtitle>
          Secondary line text Lorem ipsum dolor sit amet,
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          consectetur adipiscing elit.
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
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
  h4 {
    text-align: center;
    font-size:150px;
  }
  p {
    color:red;
    font-size:64px;
    display: inline
  }
  h1 {
    display: inline
  }

</style>
