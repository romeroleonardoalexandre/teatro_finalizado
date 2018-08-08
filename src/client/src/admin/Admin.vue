<template id="admin">
  <div class="admin-wrapper center-content">
    <div class="areas reverse-gradient-bg">
      <div class="area-item-wrapper"@click="selectArea(shows)">
        <div class="area-item md-font lettering center-content" :class="{selectedArea: isShows}">
          SHOWS
        </div>
      </div>
      <div class="area-item-wrapper"@click="selectArea(rooms)">
        <div class="area-item md-font lettering center-content" :class="{selectedArea: isRooms}">
          SALAS
        </div>
      </div>
    </div>
    <div class="content-wrapper center-content">
      <div class="content">
        <div class="commands reverse-gradient-bg">
          <div class="commands-title center-content lettering bg-font">
            Cadastro de {{getTitle}}
          </div>
          <div class="commands-buttons">
            <button type="button" @click="goTo({_id: 0})" class="lettering right-button add-item-button">Adicionar</button>
          </div>
        </div>
        <div class="rows">
          <div class="row" v-for="item in getItens">
            <div class="lettering md-font center-content row-title">
                {{item.title}}
            </div>
            <div class="row-buttons right-content">
              <button class="row-button edit md-square reverse-gradient-bg" @click="goTo(item)">
                <img src="../resources/pencil-edit-button.svg" class="sm-square">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import * as AdminAreas from "./AdminAreas"
import * as Getter from "./AdminGetters"
import * as Action from "./AdminActions"
import * as Areas from "./AdminAreas"
import store from "../store/store.js"
import {mapGetters, mapActions} from "vuex"

export default {
  name: "Admin",
  store,
  data: () => {
    return {
      shows: Areas.SHOWS,
      users: Areas.USERS,
      trupes: Areas.TRUPES,
      rooms: Areas.ROOMS
    }
  },
  computed: {
    ...mapGetters({
      isShows: Getter.IS_SHOWS,
      isUsers: Getter.IS_USERS,
      isTrupes: Getter.IS_TRUPES,
      isRooms: Getter.IS_ROOMS,
      getItens: Getter.GET_ITENS,
      getTitle: Getter.GET_TITLE
    })
  },
  methods: {
    ...mapActions({
      selectArea: Action.SELECT_AREA,
      goTo: Action.GO_TO
    }),
    remove: item => console.log(item),
  },
  mounted: () => {
    store.dispatch(Action.LOAD_ITENS)
  }
}
</script>

<style lang="css" scoped>

#admin {
  height: 100%;
}

.admin-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
}

.areas {
  width: 10%;
  height: 100%;
}

.area-item-wrapper {
  padding: 5px;
}

.area-item {
  width: 100%;
  padding: 5px;
  background-color: white;
  border-radius: 4px !important;
}

.selectedArea {
  background-color: #c4dbfc !important;
}

.content-wrapper {
  width: 90%;
  height: 100%;
}

.content {
  max-width: 700px;
  height: 90%;
  width: 80%;
  margin: 7%;
  background-color: white;
  display: block;
}

.commands {
  width: 100%;
  height: 10%;
}

.commands-title {
  width: 100%;
  height: 70%;
  color: white;
}

.commands-buttons {
  width: 100%;
  margin-top: -20px;
  height: 10%;
}

.add-item-button {
  background-color: white;
  color: black;
}

.rows {
  width: 100%;
  height: 90%;
  overflow-y: scroll;
}

.row {
  width: 100%;
  height: 7%;
  border-bottom: #ddd solid 1px;
}

.row-title {
  max-width: 500px;
  text-align: left;
  border-right: #dbdbdb solid 1px;
  height: 90%;
  margin: 1%;
  width: 650px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.row-button {
  margin: 1%;
  margin-top: -8%;
}

.edit:hover{
   background-color: #1e68a6 !important;
}

.remove:hover{
  background-color: #d63e3e !important;
}

.md-square {
  height: 35px;
  width: 35px;
  border-radius: 5px;
}

</style>
