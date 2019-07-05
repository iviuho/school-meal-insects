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

            <v-list-tile avatar @click="toLogin" v-else>
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
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isAuth: false,
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
      this.isAuth = !this.isAuth
      console.log('it is test method!')
    },
    toLogin () {
      console.log('로그인 어케 하누')
    }
  }
}
</script>
