<template>
  <div id="app">
    <router-link to="/">Home map</router-link>
    <router-link to="/dy">Dynamic map</router-link>
    <router-link to="/im">Image map</router-link>
    <router-link to="/tiarc">Ti-arcgis map 非切片</router-link>
    <router-link to="/tiarc2">Ti-arcgis map 切片</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
