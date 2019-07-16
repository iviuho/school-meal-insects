<template>
  <v-layout justify-space-around>
    <v-flex>
      <div>
        <div class="column_center">
          <br><h4>{{id}}</h4><br>

          <v-btn v-if="account.likes.includes(id)" icon large @click="postReq('like')" style="width:64px; height:64px;">
            <v-icon color="success" size="64">thumb_up</v-icon>
          </v-btn>
          <v-btn v-else icon large @click="postReq('like')" style="width:64px; height:64px;">
            <v-icon size="64">thumb_up</v-icon>
          </v-btn>
          <p><strong>&nbsp;{{like}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong></p>

          <v-btn v-if="account.dislikes.includes(id)" icon large @click="postReq('dislike')" style="width:64px; height:64px;">
            <v-icon color="error" size="64">thumb_down</v-icon>
          </v-btn>
          <v-btn v-else icon large @click="postReq('dislike')" style="width:64px; height:64px;">
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
      <div v-if="token" class="comment">
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
            :rules="[v => !!v || '내용이 비어있습니다']"
            label="댓글"
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
              <v-list-tile-action>
                <v-btn icon right v-if="account.id === comment[index].id" @click="toRemoveDialog(index)">
                  <v-icon>remove_circle</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="index + 1 < comment.length" :key="`divider-${index}`"></v-divider>
          </template>
          <br>
          <br>
          <v-pagination
            v-if="comment.length > 0"
            v-model="page"
            :length="pagelength"
            :total-visible="5"
          ></v-pagination>
        </v-list>
      </div>
      <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="timeout" top>
        {{text}}
      </v-snackbar>
      <v-dialog v-model="removeDialog" max-width="600px">
        <v-card>
          <v-card-title class="headline">댓글 삭제</v-card-title>
          <v-card-text>해당 댓글을 삭제 하시겠습니까?</v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="red lighter-1" dark @click="removeDialog = false">취소</v-btn>
            <v-btn color="green lighter-1" dark @click="removeComment(toRemoveIndex)">삭제</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ['account', 'id', 'token'],
  data () {
    return {
      url: 'http://10.120.73.216:3000/menu/',
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
      writecom: '',
      snackbar: false,
      timeout: 3000,
      snackbarColor: '',
      text: '',
      removeDialog: false,
      toRemoveIndex: null
    }
  },
  mounted () {
    this.getData()
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
    test (index) {
      console.log('Button clicked', index)
    },
    getData () {
      this.$http.get(this.url + this.id)
        .then(r => {
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
    postReq (order) {
      if (this.token) {
        var value
        var voted = this.account[order + 's'].includes(this.id)

        if (!voted) {
          value = 1
          this.$emit('changeData', order, this.id)
        } else {
          value = -1
          this.$emit('exceptData', order, this.id)
        }

        this.$http.post(this.url + this.id, {
          'order': order,
          'value': value
        }, { 'headers': { 'Authorization': this.token } })
          .then(r => {
            this.getData()
          })
          .catch(e => console.error(e))
      } else {
        this.snackbarColor = 'error'
        this.text = '추천, 비추천 기능은 로그인 후에 가능합니다'
        this.snackbar = true
      }
    },
    postComment (con) {
      this.$http.post(this.url + this.id, {
        order: 'comment',
        content: con
      }, { 'headers': { 'Authorization': this.token } })
        .then((r) => {
          this.getData()
          this.snackbarColor = 'success'
          this.text = '댓글이 작성되었습니다'
          this.snackbar = true
        })
        .catch((e) => console.error(e))
    },
    toRemoveDialog (index) {
      this.toRemoveIndex = (this.page - 1) * this.dataPerPage + index
      this.removeDialog = true
    },
    removeComment (index) {
      this.$http.post(this.url + this.id, {
        'order': 'remove',
        '_id': this.comment[index]._id
      })
        .then(r => {
          this.getData()
          this.snackbarColor = 'success'
          this.text = '댓글을 성공적으로 삭제했습니다'
          this.snackbar = true
        })
        .catch(e => console.error(e))

      this.removeDialog = false
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.postComment(this.writecom)
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
