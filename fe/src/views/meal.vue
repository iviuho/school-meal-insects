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
            <v-container column fluid>
              <v-card class="rounded-card" v-for="menu in menus[i]" v-bind:key="menu" min-width="300">
                <v-card-title class="justify-center" @click="moveTo(menu)" primary-title>
                    <h3>{{menu}}</h3>
                </v-card-title>
                <v-card-actions class="justify-center">
                  <v-btn icon @click="postReq(menu, 'like')">
                    <v-icon>thumb_up</v-icon>
                  </v-btn>
                  <v-btn icon @click="postReq(menu, 'dislike')">
                    <v-icon>thumb_down</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-container>
          </v-window-item>
        </v-window>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      posts: [],
      menus: {
        '아침': [],
        '점심': [],
        '저녁': []
      },
      leng: 0,
      items: ['아침', '점심', '저녁'],
      window: 0
    }
  },
  mounted () {
    this.getMeals()
  },
  methods: {
    getMeals () {
      const baseURI = 'http://localhost:3000/meal'
      this.$http.get(baseURI)
        .then((result) => {
          this.leng = result.data.data.breakfast.length
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
      const baseURI = 'http://localhost:3000/menu/'
      this.$http.post(baseURI + name, {
        order: order
      })
        .then((r) => {
          console.log(r)
        })
        .catch((e) => {
          console.error(e.message)
        })
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
