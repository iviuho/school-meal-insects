<template>
  <v-layout justify-space-around>
    <v-flex>
      <div>
        <div class="column_center">
          <br>
          <h4>{{id}}</h4>
          <br>
          <v-btn v-if="this.account.likes.includes(this.id)" icon large @click="postReq(id, 'like')" style="width:64px; height:64px;">
            <v-icon color="success" size="64">thumb_up</v-icon>
          </v-btn>
          <v-btn v-else icon large @click="postReq(id, 'like')" style="width:64px; height:64px;">
            <v-icon size="64">thumb_up</v-icon>
          </v-btn>
          <p><strong>&nbsp;{{like}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></p>
          <v-btn v-if="this.account.dislikes.includes(this.id)" icon large @click="postReq(id, 'dislike')" style="width:64px; height:64px;">
            <v-icon color="error" size="64">thumb_down</v-icon>
          </v-btn>
          <v-btn v-else icon large @click="postReq(id, 'dislike')" style="width:64px; height:64px;">
            <v-icon size="64">thumb_down</v-icon>
          </v-btn>
          <p><strong>&nbsp;{{dislike}}&nbsp;</strong></p>
        </div>
        <div class="date">
          <v-list two-line style="background-color: #FAFAFA;">
            <template v-for="(item, index) in date">
              <v-list-tile :key="index">
                <v-list-tile-content>
                  <v-list-tile-sub-title class="text--primary">{{ item }}</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider v-if="index + 1 < date.length" :key="`divider-${index}`"></v-divider>
            </template>
          </v-list>
        </div>
      </div>
      <div v-if="isAuth" class="comment">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          onsubmit="return false;"
        >
          <v-text-field
            v-model="writecom"
            :counter="30"
            maxlength="30"
            :rules="[v => !!v || 'Content is required']"
            label="Comments"
            @keypress.enter="validate"
            required
          ></v-text-field>

          <v-btn
            :disabled="!valid"
            color="success"
            @click="validate()"
          >
            제출
          </v-btn>
        </v-form>
      </div>
      <div class="list_comment">
         <v-list two-line style="background-color: #FAFAFA;">
          <template v-for="(item, index) in calData">
            <v-list-tile :key="index">
              <v-list-tile-content>
                <v-list-tile-title>{{ item.author }}</v-list-tile-title>
                <v-list-tile-sub-title class="text--primary">{{ item.content }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-divider v-if="index + 1 < comment.length" :key="`divider-${index}`"></v-divider>
          </template>
          <br>
          <br>
          <v-pagination
            v-model="page"
            :length="pagelength"
            :total-visible="5"
          ></v-pagination>
        </v-list>
      </div>
    </v-flex>
  </v-layout>
</template>
<script>
// import router from '../router'

export default {
  props: ['id', 'isAuth', 'account'],
  data () {
    return {
      page: 1,
      pagelength: 0,
      dataPerPage: 4,
      like: 0,
      dislike: 0,
      date: [],
      nick: [],
      comment: [],
      author: '',
      content: '',
      valid: '',
      writeaut: '',
      writecom: ''
    }
  },
  mounted () {
    this.getData()
    console.log(this.account)
  },
  computed: {
    startOffset () {
      return ((this.page - 1) * this.dataPerPage)
    },
    endOffset () {
      return (this.startOffset + this.dataPerPage)
    },
    numOfPages () {
      return Math.ceil(this.comment.length / this.dataPerPage)
    },
    calData () {
      return this.comment.slice(this.startOffset, this.endOffset)
    }
  },
  methods: {
    getData () {
      const baseURI = `http://localhost:3000/menu/${this.id}`
      this.$http.get(`${baseURI}`)
        .then((r) => {
          console.log(r)
          this.like = r.data.like
          this.dislike = r.data.dislike
          this.date = r.data.frequency
          this.comment = r.data.comments

          this.pagelength = Math.ceil(this.comment.length / this.dataPerPage)
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    postReq (name, order) {
      if(this.isAuth){
        const baseURI = 'http://localhost:3000/menu/'
        if(!(this.account.like.includes(this.id))) {
        
          this.$http.post(baseURI + name, {
            order: order
          })
            .then((r) => {
              console.log(r)
              this.getData()
            })
            .catch((e) => {
              console.error(e.message)
            })
        }
      }
    },
    postComment (name, aut, con) {
      const baseURI = 'http://localhost:3000/menu/'
      this.$http.post(`${baseURI + name}`, {
        order: 'comment',
        author: aut,
        content: con
      })
        .then((r) => {
          console.log(r)
          this.getData()
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.postComment(this.id, this.account.name, this.writecom)
        this.$refs.form.reset()
        this.getData()
      }
    }
  }
}
</script>
<style>
  div {
    text-align: center;
  }
  h4 {
    font-size:100px;
  }
  p {
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
    border: 1px solid;
    width: 200px;
    height: auto;
  }
  .comment {
    top: 25px;
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
