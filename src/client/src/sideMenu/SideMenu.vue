<template id="side-menu">
  <div class="side-menu">
    <div class="side-menu-header center-content">
      <span>CINEMA</span>
    </div>
    <u>
      <li v-for="item in sideMenuItens" class="center-content">
        <side-menu-item :msg="item.msg"></side-menu-item>
      </li>
    </u>
  </div>
</template>

<script>
import SideMenuItem from "./sideMenuItem"

export default {
  name: 'SideMenu',
  components: {
    "side-menu-item": SideMenuItem
  },
  data: () => {
    return {
      sideMenuItens: [{
        msg: "ITEM 1"
      },{
        msg: "ITEM 2"
      },{
        msg: "ITEM 3"
      },{
        msg: "ITEM 4"
      },{
        msg: "ITEM 5"
      },{
        msg: "ITEM 6"
      }]
    }
  }

}
</script>

<style scoped>

.side-menu {
  min-height: 100%;
  width: 15%;
  background-color: red;
  transition: transform 0.5s;
  transform: translate3d(0, 0, 0);
}

.side-menu-header {
  width: 100%;
  height: 50px;
  background-color: yellow;
  float: left;
}

.side-menu u{
  padding: 5%;
  width: 90%;
}

.side-menu li {
  margin: 1%;
  background-color: purple;
  height: 40px;
}

.side-menu li:hover {
  background-color: pink;
}

</style>
