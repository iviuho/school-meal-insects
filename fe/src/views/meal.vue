
<template>
  <div id="app">
    <div v-if="hasResult">
      <div v-for="post in posts" v-bind:key="post.id">
        <h1></h1>
        <p></p>
      </div>
    </div>
    <button v-else v-on:click="searchTerm">글 불러오기</button>
  </div>
  <v-container fluid grid-list-md>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-card-title><h4>{{ props.item.name }}</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content>Calories:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.calories }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Fat:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.fat }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Carbs:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.carbs }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Protein:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.protein }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Sodium:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.sodium }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Calcium:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.calcium }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Iron:</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ props.item.iron }}</v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>

export default {
  name: 'app',
  data: function () {
    return {
      posts: []
    }
  },
  computed: {
    hasResult: function () {
      return this.posts.length > 0
    }
  },
  methods: {
    searchTerm: function () {
      // using JSONPlaceholder
      const baseURI = 'http://10.120.73.216:3000/meal';
      this.$http.get(`${baseURI}`)
      .then((result) => {
        console.log(result)
        console.log(result.data.data.breakfast)
        this.posts = result.data.data.breakfast
      })
    }
  }
}
// import axios from 'axios'
// export default {
//   data () {
//     return {
//       breakfast: []
//     }
//   },
//   mounted () {
//   },
//   methods: {
//     getMeal () {
//       axios.get('http://10.120.73.216:3000/meal')
//         .then((r) => {
//           this.getMd = JSON.stringify(r.data)
//         })
//         .catch((e) => {
//           console.error(e.message)
//         })
//     }
//   }
// }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 560px;
}
</style>