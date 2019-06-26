
<template>
<v-container fluid grid-list-xl>
  <v-layout wrap>
    <v-flex xs12 sm6 md4>
      <v-card class="rounded-card" v-for="breakfs in breakfast" v-bind:key="breakfs">
        <v-card-title class="justify-center" @click="test(breakfs)" primary-title>
            <h3>{{breakfs}}</h3>
        </v-card-title>
        <v-card-actions class="justify-center">
          <v-btn icon @click="postReq(breakfs, 'like')">
            <v-icon>thumb_up</v-icon>
          </v-btn>
          <v-btn icon @click="postReq(breakfs, 'dislike')">
            <v-icon>thumb_down</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4>
      <v-card class="rounded-card" v-for="lun in lunch" v-bind:key="lun">
        <v-card-title class="justify-center" @click="test(lun)" primary-title>
            <h3>{{lun}}</h3>
        </v-card-title>
        <v-card-actions class="justify-center">
          <v-btn icon @click="postReq(lun, 'like')">
            <v-icon>thumb_up</v-icon>
          </v-btn>
          <v-btn icon @click="postReq(lun, 'dislike')">
            <v-icon>thumb_down</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 sm6 md4>
      <v-card class="rounded-card" v-for="din in dinner" v-bind:key="din">
        <v-card-title class="justify-center" @click="test(din)" primary-title>
            <h3>{{din}}</h3>
        </v-card-title>
        <v-card-actions class="justify-center">
          <v-btn icon @click="postReq(din, 'like')">
            <v-icon>thumb_up</v-icon>
          </v-btn>
          <v-btn icon @click="postReq(din, 'dislike')">
            <v-icon>thumb_down</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
export default {
  data () {
    return {
      posts: [],
      breakfast: [],
      lunch: [],
      dinner: [],
      leng: 0
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    getUsers () {
      // using JSONPlaceholder
      const baseURI = 'http://localhost:3000/meal'
      this.$http.get(`${baseURI}`)
        .then((result) => {
          console.log(result)
          console.log(result.data.data)
          console.log(result.data.data.breakfast)
          this.posts = result.data
          console.log(this.posts.data.breakfast)
          console.log(this.posts)
          console.log(this.posts.data.breakfast.length)
          this.leng = this.posts.data.breakfast.length
          this.breakfast = this.posts.data.breakfast
          this.lunch = this.posts.data.lunch
          this.dinner = this.posts.data.dinner
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    test (menu) {
      this.$router.push(`menu/${menu}`)
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
h3 {
  display: inline;
}

.rounded-card {
  border-radius: 50px;
  margin-bottom: 10px;
}
</style>
