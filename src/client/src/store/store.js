import TicketsModule from "../tickets/TicketsModule"
import SessionModule from "../session/SessionModule"
import AdminModule from "../admin/AdminModule"
import ShowModule from "../show/ShowModule"
import RoomModule from "../room/RoomModule"
import UserModule from "../user/UserModule"
import SeatModule from "../seat/SeatModule"
import * as Mutations from "./Mutations"
import * as Getters from "./Getters"
import * as Actions from "./Actions"
import * as Utils from "./StoreUtils"
import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    trupes: [],
    users: [],
    rooms: [],
    shows: [],
    solds: [],
    currentSale: []
  },

  actions: {
  },

  getters: {
    [Getters.GET_TRUPES] : state => state.trupes,
    [Getters.GET_ROOMS] : state => state.rooms,
    [Getters.GET_USERS] : state => state.users,
    [Getters.GET_SHOWS] : state => state.shows,
    [Getters.GET_SOLDS] : state => state.solds,
    [Getters.CURRENT_SALE] : state => {
      if(state.currentSale && state.currentSale.length > 0) {
        return state.currentSale.map(sale => sale.tickets.map(ticket => {
          ticket.title = sale.title
          ticket.session = sale.session
          ticket.roomTitle = sale.roomTitle.slice(0,28)
          ticket.id = sale.show.slice ? sale.show.slice(0,2) : ""
          return ticket
        })).reduce((arr1, arr2) => [...arr1, ...arr2], [])
      }
      return []
    },
    [Getters.SALE] : state => state.currentSale,
    [Getters.SALE_BY_SHOW] : state => show => {
      let sale = state.currentSale.find(s => s.show == show)
      if(sale) {
        return sale.tickets
      } else {
        return []
      }
    },
    [Getters.ITENS_ON_CARRINHO] : state => {
      return state.currentSale.map(sale => sale.tickets.map(ticket => {
        ticket.title = sale.title
        ticket.session = sale.session
        return ticket
      })).reduce((arr1, arr2) => [...arr1, ...arr2], []).length
    }
  },

  mutations: {
    [Mutations.ADD_SHOW] : (state, show) => state.shows.push(show),
    [Mutations.ADD_TRUPE] : (state, trupe) => state.trupes.push(trupe),
    [Mutations.ADD_USER] : (state, user) => state.users.push(user),
    [Mutations.ADD_ROOM] : (state, room) => state.rooms.push(room),
    [Mutations.ADD_SOLD] : (state, sold) => state.solds.push(sold),
    [Mutations.ADD_TO_CURRENT_SALE] : (state, sale) => {
      debugger
      let index = state.currentSale.map(s => s.show).indexOf(sale.show)
      if(index == -1) {
        state.currentSale.push(sale)
      } else {
        debugger
        state.currentSale[index].tickets = sale.tickets
      }
    },
    [Mutations.REMOVE_TO_CURRENT_SALE] : (state, sale) => {
      let index = state.currentSale.map(s => s.show).indexOf(sale.show)
      state.currentSale.splice(index, 1)
    },
    [Mutations.CLEAN_CURRENT_SALE]: (state, ignore) => state.currentSale = []
  },

  modules: {
    tickets: TicketsModule,
    session: SessionModule,
    admin: AdminModule,
    show: ShowModule,
    room: RoomModule,
    user: UserModule,
    seat: SeatModule
  }

})
