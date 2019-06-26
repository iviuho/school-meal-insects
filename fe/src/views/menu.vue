
<template>
  <!-- <div>
    <v-card>
      <v-responsive :aspect-ratio="16/9">
        <v-card-title>
          <h1>{{id}}</h1>
        </v-card-title>
        <v-card-text v-for="dates in date" v-bind:key="dates">
          {{like}}
          {{dislike}}
          {{id}}
          {{dates}}
        </v-card-text>
      </v-responsive>
    </v-card>
  </div> -->
  <v-container>
    <v-flex>
      <h4>{{id}}</h4>
      <h1>like</h1>
      <v-icon size="64" color="yellow">thumb_up</v-icon>
      <h1>dislike</h1>
      <v-icon size="64" color="yellow">thumb_down</v-icon>
      <p><strong> &nbsp;&nbsp;{{dislike}}</strong></p>
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
    
    <!-- <v-timeline-item
      color="amber lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="amber lighten-1 justify-end">
          <h2 class="display-1 mr-3 white--text font-weight-light">Title 2</h2>
          <v-icon
            dark
            size="42"
          >mdi-home-outline</v-icon>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs8>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit.
            </v-flex>
            <v-flex xs4>
              Lorem ipsum dolor sit amet, no nam oblique veritus.
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="cyan lighten-1"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="cyan lighten-1">
          <v-icon
            class="mr-3"
            dark
            size="42"
          >
            mdi-email-outline
          </v-icon>
          <h2 class="display-1 white--text font-weight-light">Title 3</h2>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex
              v-for="n in 3"
              :key="n"
              xs4
            >
              Lorem ipsum dolor sit amet, no nam oblique veritus no nam oblique.
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="red lighten-1"
      fill-dot
      left
      small
    >
      <v-card>
        <v-card-title class="red lighten-1 justify-end">
          <h2 class="display-1 mr-3 white--text font-weight-light">Title 4</h2>
          <v-icon
            dark
            size="42"
          >
            mdi-account-multiple-outline
          </v-icon>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs2>
              <v-icon size="64">mdi-server-network</v-icon>
            </v-flex>
            <v-flex xs10>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus.
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>

    <v-timeline-item
      color="green lighten-1"
      fill-dot
      right
    >
      <v-card>
        <v-card-title class="green lighten-1">
          <v-icon
            class="mr-3"
            dark
            size="42"
          >
            mdi-phone-in-talk
          </v-icon>
          <h2 class="display-1 white--text font-weight-light">Title 5</h2>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex>
              Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item> -->
  </v-timeline>
  </v-container>
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

</style>
