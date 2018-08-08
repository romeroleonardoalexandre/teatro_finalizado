<template id="show">
  <div class="show-content-wrapper center-content">
    <div class="show-content">
      <div class="show-header reverse-gradient-bg bg-font center-content lettering">
        Cadastro de Show
      </div>
      <div class="show-middle">
        <div class="row-header">
          <div class="section-header sessions lettering bg-md-font">Show</div>
        </div>
        <div class="row">
          <div class="column">
            <div class="column-label sm lettering md-font">Título*</div>
            <input type="text" :value="getTitle" @change="onChangeTitle" class="column-input sm lettering md-font">
          </div>
          <div class="column">
            <div class="column-label bg lettering md-font">Sala*</div>
            <select dir="rtl" class="column-input bg lettering md-font" @change="onChangeRoom">
              <option v-for="item in getAvaiableRooms" :value="item.value">{{item.desc}}</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="column">
            <div class="column-label bg lettering md-font">Trupe*</div>
            <input type="text" :value="getTrupe" @change="onChangeTrupe" class="column-input bg lettering md-font">
          </div>
        </div>

        <div class="description-section lettering md-font">
          <div class="description-label">Descrição</div>
          <textarea type="text" :value="getDescription" class="description-input lettering sm-font" rows="5" @change="onChangeDescription"></textarea>
        </div>

        <div class="row-header">
          <div class="section-header sessions lettering bg-md-font">Horário</div>
        </div>

        <div class="row">
          <div class="column">
            <div class="column-label lettering md-font">Dia*</div>
            <input type="date" @change="onChangeDate" :value="getDate" class="column-input bg lettering md-font" placeholder=". . / . . / . .">
          </div>
          <div class="column">
            <div class="column-label lettering md-font">Hora*</div>
            <input type="text" @change="onChangeHour" :value="getHour" class="column-input md lettering md-font" placeholder="00:00">
          </div>
        </div>

        <div class="row">
          <div class="column">
            <div class="column-label lettering md-font">Total ingressos*</div>
            <input type="text" :value="getTotalIngressos" @change="onChangeTotalIngressos" class="column-input bg lettering md-font">
          </div>
          <div class="column">
            <div class="column-label lettering md-font">Liberado ingressos extra</div>
            <input type="checkbox" @change="toggleIngressoExtra" :value="isLiberadoExtra" class="room-form-input-checkbox" :checked="isLiberadoExtra">
          </div>
        </div>

        <div class="row">
          <div class="column">
            <div class="column-label lettering md-font">Ingressos extra*</div>
            <input type="text" :value="getIngressoExtra" @change="onChangeIngressoExtra" class="column-input bg lettering md-font">
          </div>
        </div>

        <div class="row">
          <div class="column">
            <div class="">
              <span>Foram vendidos: {{getSalesQuantity}}</span>
            </div>
          </div>
          <div class="column">
            <div class="">
              <span>Foram vendidos: R${{getSalesTotal}}</span>
            </div>
          </div>
        </div>

      </div>

      <div class="show-footer reverse-gradient-bg">
        <button class="lettering right-button" @click="back()">CANCELAR</button>
        <button class="cancel-button lettering right-button" @click="save()">SALVAR</button>
      </div>
    </div>
  </div>
</template>

<script>

import store from "../store/store.js"
import router from "../router/index.js"
import * as Actions from "./ShowActions"
import * as Getters from "./ShowGetters"
import { mapActions, mapGetters } from "vuex"

