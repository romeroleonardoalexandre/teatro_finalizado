<template id="dropdown">
  <div class="text-xs-center">
     <v-menu
       transition="slide-y-transition"
       bottom
       style="position:static">
       <v-btn color="primary" slot="activator" class="dropdown-button">
         Configuração
       </v-btn>
       <v-list class="menu-list">
         <v-list-tile v-for="item in items" :key="item.title" class="menu-item-wrapper" @click="navigate(item.path)">
           <v-list-tile-title class="menu-item">{{ item.title }}</v-list-tile-title>
         </v-list-tile>
       </v-list>
     </v-menu>
   </div>
</template>

<script>

import router from "../router/index.js"

export default {
  Name: 'Dropdown',
  data: () => ({
    items: [
      {
        title: "Administrador",
        path: "/admin"
      },
      {
        title: "Atendente",
        path: "/"
      }
    ]
  }),
  methods: {
    navigate: path => router.push({path})
  }
}
</script>

<style>

.dropdown-button {
  background-color: #00549A;
  border-color: #7600b9;
}

.menu-item-wrapper {
  background:  #00549A;
}

.menu-item-wrapper:hover {
  background:  #1e68a6;
}

.menu-list {
  background-color: #00549A;
  padding: 3px;
}

</style>
