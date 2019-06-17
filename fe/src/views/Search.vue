<template>
  <v-container fluid grid-list-xl>
    <v-layout wrap align-center>
      <v-flex xs12 sm6 d-flex>
        <v-select
          :items="items"
          box
          label="Box style"
        ></v-select>
      </v-flex>

    </v-layout>
  </v-container>
</template>


<script>

export default {
  data () {
    return {
      items: ['장각오븐구이', '초코웃흥', 'qwe'],
    }
  },
  methods: {

  }
}

</script>