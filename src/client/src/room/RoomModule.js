import * as Actions from "./RoomActions"
import * as Getters from "./RoomGetters"
import * as StoreMutations from "../store/Mutations"
import * as Mutations from "./RoomMutations"
import * as RoomService from "./RoomService"
import router from "../router/index.js"

export default {

  state: {
    hasSeats: false,
    seatsQuantity: 0,
    selectedSeats: [],
    title: "",
    currentStatus: ""
  },

  actions: {
    [Actions.SAVE_ROOM] : (store) => {
      let newRoom = {
        configSeats: store.state.selectedSeats.filter(s => s.type != "DISPONIVEL"),
        title: store.state.title,
        hasSeats: store.state.hasSeats
      }
      if(store.state._id) {
        newRoom._id = store.state._id
      }
      RoomService.saveRoom(newRoom)
      store.commit(StoreMutations.ADD_ROOM, newRoom)
      store.commit(Mutations.CLEAN, {})
      router.go(-1)
    },
    [Actions.CLEAN_ROOM] : (store, ignore) => store.commit(Mutations.CLEAN, {}),
    [Actions.GET_ROOM] : (store, {id}) => {
      if(id == 0) {
        store.commit(Mutations.CLEAN, {})
        return
      }
      RoomService.loadRoom(id).then(response => {
        response.selectedSeats = response.configSeats
        store.commit(Mutations.GET_ROOM, response)
      })
    },
    [Actions.ON_CHANGE_SEATS_QUANTITY] : ({commit}, event) => {
      commit(Mutations.GET_ROOM, {seatsQuantity: event.target.value})
    },
    [Actions.CHANGE_CURRENT_STATUS] : ({commit}, status) => {
      commit(Mutations.CHANGE_CURRENT_STATUS, status)
    },
    [Actions.TOGGLE_SEATS] : ({commit, state}) => commit(Mutations.TOGGLE_SEATS, !state.hasSeats),
    [Actions.ON_CHANGE_ROOM_TITLE] : ({commit, state}, event) => {
      commit(Mutations.ON_CHANGE_ROOM_TITLE, {title: event.target.value})
    },
    [Actions.SELECT_SEAT] : (store, seat) => {
      let foundSeat = store.state.selectedSeats.find(s => s.x == seat.x && s.y == seat.y)
      if(foundSeat) {
        seat = foundSeat
      }
      if(store.state.currentStatus == "DISPONIVEL" && seat.type == "INDISPONIVEL") {
        seat.type = store.state.currentStatus
        store.commit(Mutations.SELECT_SEAT, seat)
      } else if(store.state.currentStatus == "CORTESIA" || store.state.currentStatus == "INDISPONIVEL" || store.state.currentStatus == "BALCAO") {
        seat.type = store.state.currentStatus
        store.commit(Mutations.SELECT_SEAT, seat)
      }
    },
    [Actions.DESELECT_SEAT] : (state, event) => {
      var index = this._.findIndex(this.selectedSeats, {x: event.x,y:event.y});
      state.commit(Mutations.DESELECT_SEAT, index)
    }
  },

  getters: {
    [Getters.HAS_SEATS] : state => state.hasSeats,
    [Getters.SEATS_QUANTITY] : state => state.seatsQuantity,
    [Getters.ROOM_TITLE] : state => state.title,
    [Getters.GET_SEAT] : state => (x, y) => {
      return state.selectedSeats.find(seat => seat.x == x && seat.y == y)
    }
  },

  mutations: {
    [Mutations.GET_ROOM] : (state, newState) => Object.assign(state, newState),
    [Mutations.TOGGLE_SEATS] : (state, hasSeats) => state.hasSeats = hasSeats,
    [Mutations.ON_CHANGE_ROOM_TITLE] : (state, newState) => state.title = newState.title,
    [Mutations.DESELECT_SEAT] : (state, index) => state.selectedSeats.splice(index, 1),
    [Mutations.SELECT_SEAT] : (state, seat) => state.selectedSeats.push(seat),
    [Mutations.CHANGE_CURRENT_STATUS] : (state, status) => state.currentStatus = status,
    [Mutations.CLEAN] : (state, ignore) => {
      state.id = 0
      state.hasSeats = false
      state.seatsQuantity = 0
      state.selectedSeats = []
      state.title = ""
    }
  }

}
