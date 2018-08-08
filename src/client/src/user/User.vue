<template id="user">
  <div class="user-content-wrapper center-content">
    <div class="user-content">
      <div class="user-header reverse-gradient-bg center-content bg-font lettering">
        Cadastro de Usuario
      </div>
      <div class="user-middle lettering md-font">
        <div class="user-form-row">
          <div>Nome de usuario:</div>
          <input type="text" :value="userTitle" @change="onChangeUserTitle" class="user-fom-input">
        </div>
        <div class="user-form-row">
          <div>Senha de usuario:</div>
          <input type="text" :value="userPass" @change="onChangeUserPass" class="user-fom-input">
        </div>
        <div class="user-form-row">
          <div class="room-form-row-label left-content">Administrador:</div>
          <div class="center-content checkbox-wrapper">
            <input type="checkbox" class="user-form-input-checkbox">
          </div>
        </div>
      </div>
      <div class="user-footer reverse-gradient-bg">
        <button class="lettering right-button" @click="back()">CANCELAR</button>
        <button class="cancel-button lettering right-button" @click="save()">SALVAR</button>
      </div>
    </div>
  </div>
</template>

<script>

import store from "../store/store.js"
import router from "../router/index.js"
import * as Actions from "./UserActions"
import * as Getters from "./UserGetters"
import { mapActions, mapGetters } from "vuex"

export default {
  router,
  store,
  name: "User",
  methods: {
    ...mapActions({
      toggleAdmin: Actions.TOGGLE_ADMIN,
      onChangeUserTitle: Actions.ON_CHANGE_USER_TITLE,
      onChangeUserPass: Actions.ON_CHANGE_USER_PASS,
      save: Actions.SAVE_USER
    }),
    back: () => router.go(-1)
  },
  computed: {
    ...mapGetters({
      isAdmin: Getters.IS_ADMIN,
      userPass: Getters.USER_PASS,
      userTitle: Getters.USER_TITLE
    })
  },
  created: () => {
    store.dispatch(Actions.GET_USER, router.history.current.params)
  }
}
</script>

<style lang="css">

.user-content-wrapper {
  width: 100%;
  height: 100%;
}

.user-content {
  width: 80%;
  max-width: 750px;
  height: 30%;
  background-color: white;
}

.user-header {
  height: 25%;
  width: 100%;
  color: white;
}

.user-middle {
  height: 50%;
  width: 100%;
}

.user-footer {
  height: 25%;
  width: 100%;
  padding-top: 2%;
  padding-bottom: 3%;
}

.user-form-row {
  margin: 1%;
  width: 98%;
  height: 25%;
  display: flex;
}

.user-form-input-checkbox {
  width: 25px;
  height: 25px;
}

.cancel-button {
  background-color: white;
  color: black;
}

.user-fom-input {
  width: 30%;
  border: #ddd solid 1px;
  border-radius: 3px;
  height: 100%;
  font-size: 18px;
  font-weight: 400;
  margin-left: 2%;
}

.checkbox-wrapper {
  margin-left: 2%;
}


</style>
