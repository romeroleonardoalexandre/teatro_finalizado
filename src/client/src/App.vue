<template>
  <div id="app">
    <navbar></navbar>
    <router-view  />
  </div>
</template>

<script>

import Navbar from "./navbar/Navbar.vue"

export default {
  name: 'App',
  components: {
    "navbar": Navbar
  }
}
</script>

<style>

#app {
  width: 100%;
  height: 100%;
}

.center-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-content-horizontal {
  display: flex;
  align-items: center;
}

.right-content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.left-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.reverse-gradient-bg {
  /* background: #7252bf; */
  background: #00549A;
}

.blue-bg {
  background-color: #1989EA;
}

.red-bg {
  background-color: #e85c5c;
}

.lettering {
  font-family: Circular,Helvetica,Arial,sans-serif;
}

.lettering-courier {
  font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;
}

.right-button {
  height: 35px;
  width: 100px;
  color: white;
  border-radius: 10px !important;
  float: right;
  margin-right: 10px;
}

.bg-font {
  font-size: 28px;
  font-weight: 400;
}

.bg-md-font {
  font-size: 24px;
  font-weight: 300;
}

.md-font {
  font-size: 16px;
  font-weight: 200;
}

.sm-font {
  font-size: 14px;
  font-weight: 200;
}

.white-font {
  color: white
}

.sm-square {
  height: 20px;
  width: 20px;
}

html, body {
  margin: 0;
  height: 100%;
  background: #f9f9f1;
}

body {
  display: flex;
}

</style>
