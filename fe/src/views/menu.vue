<template>
  <v-layout justify-space-around>
    <v-flex>
      <div>
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
      <div class="comment">
        <v-text-field
          v-model="writeaut"
          label="nickname"
          maxlength="10"
          counter="10"
        ></v-text-field>
        <v-text-field
          v-model="writecom"
          :counter="30"
          :rules="nameRules"
          label="Comments"
          required
        ></v-text-field>

        <v-btn
          color="success"
          @click="postComment(id, writeaut, writecom)"
        >
          Validate
        </v-btn>

      </div>
      <div class="list_comment">
         <v-list two-line>
          <template v-for="(item, index) in comment">
            <v-list-tile :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.author }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.content }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < items.length" :key="`divider-${index}`"></v-divider>
          </template>
        </v-list>
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
      items: [
        { action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
        { action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: 'Do you have Paris recommendations? Have you ever been?' },
        { action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: 'Have any ideas about what we should get Heidi for her birthday?' },
        { action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.' }
      ],
      like: 0,
      dislike: 0,
      date: [],
      nick: [],
      comment: [],
      author: '',
      content: ''
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
          console.log(this.date)
          this.comment = r.data.comments
          console.log(this.comment)
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
    },
    postComment (name, aut, con) {
      console.log(aut)
      console.log(con)
      const baseURI = 'http://localhost:3000/menu/'
      this.$http.post(`${baseURI + name}`, {
        order: 'comment',
        author: aut,
        content: con
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
    left: 1250px;
    top: 50px;
    border: 5px solid;
    width: 200px;
    height: auto;
  }
  .comment {
    position: relative;
    left: 100px;
    width: 1000px;
  }
  .list_comment {
    position: relative;
    top: 50px;
    left: 100px;
    width: 1000px;
  }
</style>
