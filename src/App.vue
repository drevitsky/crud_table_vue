<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['userList', 'isAddId'])
  },
  methods: {
    addId () {
      this.userList.forEach(element => {
        element.id = this.getId()
      })
    },
    getId () {
      const id = `f${(+new Date() + Math.floor(Math.random() * Math.floor(2048))).toString(16)} `
      return id
    }
  },
  created () {
    if (!this.isAddId) {
      this.addId()
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style lang="scss" src="./assets/scss/common.scss" />
