<template id="room">
  <div class="room-content-wrapper center-content">
    <div class="room-content">
      <div class="room-header reverse-gradient-bg center-content bg-font lettering">
        Cadastro de Sala
      </div>
      <div class="room-middle">
        <div class="seat-map" v-if="hasSeats">
          <seats
            :parentIsAdmin="true"
            :getSelectedSeatParent="seat => false"
            :deselectedSeatParent="deselectedSeat"
            :selectedSeatParent="selectSeat"
            :getSeatIndisponivel="getSeat"></seats>
          <div class="row half">
            <pretty-radio v-model="currentStatus" value="INDISPONIVEL" class="p-switch p-fill radios p-pulse" name="switch1" color="danger">Indisponivel</pretty-radio>
            <pretty-radio v-model="currentStatus" value="CORTESIA" class="p-switch p-fill radios p-pulse" name="switch1" color="primary">Cortesia</pretty-radio>
            <pretty-radio v-model="currentStatus" value="DISPONIVEL" class="p-switch p-fill radios p-pulse" name="switch1" color="#ffffff">Disponivel</pretty-radio>
            <pretty-radio v-model="currentStatus" value="BALCAO" class="p-switch p-fill radios p-pulse" name="switch1" color="#36db5a">Balcão</pretty-radio>
          </div>
        </div>
        <div class="room-form lettering md-font">
          <div class="room-form-row">
            <div class="room-form-row-label left-content">Nome da sala:</div>
            <input type="text" :value="roomTitle" class="room-fom-input" @change="onChangeRoomTitle">
          </div>
          <div class="room-form-row">
            <div class="room-form-row-label left-content">Mapa de assentos:</div>
            <div class="center-content checkbox-wrapper">
              <input type="checkbox" @change="toggleSeatsMap" :value="hasSeats" class="room-form-input-checkbox" :checked="hasSeats">
            </div>
          </div>
        </div>
      </div>
      <div class="room-footer reverse-gradient-bg">
        <button class="lettering right-button" @click="back()">CANCELAR</button>
        <button class="cancel-button lettering right-button" @click="save()">SALVAR</button>
      </div>
    </div>
  </div>
</template>

<script>
import 'vuetify/dist/vuetify.min.css'
import PrettyRadio from 'pretty-checkbox-vue/radio'
import store from "../store/store.js"
import router from "../router/index.js"
import * as Actions from "./RoomActions"
import * as Getters from "./RoomGetters"
import Seats from "./SessionSeats"
import { mapActions, mapGetters } from "vuex"
import { EventBus } from '../Event-bus';

export default {
  router,
  store,
  name: "Room",
  data: () => {
    return {
      currentStatus: ""
    }
  },
  watch:{
      currentStatus:function(value){
          EventBus.$emit('changeStatus', value)
          this.changeCurrentStatus(value)
      }
  },
  components: {
    "pretty-radio" : PrettyRadio,
    "seats": Seats
  },
  methods: {
    ...mapActions({
      save: Actions.SAVE_ROOM,
      onChangeRoomTitle: Actions.ON_CHANGE_ROOM_TITLE,
      onChangeSeatsQuantity: Actions.ON_CHANGE_SEATS_QUANTITY,
      toggleSeatsMap: Actions.TOGGLE_SEATS,
      selectSeat: Actions.SELECT_SEAT,
      deselectedSeat: Actions.DESELECT_SEAT,
      changeCurrentStatus: Actions.CHANGE_CURRENT_STATUS
    }),
    back: () => router.go(-1)
  },
  computed: {
    ...mapGetters({
      hasSeats: Getters.HAS_SEATS,
      seatsQuantity: Getters.SEATS_QUANTITY,
      roomTitle: Getters.ROOM_TITLE,
      selectedSeats: Getters.SELECTED_SEATS,
      getSeat: Getters.GET_SEAT
    })
  },
  created: () => {
    store.dispatch(Actions.CLEAN_ROOM, {})
    store.dispatch(Actions.GET_ROOM, router.history.current.params)
  }
}
</script>

<style lang="css"scoped>

.room-content-wrapper {
  width: 100%;
  height: 100%;
}

.room-content {
  width: 80%;
  max-width: 920px;
  height: 100%;
  over
  background-color: white;
}

.room-header {
  height: 10%;
  width: 100%;
  color: white;
}

.half {
  width: 50%;
}

.room-middle {
  height: 80%;
  width: 100%;
}

.room-footer {
  padding-top: 3%;
  padding-bottom: 3%;
  height: 10%;
  width: 100%;
}

.cancel-button {
  background-color: white;
  color: black;
}

.radios{
  display: block;
  margin-top: 10px;
}

.room-form {
  width: 100%;
  height: 30%;
}

.room-form-row {
  margin: 1%;
  width: 98%;
  height: 25%;
  display: flex;
}

.room-form-row-label {
  width: 30%;
  padding-left:  2%;
}

.room-form-input-checkbox {
  width: 25px;
  height: 25px;
}

.checkbox-wrapper {
  margin-left: 2%;
}

.room-fom-input {
  width: 30%;
  border: #ddd solid 1px;
  border-radius: 3px;
  height: 100%;
  font-size: 18px;
  font-weight: 400;
  margin-left: 2%;
}


</style>
