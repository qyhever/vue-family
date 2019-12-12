<template>
  <div class="home">
    <h3>home</h3>
    <router-link to="/about">
      <el-link type="primary">about page</el-link>
    </router-link>
    <br>
    <p>{{count}}</p>
    <el-button @click="$store.commit('app/SET_COUNT', 1)">添加</el-button>
    <el-button @click="$store.commit('app/SET_COUNT', -1)">减少</el-button>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'home',
    computed: {
      ...mapGetters([ 'count' ])
    }
  }
</script>

<style lang="less">
  .home {
    background-color: @primary-background;
  }
</style>
