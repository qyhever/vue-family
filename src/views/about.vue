<template>
  <div>
    <h3>about</h3>
  </div>
</template>

<script>
  function p() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(1)
      }, 1500)
    })
  }
  export default {
    name: 'about',
    mounted() {
      this.query()
    },
    methods: {
      async query() {
        try {
          const res = await p()
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      }
    }
  }
</script>

<style lang="less">
  // ...
</style>