export default {
  router,
  store,
  name: "Show",
  computed: {
    ...mapGetters({
      getTitle: Getters.GET_TITLE,
      getRoom: Getters.GET_ROOM,
      getDescription: Getters.GET_DESCRIPTION,
      getPrice: Getters.GET_PRICE,
      getTrupe: Getters.GET_TRUPE,
      getHour: Getters.GET_HOUR,
      getDate: Getters.GET_DATE,
      getAvaiableRooms: Getters.GET_AVAIABLE_ROOMS,
      getIngressoExtra: Getters.GET_INGRESSO_EXTRA,
      getHourPreventiva: Getters.GET_HORA_PREVENTIVA,
      getTotalIngressos: Getters.GET_TOTAL_INGRESSOS,
      isLiberadoExtra: Getters.LIBERADO_EXTRA,
      getSalesQuantity: Getters.SALES_QUANTITY,
      getSalesTotal: Getters.SALES_TOTAL
    })
  },
  methods: {
    ...mapActions({
      onChangeDate: Actions.ON_CHANGE_DATE,
      onChangeHour: Actions.ON_CHANGE_HOUR,
      onChangeTitle: Actions.ON_CHANGE_TITLE,
      onChangeRoom: Actions.ON_CHANGE_ROOM,
      onChangePrice: Actions.ON_CHANGE_PRICE,
      onChangeDescription: Actions.ON_CHANGE_DESCRIPTION,
      onChangeTrupe: Actions.ON_CHANGE_TRUPE,
      onChangeQRCode: Actions.ON_CHANGE_QRCODE,
      onChangeTotalIngressos: Actions.ON_TOTAL_INGRESSOS,
      onChangeIngressoExtra: Actions.ON_CHANGE_ING_EXTRA,
      onChangeHourPreventiva: Actions.ON_CHANGE_HOUR_PREVENTIVA,
      toggleIngressoExtra: Actions.ON_LIBERADO_EXTRA ,
      save: Actions.SAVE_SHOW
    }),
    back: () => router.go(-1)
  },
  created: () => {
    store.dispatch(Actions.GET_SHOW, router.history.current.params)
  }
}
</script>

<style lang="css" scoped>

.show-content-wrapper {
  width: 100%;
  height: 100%;
}

.show-content {
  width: 80%;
  max-width: 750px;
  height: 80%;
  background-color: white;
}

.show-header {
  height: 10%;
  width: 100%;
  color: white;
}

.show-middle {
  height: 90%;
  width: 100%;
}

.show-footer {
  height: 10%;
  width: 100%;
  padding-top: 3%;
  padding-bottom: 3%;
}

.row {
  width: 100%;
  height: 10%;
  display: flex;
}

.row-header {
  width: 100%;
  height: 7%;
  padding: 1%;
  color: #7252bf;
}

.column {
  width: 50%;
  height: auto;
  display: flex;
  padding: 1%;
}

.column.sm {
  width: 20%;
}

.column.md {
  width: 50%;
}

.column.bg {
  width: 70%;
}

.column-label {
  width: 20%;
}

.session-header {
  width: 100%;
  height: 10%;
}

.second-img {
  margin-left: 40px;
}

.column-input {
  width: 50%;
  border: #ddd solid 1px;
  border-radius: 3px;
  height: 70%;
  font-size: 18px;
  font-weight: 400;
  margin-left: 2%;
  padding-left: 3%;
  text-align: left;
}

.room-form-input-checkbox {
  width: 25px;
  height: 25px;
}

.column-input.sm {
  width: 30%;
}

.column-input.md {
  width: 50%;
}

.description-label {
  margin-left: 1%;
}

.description-input {
  width: 98%;
  margin: 1%;
  padding: 1%;
  border: #ddd solid 1px;
  border-radius: 3px;
}

.column-input.bg {
  width: 70%;
}

.sm-button {
  width: 5%;
  height: 50%;
  border-radius: 3px;
  margin: 1%;
}

.add-button:hover {
  background-color: #1274c9;
}

.remove-button {
  height: 60%;
  margin-top: 2%;
}

.remove-button:hover {
  background-color: #d63e3e;
}

.sessions-list {
  width: 98%;
  height: 30%;
  padding: 1%;
  margin: 1%;
  border: #ddd solid 1px;
  border-radius: 3px;
  overflow-y: scroll;
}

.session-button-wrapper {
  width: 80%;
}

.session-row {
  width: 100%;
  height: 30%;
  display: flex;
  padding-bottom: 1%;
  border-bottom: #ddd solid 1px;
}

.session-item-title {
  width: 20%;
  margin-top: 1%;
  border-right: #ddd solid 1px;
}

.cancel-button {
  background-color: white;
  color: black;
}

</style>
