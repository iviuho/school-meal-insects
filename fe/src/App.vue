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

        <v-divider></v-divider>

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
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
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
    }
  }
}
</script>
