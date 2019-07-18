<template>
  <v-container fluid>
    <v-layout align-center column>
      <v-layout align-center>
        <h1>다음 식사까지...</h1>
      </v-layout>
      <v-layout align-center column>
        <h2>{{ delta.hour }}시간 {{ delta.minute }}분 {{ delta.second }}초</h2>
      </v-layout>
    </v-layout>
    <v-layout align-center column>
      
      <div v-if="time>=13">
        <v-card style="float: left; margin-left: 15px; margin-right:15px; margin-left: 15px; margin-right:15px;"> 
          <v-card-title>
            <h2>아침</h2>
          </v-card-title>
          <v-container column fluid v-if="menus['아침'].length > 1">
            <v-card class="rounded-card"  v-for="menu in menus['아침']" v-bind:key="menu" min-width="300">
              <v-card-title class="justify-center" @click="moveTo(menu)" primary-title>
                <h3>{{menu}}</h3>
              </v-card-title>
              <v-card-actions class="justify-center">
                  <v-btn icon v-if="account.likes.includes(menu)" @click="postReq(menu, 'like')">
                    <v-icon color="success">thumb_up</v-icon>
                  </v-btn>
                  <v-btn v-else icon @click="postReq(menu, 'like')">
                    <v-icon>thumb_up</v-icon>
                  </v-btn>
                  <v-btn icon v-if="account.dislikes.includes(menu)" @click="postReq(menu, 'dislike')">
                    <v-icon color="error">thumb_down</v-icon>
                  </v-btn>
                  <v-btn icon v-else @click="postReq(menu, 'dislike')">
                    <v-icon>thumb_down</v-icon>
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-container>
          <v-container column fluid v-else>
            <v-card class="rounded-card" min-width="300">
              <v-card-title class="justify-center" primary-title>
                  <h3>표시할 급식 정보가 없습니다.</h3>
              </v-card-title>
            </v-card>
          </v-container>
        </v-card>
        <v-card style="float: left; margin-left: 15px; margin-right:15px;">
          <v-card-title>
            <h2>점심</h2>
          </v-card-title>
          <v-container column fluid v-if="menus['점심'].length > 1">
            <v-card class="rounded-card"  v-for="menu in menus['점심']" v-bind:key="menu" min-width="300">
              <v-card-title class="justify-center" @click="moveTo(menu)" primary-title>
                <h3>{{menu}}</h3>
              </v-card-title>
              <v-card-actions class="justify-center">
                  <v-btn icon v-if="account.likes.includes(menu)" @click="postReq(menu, 'like')">
                    <v-icon color="success">thumb_up</v-icon>
                  </v-btn>
                  <v-btn v-else icon @click="postReq(menu, 'like')">
                    <v-icon>thumb_up</v-icon>
                  </v-btn>
                  <v-btn icon v-if="account.dislikes.includes(menu)" @click="postReq(menu, 'dislike')">
                    <v-icon color="error">thumb_down</v-icon>
                  </v-btn>
                  <v-btn icon v-else @click="postReq(menu, 'dislike')">
                    <v-icon>thumb_down</v-icon>
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-container>
          <v-container column fluid v-else>
            <v-card class="rounded-card" min-width="300">
              <v-card-title class="justify-center" primary-title>
                  <h3>표시할 급식 정보가 없습니다.</h3>
              </v-card-title>
            </v-card>
          </v-container>
        </v-card>
        <v-card style="background: #fffef7; float: left; margin-left: 15px; margin-right:15px;">
          <v-card-title>
            <h2>저녁</h2>
          </v-card-title>
          <v-container column fluid v-if="menus['저녁'].length > 1">
            <v-card class="rounded-card"  v-for="menu in menus['저녁']" v-bind:key="menu" min-width="300">
              <v-card-title class="justify-center" @click="moveTo(menu)" primary-title>
                <h3>{{menu}}</h3>
              </v-card-title>
              <v-card-actions class="justify-center">
                  <v-btn icon v-if="account.likes.includes(menu)" @click="postReq(menu, 'like')">
                    <v-icon color="success">thumb_up</v-icon>
                  </v-btn>
                  <v-btn v-else icon @click="postReq(menu, 'like')">
                    <v-icon>thumb_up</v-icon>
                  </v-btn>
                  <v-btn icon v-if="account.dislikes.includes(menu)" @click="postReq(menu, 'dislike')">
                    <v-icon color="error">thumb_down</v-icon>
                  </v-btn>
                  <v-btn icon v-else @click="postReq(menu, 'dislike')">
                    <v-icon>thumb_down</v-icon>
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-container>
          <v-container column fluid v-else>
            <v-card class="rounded-card" min-width="300">
              <v-card-title class="justify-center" primary-title>
                  <h3>표시할 급식 정보가 없습니다.</h3>
              </v-card-title>
            </v-card>
          </v-container>
        </v-card>
      </div>
      <div v-else-if="time>=8">
        <v-card style="float: left; margin-left: 15px; margin-right:15px; margin-right:15px;"> 
          <v-card-title>
            <h2>아침</h2>
          </v-card-title>
          <v-container column fluid v-if="menus['아침'].length > 1">
            <v-card class="rounded-card"  v-for="menu in menus['아침']" v-bind:key="menu" min-width="300">
              <v-card-title class="justify-center" @click="moveTo(menu)" primary-title>
                <h3>{{menu}}</h3>
              </v-card-title>
              <v-card-actions class="justify-center">
                  <v-btn icon v-if="account.likes.includes(menu)" @click="postReq(menu, 'like')">
                    <v-icon color="success">thumb_up</v-icon>
                  </v-btn>
                  <v-btn v-else icon @click="postReq(menu, 'like')">
                    <v-icon>thumb_up</v-icon>
                  </v-btn>
                  <v-btn icon v-if="account.dislikes.includes(menu)" @click="postReq(menu, 'dislike')">
                    <v-icon color="error">thumb_down</v-icon>
                  </v-btn>
                  <v-btn icon v-else @click="postReq(menu, 'dislike')">
                    <v-icon>thumb_down</v-icon>
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-container>
          <v-container column fluid v-else>
            <v-card class="rounded-card" min-width="300">
              <v-card-title class="justify-center" primary-title>
                  <h3>표시할 급식 정보가 없습니다.</h3>
              </v-card-title>
            </v-card>
          </v-container>
        </v-card>
        <v-card style="background: #fffef7; float: left; margin-left: 15px; margin-right:15px;">
          <v-card-title>
            <h2>점심</h2>
          </v-card-title>
          <v-container column fluid v-if="menus['점심'].length > 1">
            <v-card class="rounded-card"  v-for="menu in menus['점심']" v-bind:key="menu" min-width="300">
              <v-card-title class="justify-center" @click="moveTo(menu)" primary-title>
                <h3>{{menu}}</h3>
              </v-card-title>
              <v-card-actions class="justify-center">
                  <v-btn icon v-if="account.likes.includes(menu)" @click="postReq(menu, 'like')">
                    <v-icon color="success">thumb_up</v-icon>
                  </v-btn>
                  <v-btn v-else icon @click="postReq(menu, 'like')">
                    <v-icon>thumb_up</v-icon>
                  </v-btn>
                  <v-btn icon v-if="account.dislikes.includes(menu)" @click="postReq(menu, 'dislike')">
                    <v-icon color="error">thumb_down</v-icon>
                  </v-btn>
                  <v-btn icon v-else @click="postReq(menu, 'dislike')">
                    <v-icon>thumb_down</v-icon>
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-container>
          <v-container column fluid v-else>
            <v-card class="rounded-card" min-width="300">
              <v-card-title class="justify-center" primary-title>
                  <h3>표시할 급식 정보가 없습니다.</h3>
              </v-card-title>
            </v-card>
          </v-container>
        </v-card>
        <v-card style="float: left; margin-left: 15px; margin-right:15px;">
          <v-card-title>
            <h2>저녁</h2>
          </v-card-title>
          <v-container column fluid v-if="menus['저녁'].length > 1">
            <v-card class="rounded-card"  v-for="menu in menus['저녁']" v-bind:key="menu" min-width="300">
              <v-card-title class="justify-center" @click="moveTo(menu)" primary-title>
                <h3>{{menu}}</h3>
              </v-card-title>
              <v-card-actions class="justify-center">
                  <v-btn icon v-if="account.likes.includes(menu)" @click="postReq(menu, 'like')">
                    <v-icon color="success">thumb_up</v-icon>
                  </v-btn>
                  <v-btn v-else icon @click="postReq(menu, 'like')">
                    <v-icon>thumb_up</v-icon>
                  </v-btn>
                  <v-btn icon v-if="account.dislikes.includes(menu)" @click="postReq(menu, 'dislike')">
                    <v-icon color="error">thumb_down</v-icon>
                  </v-btn>
                  <v-btn icon v-else @click="postReq(menu, 'dislike')">
                    <v-icon>thumb_down</v-icon>
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-container>
          <v-container column fluid v-else>
            <v-card class="rounded-card" min-width="300">
              <v-card-title class="justify-center" primary-title>
                  <h3>표시할 급식 정보가 없습니다.</h3>
              </v-card-title>
            </v-card>
          </v-container>
        </v-card>
      </div>
      <div v-else>
        <v-card style="background: #fffef7; float: left; margin-left: 15px; margin-right:15px; margin-right:15px;"> 
          <v-card-title>
            <h2>아침</h2>
          </v-card-title>
          <v-container column fluid v-if="menus['아침'].length > 1">
            <v-card class="rounded-card"  v-for="menu in menus['아침']" v-bind:key="menu" min-width="300">
              <v-card-title class="justify-center" @click="moveTo(menu)" primary-title>
                <h3>{{menu}}</h3>
              </v-card-title>
              <v-card-actions class="justify-center">
                  <v-btn icon v-if="account.likes.includes(menu)" @click="postReq(menu, 'like')">
                    <v-icon color="success">thumb_up</v-icon>
                  </v-btn>
                  <v-btn v-else icon @click="postReq(menu, 'like')">
                    <v-icon>thumb_up</v-icon>
                  </v-btn>
                  <v-btn icon v-if="account.dislikes.includes(menu)" @click="postReq(menu, 'dislike')">
                    <v-icon color="error">thumb_down</v-icon>
                  </v-btn>
                  <v-btn icon v-else @click="postReq(menu, 'dislike')">
                    <v-icon>thumb_down</v-icon>
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-container>
          <v-container column fluid v-else>
            <v-card class="rounded-card" min-width="300">
              <v-card-title class="justify-center" primary-title>
                  <h3>표시할 급식 정보가 없습니다.</h3>
              </v-card-title>
            </v-card>
          </v-container>
        </v-card>
        <v-card style="float: left; margin-left: 15px; margin-right:15px;">
          <v-card-title>
            <h2>점심</h2>
          </v-card-title>
          <v-container column fluid v-if="menus['점심'].length > 1">
            <v-card class="rounded-card"  v-for="menu in menus['점심']" v-bind:key="menu" min-width="300">
              <v-card-title class="justify-center" @click="moveTo(menu)" primary-title>
                <h3>{{menu}}</h3>
              </v-card-title>
              <v-card-actions class="justify-center">
                  <v-btn icon v-if="account.likes.includes(menu)" @click="postReq(menu, 'like')">
                    <v-icon color="success">thumb_up</v-icon>
                  </v-btn>
                  <v-btn v-else icon @click="postReq(menu, 'like')">
                    <v-icon>thumb_up</v-icon>
                  </v-btn>
                  <v-btn icon v-if="account.dislikes.includes(menu)" @click="postReq(menu, 'dislike')">
                    <v-icon color="error">thumb_down</v-icon>
                  </v-btn>
                  <v-btn icon v-else @click="postReq(menu, 'dislike')">
                    <v-icon>thumb_down</v-icon>
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-container>
          <v-container column fluid v-else>
            <v-card class="rounded-card" min-width="300">
              <v-card-title class="justify-center" primary-title>
                  <h3>표시할 급식 정보가 없습니다.</h3>
              </v-card-title>
            </v-card>
          </v-container>
        </v-card>
        <v-card style="float: left; margin-left: 15px; margin-right:15px;">
          <v-card-title>
            <h2>저녁</h2>
          </v-card-title>
          <v-container column fluid v-if="menus['저녁'].length > 1">
            <v-card class="rounded-card"  v-for="menu in menus['저녁']" v-bind:key="menu" min-width="300">
              <v-card-title class="justify-center" @click="moveTo(menu)" primary-title>
                <h3>{{menu}}</h3>
              </v-card-title>
              <v-card-actions class="justify-center">
                  <v-btn icon v-if="account.likes.includes(menu)" @click="postReq(menu, 'like')">
                    <v-icon color="success">thumb_up</v-icon>
                  </v-btn>
                  <v-btn v-else icon @click="postReq(menu, 'like')">
                    <v-icon>thumb_up</v-icon>
                  </v-btn>
                  <v-btn icon v-if="account.dislikes.includes(menu)" @click="postReq(menu, 'dislike')">
                    <v-icon color="error">thumb_down</v-icon>
                  </v-btn>
                  <v-btn icon v-else @click="postReq(menu, 'dislike')">
                    <v-icon>thumb_down</v-icon>
                  </v-btn>
                </v-card-actions>
            </v-card>
          </v-container>
          <v-container column fluid v-else>
            <v-card class="rounded-card" min-width="300">
              <v-card-title class="justify-center" primary-title>
                  <h3>표시할 급식 정보가 없습니다.</h3>
              </v-card-title>
            </v-card>
          </v-container>
        </v-card>
      </div>
      <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="timeout" top>
        {{text}}
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['account', 'token'],
  data () {
    return {
      url: 'http://10.120.73.216:3000',
      posts: [],
      menus: {
        '아침': [],
        '점심': [],
        '저녁': []
      },
      items: ['아침', '점심', '저녁'],
      window: 0,
      snackbar: false,
      timeout: 3000,
      snackbarColor: '',
      text: '',
      standard: [480, 750, 1110],
      stdDate: [null, null, null],
      now: this.setNow(),
      delta: {
        'hour': null,
        'minute': null,
        'second': null,
        'total': null
      },
      nextMealIndex: 0,
      time:0
    }
  },
  mounted () {
    this.getMeals()
    this.window = this.setMeal()
    this.setStdDate()
  },
  methods: {
    setMeal () {
      var today = this.now
      var hours = today.getHours()
      var minutes = today.getMinutes()
      this.time=hours
      for (var i = 0; i < this.standard.length; i++) {
        if (hours * 60 + minutes <= this.standard[i]) {
          return i
        }
      }
      return 0
    },
    getMeals () {
      this.$http.get(this.url + '/meal')
        .then((result) => {
          this.menus['아침'] = result.data.data.breakfast
          this.menus['점심'] = result.data.data.lunch
          this.menus['저녁'] = result.data.data.dinner
        })
        .catch((e) => {
          console.error(e.message)
        })
    },
    moveTo (menu) {
      this.$router.push(`menu/${menu}`)
    },
    postReq (name, order) {
      if (this.token) {
        var value
        var voted = this.account[order + 's'].includes(name)

        if (!voted) {
          value = 1
          this.$emit('changeData', order, name)
        } else {
          value = -1
          this.$emit('exceptData', order, name)
        }

        this.$http.post(this.url + '/menu/' + name, {
          'order': order,
          'value': value
        }, { 'headers': { 'Authorization': this.token } })
          .then(r => {})
          .catch(e => console.error(e))
      } else {
        this.snackbarColor = 'error'
        this.text = '추천, 비추천 기능은 로그인 후에 가능합니다'
        this.snackbar = true
      }
    },
    setStdDate (nextDay = false) {
      if (nextDay) {
        for (let i = 0; i < this.standard.length; i++) {
          this.stdDate[i].setDate(this.stdDate[i].getDate() + 1)
        }
      } else {
        for (let i = 0; i < this.standard.length; i++) {
          this.stdDate[i] = new Date(
            this.now.getFullYear(),
            this.now.getMonth(),
            this.now.getDate(),
            parseInt(this.standard[i] / 60),
            this.standard[i] % 60
          )
        }
      }
    },
    setNow () {
      setInterval(() => {
        this.now = new Date()
        this.window = this.setMeal()

        if (this.now > this.stdDate[2]) {
          this.setStdDate(true)
        } else {
          var sec = (this.stdDate[this.setMeal()] - this.now) / 1000
          this.delta.hour = parseInt(sec / 60 / 60)
          this.delta.minute = parseInt(sec / 60 % 60)
          this.delta.second = parseInt(sec % 60)
          this.delta.total = sec
        }
      }, 1000)

      return new Date()
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
