
<template>
<v-container fluid grid-list-xl>
  <v-layout wrap align-center>
    <v-flex xs12 sm6 md4>
      <v-card>
        <v-card-title primary-title v-for="breakfs in breakfast" v-bind:key="breakfs">
          <div>
            <h3 @click="test(breakfs)" >{{breakfs}}</h3>
            <v-btn flat icon @click="postReq(breakfs, 'like')">
              <v-icon>thumb_up</v-icon>
            </v-btn>
            <v-btn flat icon @click="postReq(breakfs, 'dislike')">
              <v-icon>thumb_down</v-icon>
            </v-btn>
          </div>
        </v-card-title>
      </v-card>
      <v-card>
        <v-card-title primary-title v-for="lun in lunch" v-bind:key="lun">
          <div>
            <h3 @click="test(lun)" >{{lun}}</h3>
            <v-btn flat icon @click="postReq(lun, 'like')">
              <v-icon>thumb_up</v-icon>
            </v-btn>
            <v-btn flat icon @click="postReq(lun, 'dislike')">
              <v-icon>thumb_down</v-icon>
            </v-btn>
          </div>
        </v-card-title>
      </v-card>
      <v-card>
        <v-card-title primary-title v-for="din in dinner" v-bind:key="din">
          <div>
            <h3 @click="test(din)" >{{din}}</h3>
            <v-btn flat icon @click="postReq(din, 'like')">
              <v-icon>thumb_up</v-icon>
            </v-btn>
            <v-btn flat icon @click="postReq(din, 'dislike')">
              <v-icon>thumb_down</v-icon>
            </v-btn>
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>
</v-container>

</template>
<script>
import router from "../router"

export default {
  data: function () {
    return {
      posts: [],
      breakfast: [],
      lunch: [],
      dinner: [],
      leng: 0
      }
    },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers () {
      // using JSONPlaceholder
      const baseURI = 'http://localhost:3000/meal';
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
    test(menu) {
      this.$router.push(`menu/${menu}`)
    },
    postReq(name, order) {
      const baseURI = 'http://localhost:3000/menu/';
      this.$http.post(`${baseURI + name}`, {
        order: order
      })
      .then((r) => {
        console.log("성공")
      })
      .catch((e) => {
        console.error(e.message)
      })
    }
  }
}
</script>
