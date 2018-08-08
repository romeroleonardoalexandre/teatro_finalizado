import * as TicketsType from "../tickets/TicketsType"
import MockRepository from "../mock/MockRepository"
import store from "../store/store.js"
import * as StoreGetters from "../store/Getters"
import axios from "../axiosInstance"

const checkTicket = (newBuy) => {
  return {
    status: newBuy.tickets[TicketsType.INTEIRA] < 5 ? 200 : 500
  }
}

export const save = (newBuy) => {
  let ticketResponse = checkTicket(newBuy)
  return ticketResponse
}

export const getTickets = id => {
  let show = store.getters[StoreGetters.GET_SHOWS].find(show => show.id == id)
  let room = store.getters[StoreGetters.GET_ROOMS].find(room => room.id == show.room)
  let solds = store.getters[StoreGetters.GET_SOLDS].filter(sold => sold.sessionId = id)
  let soldSeats = solds.map(sold => sold.seats).reduce((arr1, arr2) => [...arr1, ...arr2], [])
  soldSeats.forEach(s => s.type = TicketsType.INDISPONIVEL)
  show.configSeats = [...room.selectedSeats, ...soldSeats]
  return show
}

export const sell = sale => {
  axios({
    method: 'post',
    url: '/sell',
    data: sale
  })
}

//regra de % antes do show
//novos tipos de ingresso
//configurar salas
//salas sem lugar
//ingressos sem lugar marcado -> folga
