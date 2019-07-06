<template>
  <v-app>
    <v-navigation-drawer permanent app>
      <v-toolbar flat>
        <v-list>
          <v-list-tile @click="$router.push('/')">
            <v-list-tile-title class="title">
              급식충들 모여라
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>

      <v-divider/>

      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar @click="logoutDialog = true" v-if="isAuth">
            <v-list-tile-avatar>
              <v-icon>done</v-icon>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>{{account.name}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile avatar @click="loginDialog = true" v-else>
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
      <router-view :isAuth="isAuth" :account="account" @changeData="changeData"/>

      <v-dialog v-model="logoutDialog" max-width="600px">
        <v-card>
          <v-card-title class="headline">로그아웃</v-card-title>
          <v-card-text>로그아웃 하시겠습니까?</v-card-text>

          <v-card-actions>
            <v-spacer/>
            <v-btn color="red lighter-1" dark @click="logoutDialog = false">취소</v-btn>
            <v-btn color="green lighter-1" dark @click="toLogout">로그아웃</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="loginDialog" max-width="600px" @input="cancelLogin">
        <v-card>
          <v-card-title class="headline">로그인</v-card-title>
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
                  @click:append="pwToggle = !pwToggle"
                  @keypress.enter="toLogin"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-btn color="blue" dark @click="showSignupDialog">계정없는 흑우 없제?</v-btn>
            <v-spacer/>
            <v-btn color="red lighter-1" dark @click="cancelLogin">닫기</v-btn>
            <v-btn color="green lighter-1" dark @click="toLogin">로그인</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="signupDialog" max-width="600px">
        <v-card>
          <v-card-title class="headline">회원가입</v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="name" label="이름" autofocus></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="id" label="아이디"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="pw" label="비밀번호"
                  :append-icon="pwToggle ? 'visibility' : 'visibility_off'"
                  :type="pwToggle ? 'text' : 'password'"
                  @click:append="pwToggle = !pwToggle"
                  @keypress.enter="toSignup"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn color="red lighter-1" dark @click="cancelSignup">닫기</v-btn>
            <v-btn color="green lighter-1" dark @click="toSignup">가입</v-btn>
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
      name: '',
      id: '',
      pw: '',
      isAuth: false,
      logoutDialog: false,
      loginDialog: false,
      signupDialog: false,
      pwToggle: false,
      snackbar: false,
      timeout: 3000,
      snackbarColor: '',
      text: '',
      failColor: 'rgba(255, 0, 0, 0.7)',
      account: {
        'name': '',
        'id': '',
        'pw': '',
        'likes': [],
        'dislikes': []
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
  watch: {
    loginDialog (val) {
      !val && this.cancelLogin()
    },
    signupDialog (val) {
      !val && this.cancelSignup()
    }
  },
  methods: {
    test (arg) {
      console.log('it is test method!', arg)
    },
    cancelLogin () {
      this.loginDialog = false
      this.resetInput()
    },
    cancelSignup () {
      this.signupDialog = false
      this.resetInput()
    },
    toLogout () {
      this.account.name = ''
      this.account.id = ''
      this.account.pw = ''

      this.isAuth = false
      this.logoutDialog = false

      this.snackbarColor = 'success'
      this.text = '로그아웃 되었습니다'
      this.snackbar = true
    },
    toLogin () {
      if (this.id === '' || this.pw === '') {
        console.log('ID or password is empty!')
        this.snackbarColor = this.failColor
        this.text = 'ID 혹은 비밀번호가 비어있습니다'
        this.snackbar = true
        return
      }

      this.$http.post('http://localhost:3000/auth/login', { 'id': this.id, 'password': this.pw })
        .then(r => {
          // 성공 시
          this.snackbarColor = 'success'
          this.text = '로그인에 성공했습니다'
          this.snackbar = true

          this.account = r.data
          this.isAuth = true
        })
        .catch(e => {
          // 실패 시
          this.snackbarColor = this.failColor
          this.text = '로그인에 실패했습니다'
          this.snackbar = true
        })

      this.loginDialog = false
      this.resetInput()
    },
    showSignupDialog () {
      this.resetInput()
      this.loginDialog = false
      this.signupDialog = true
    },
    toSignup () {
      if (this.name === '' || this.id === '' || this.pw === '') {
        console.log('Name or ID or password is empty!')
        this.snackbarColor = this.failColor
        this.text = '비어있는 항목이 있습니다'
        this.snackbar = true
        return
      }

      this.$http.post('http://localhost:3000/auth/signup', { 'name': this.name, 'id': this.id, 'password': this.pw })
        .then(r => {
          // 성공 시
          this.snackbarColor = 'success'
          this.text = '성공적으로 가입됐습니다'
          this.snackbar = true
        })
        .catch(e => {
          // 실패 시
          this.snackbarColor = this.failColor
          this.text = '회원가입에 실패했습니다'
          this.snackbar = true
        })

      this.signupDialog = false
      this.resetInput()
    },
    resetInput () {
      this.name = ''
      this.id = ''
      this.pw = ''
    },
    changeData (data) {
      this.account.likes.push(data)
      console.log(this.account.likes)
    }
  }
}
</script>
