<template id="side-menu-item">
  <div class="side-menu-item center-content">
    <span>{{ msg }}</span>
  </div>
</template>

<script>
export default {
  name: 'SideMenuItem',
  props: ['msg'],
  data: () => {
    return {}
  }
}
</script>

<style>

.side-menu-item {
  width: 100%;
  height: 100%;
}

</style>
