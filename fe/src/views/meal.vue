<template>
  <v-container fluid>
    <v-layout align-center column>
      <v-item-group v-model="window" class="shrink mr-4" mandatory tag="v-flex">
        <v-item v-for="n in items" :key="n" style="display: inline-block;" >
          <div slot-scope="{ active, toggle }">
            <v-btn :input-value="active" @click="toggle">{{n}}</v-btn>
          </div>
        </v-item>
      </v-item-group>

      <v-flex>
        <v-window v-model="window" class="elevation-1">
          <v-window-item v-for="i in items" :key="i">
            <v-container column fluid v-if="menus[i].length > 1">
              <v-card class="rounded-card"  v-for="menu in menus[i]" v-bind:key="menu" min-width="300">
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
          </v-window-item>
        </v-window>
      </v-flex>
      <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="timeout" top>
        {{text}}
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['account'],
  data () {
    return {
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
      text: ''
    }
  },
  mounted () {
    this.getMeals()
    this.setMeal()
  },
  methods: {
    setMeal () {
      const today = new Date()
      const hours = today.getHours()
      if (hours <= 13) {
        this.window = 2
      } else if (hours <= 8) {
        this.window = 1
      }

      console.log(today)
      console.log(hours)
    },
    getMeals () {
      const baseURI = 'http://localhost:3000/meal'
      this.$http.get(baseURI)
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
      if (this.$session.exists()) {
        const baseURI = 'http://localhost:3000/menu/'
        var value
        var voted = this.account[order + 's'].includes(name)

        if (!voted) {
          value = 1
          this.$emit('changeData', order, name)
        } else {
          value = -1
          this.$emit('exceptData', order, name)
        }

        this.$http.post(baseURI + name, {
          'order': order,
          'id': this.account.id,
          'value': value
        })
          .then(r => {})
          .catch(e => console.error(e))
      } else {
        this.snackbarColor = 'error'
        this.text = '추천, 비추천 기능은 로그인 후에 가능합니다'
        this.snackbar = true
      }
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
