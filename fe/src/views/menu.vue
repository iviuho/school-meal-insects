<template>
    <div>
       {{ id }}
       ss
       scriptss

       sss
       s

    </div>
</template>


<script>
import router from "../router"

export default {
    props: ['id'],
  data: function () {
    return {
        like: 0,
        dislike: 0
    }
  },
  mounted() {
    console.log(this.id)
    this.getData()
  },
  methods: {
      getData() {
        const baseURI = `http://localhost:3000/menu/${this.id}`;
        this.$http.get(`${baseURI}`)
        .then((r) => {
          console.log(r)
          this.like = r.data.like
          console.log(this.like)
          this.dislike = r.data.dislike
          console.log(this.dislike)
        })
        .catch((e) => {
        console.error(e.message)
        })
      }
  }
}
</script>
