<template>
  <v-app>
      <v-navigation-drawer permanent app>
        <v-toolbar flat>
          <v-list>
            <v-list-tile @click="goHome">
              <v-list-tile-title class="title">
                급식충들 모여라
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-divider/>

        <v-toolbar flat class="transparent">
          <v-list class="pa-0">
            <v-list-tile avatar @click="test" v-if="isAuth">
              <v-list-tile-avatar>
                <img src="https://randomuser.me/api/portraits/men/85.jpg">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>{{account.name}}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar @click="dialog = true" v-else>
              <v-list-tile-avatar>
                <v-icon>person</v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>로그인이 필요합니다!</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-toolbar>

        <v-divider/>

        <v-list dense class="pt-0">
          <v-list-tile
            v-for="item in items"
            :key="item.title"
            :to="item.to"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>
    <v-content style="background-color: #FAFAFA;">
      <router-view/>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">회원 로그인</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="id" label="아이디" autofocus></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="pw" label="비밀번호"
                  :append-icon="pwToggle ? 'visibility' : 'visibility_off'"
                  :type="pwToggle ? 'text' : 'password'"
                  @click:append="pwToggle = !pwToggle"></v-text-field>
                </v-flex>
                계정없는 흑우 없제?
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red lighter-1" dark @click="cancelLogin">닫기</v-btn>
            <v-btn color="green lighter-1" dark @click="toLogin">로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="timeout" top>
        {{text}}
      </v-snackbar>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      id: '',
      pw: '',
      isAuth: false,
      dialog: false,
      pwToggle: false,
      snackbar: false,
      timeout: 3000,
      snackbarColor: '',
      text: 'IT IS TEST TEXT',
      account: {
        'name': 'Jo Yeonghwan'
      },
      items: [
        {
          icon: 'local_dining',
          title: '오늘의 식단표',
          to: '/meal'
        },
        {
          icon: 'show_chart',
          title: '랭킹',
          to: '/ranking'
        }
      ]
    }
  },
  methods: {
    goHome () {
      this.$router.push('/')
    },
    test () {
      console.log('it is test method!')
    },
    cancelLogin () {
      this.dialog = false
      this.resetInput()
    },
    toLogin () {
      if (this.id === '' || this.pw === '') {
        console.log('ID or password is empty!')
        this.snackbarColor = 'rgba(255, 0, 0, 0.7)'
        this.text = 'ID 혹은 비밀번호가 비어있습니다'
        this.snackbar = true
        return
      }

      console.log(this.id)
      console.log(this.pw)
      // 성공 시
      // this.snackbarColor = 'success'
      // this.text = '로그인에 성공했습니다'
      // this.snackbar = true
      // this.isAuthed = true

      // 실패 시
      // this.snackbarColor = 'rgba(255, 0, 0, 0.7)'
      // this.text = '로그인에 실패했습니다'
      // this.snackbar = true

      this.dialog = false
      this.resetInput()
    },
    resetInput () {
      this.id = ''
      this.pw = ''
    }
  }
}
</script>
