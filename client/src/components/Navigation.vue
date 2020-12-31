<template>
    <div>
    <nav class="navbar navbar-light bg-light navbar-default navbar-fixed-top">
      <a class="navbar-brand" role="button">{{token ? 'Admin Galery': 'Galery App'}}</a>
      <div class="row">
      <button class="btn btn-danger" style="margin-right: 10px;" @click="logout()">Logout</button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
    name: 'Navigation',
    computed: {
      token(){
        return localStorage.token
      }
    },
    methods: {
      logout(){
        localStorage.clear()
        this.$router.push('/login')
      }
    }
}
</script>

<style>

</style>