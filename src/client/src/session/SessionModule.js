import Vue from "vue"
import * as StoreMutations from "../store/Mutations"
import * as StoreGetters from "../store/Getters"
import * as Actions from "./SessionAction"
import * as Getters from "./SessionGetter"
import * as Mutations from "./SessionMutation"
import * as ActionsUtil from "../store/Actions.js"
import * as SessionService from "./SessionService"
import * as Utils from "../components/Utils"
import * as TicketsType from '../tickets/TicketsType'
import * as ShowService from "../show/ShowService"
import * as RoomService from "../room/RoomService"
import moment from "moment"
import router from "../router/index.js"

export default {

  state: {
    id: 0,
    tickets: {},
    hasSeats: true,
    takenSeats: [],
    title: "",
    description: "",
    totalSeats: 0,
    date: "",
    price: 0,
    soldSeats: [],
    hour: "",
    selectedSeats: [],
    configSeats: [],
    sale: false,
    postSale: false,
    roomTitle: "",
    parsedImage: "",
    hourReserved: "",
    percentageReserved: 0,
    percentageSaved: 0,
    file: "",
    liberadoExtra: false,
    totalIngressos: 500,
  },

  actions : {
    [Actions.GET_SESSION] : (store, {id}) => {
      if(id == 0) {
        console.log("vsf então")
        store.commit(Mutations.NEW_STATE, {
          postSale: true,
          isSale: false,
          isTicketsSold: false
        })
        return
      }
      ShowService.loadShow(id).then(show => {
        RoomService.loadRoom(show.room).then(room => {
          let soldSeats = []
          if(show.sales) {
            soldSeats = show.sales.map(sold => sold.tickets).reduce((arr1, arr2) => [...arr1, ...arr2], [])
            soldSeats.forEach(s => s.type = TicketsType.INDISPONIVEL)
          }
          // show.configSeats = [...room.configSeats, ...soldSeats]
          // console.log(store.getters[StoreGetters.SALE_BY_SHOW](show._id))
          show.roomTitle = room.title
          show.configSeats = [...room.configSeats, ...soldSeats]
          show.soldSeats
          show.selectedSeats = [...store.getters[StoreGetters.SALE_BY_SHOW](show._id)].map(ticket => {
            return {
              x: ticket.x,
              y: ticket.y
            }
          })
          store.commit(Mutations.NEW_STATE, show)
          store.commit(Mutations.CLEAN_NAVIGATION)
        })
      })
    },
    [Actions.DEFINE_SELECTED_SEATS_INTEIRA] : store => store.commit(Mutations.DEFINE_SELECTED_SEATS_INTEIRA),
    [Actions.LOAD_PARSED_IMAGE] : store => {
      if(store.state.file) {
        var reader  = new FileReader()
        reader.onloadend = () => {
          store.commit(Mutations.PARSED_IMAGE, reader.result)
        }
        reader.readAsDataURL(store.state.file)
      }
    },
    [Actions.SELL] : store => store.commit(Mutations.TOGGLE_SALE, {}),
    [Actions.POST_SALE] : store => {
      let format = date => date.split("-").reverse().join('/')
      store.commit(StoreMutations.ADD_TO_CURRENT_SALE, {
        show: store.state.id,
        title: store.state.title,
        roomTitle: store.state.roomTitle,
        desc: store.state.description,
        session: `${format(store.state.date)} - ${store.state.hour}`,
        tickets: store.state.selectedSeats,
        desc: store.state.description
      }),
      store.commit(Mutations.TOGGLE_POST_SALE, {})
    },
    [Actions.TICKET_SELECTED] : (state, ticketsEvent) => {
      let newTicket = {
        type: ticketsEvent.target.id,
        value: ticketsEvent.target.selectedIndex + 1
      }
      state.commit(Mutations.TICKET, newTicket)
    },
    [Actions.SHOW_IMAGE] : store => {
      let img = document.getElementById('img_teste')
      var reader  = new FileReader();
      reader.onloadend = () => {
        img.src = reader.result;
      }
      reader.readAsDataURL(store.state.file);
    },
    [Actions.SELL_SHOW] : store => {
      let format = date => date.split("-").reverse().join('/')
      store.commit(StoreMutations.ADD_TO_CURRENT_SALE, {
        show: store.state.id,
        title: store.state.title,
        roomTitle: store.state.roomTitle,
        desc: store.state.description,
        session: `${format(store.state.date)} - ${store.state.hour}`,
        tickets: store.state.selectedSeats
      }),
      store.commit(Mutations.CLEAN_STATE, {})
      router.push({path: '/'})
    },
    [Actions.CANCEL_SALE]: store => {
      store.commit(Mutations.CLEAN_STATE, {})
      router.push({path: '/'})
    },
    [Actions.SOLD] : store => {
      SessionService.sell(store.getters[StoreGetters.SALE])
      store.commit(StoreMutations.ADD_SOLD, store.getters[StoreGetters.SALE])
      router.push({path: '/room/:id/tickets/sold'})
    },
    [Actions.SELECT_SEAT] : (store, seat) => {
      let hora = moment().hour()
      let minuto = moment().minute()
      let horaShow = store.state.hour.slice(0,2)
      let minutoShow = store.state.hour.slice(3,5)
      let cortesias = store.state.configSeats.filter((v, i, a) => a.indexOf(a.find(s => s.x == v.x && s.y == v.y)) === i).filter(s => s.type == "CORTESIA").length
      let totalIng = store.state.totalIngressos - cortesias

	//começo regra horas
      if((horaShow - hora) == 2) {
        if((minutoShow - minuto) >= 0) {
          totalIng = totalIng
        }
      } else if ((horaShow - hora) < 2) {
        totalIng = totalIng
      } else {
        totalIng = totalIng * 0.6
      }
	//termino regra horas

      if(store.state.liberadoExtra) {
        totalIng = (+store.state.ingressosExtra) + (+totalIng)
      }

      if((store.state.configSeats.length + store.state.selectedSeats.length) + 1 <= totalIng) {
        store.commit(Mutations.SELECT_SEAT, seat)
      } else {
        alert("Não pode vender mais ingressos")
      }
    },
    [Actions.DESELECT_SEAT] : (store, seat) => {
      debugger
      let selectedSeat = store.state.selectedSeats.find(item => item.x == seat.x && item.y == seat.y)
      let index = store.state.selectedSeats.indexOf(selectedSeat)
      store.commit(Mutations.DESELECT_SEAT, index)
    },
    [Actions.CLEAN_STATE] : store => store.commit(Mutations.CLEAN_STATE),
    [Actions.CHANGE_SEAT_TYPE] : (store, item) => {
      item.type = item.$event.target.value
      store.commit(Mutations.CHANGE_SEAT_TYPE, item)
    }
  },

  getters: {
    [Getters.TICKETS_NUMBER] : (state, getters) => ticketType => {
      let avaiableTickets = state.avaiableTickets
      let getTicketsNumber = type => state.tickets[type] || 0
      let totalAvaiableTickets = avaiableTickets - Object.keys(TicketsType).map(type => getTicketsNumber(type)).reduce((nun1, nun2) => nun1 + nun2)
      return Utils.generateNumberItens(totalAvaiableTickets)
    },
    [Getters.TITLE] : state => state.title,
    [Getters.DESCRIPTION] : state => state.description,
    [Getters.SUB_TITLE] : state => `${state.date} - ${state.hour}`,
    [Getters.HAS_SEATS] : state => state.hasSeats,
    [Getters.SELECTED_SEATS] : state => state.selectedSeats,
    [Getters.TICKETS_TYPE] : state => Object.keys(TicketsType).filter(t => t.toUpperCase() != "INDISPONIVEL"),
    [Getters.GET_SEAT_INDISPONIVEL] : state => (x, y) => {
      return state.configSeats.find(seat => seat.x == x && seat.y == y)
    },
    [Getters.GET_SEAT] : state => (x,y) => {
      let configseat = state.configSeats.find(seat => seat.x == x && seat.y == y)
      if(configseat) {
        return configseat
      }
      let seat = state.selectedSeats.find(seat => seat.x == x && seat.y == y)
      if(seat) {
        seat.type = "OCUPADO"
        return seat
      }
      return {
        type: "DISPONIVEL"
      }
    },
    [Getters.IS_MESANINO] : state => ticket => {
      let seat = state.configSeats.find(s => s.x == ticket.x && s.y == ticket.y)
      debugger
      if(seat) {
        return seat.type = "BALCAO"
      }
      return false
    },
    [Getters.IS_SALE] : state => state.sale,
    [Getters.IS_POST_SALE] : state => state.postSale,
    [Getters.IS_SELECTED_SEAT] : state => (x, y) => state.selectedSeats.find(seat => seat.x == x && seat.y == y),
    [Getters.QR_CODE] : state => state.file,
    [Getters.HOUR] : state => state.hour,
    [Getters.DATE] : state => state.date,
    [Getters.IMAGE] : state => state.file,
    [Getters.IS_MESANINO] : state => ticket => {
      let balcao = state.configSeats.filter(s => s.type == "BALCAO").find(s => s.x == ticket.x && s.y == ticket.y)
      return balcao
    },
    [Getters.GET_PARSED_IMAGE] : state => state.parsedImage,
    [Getters.PRICE] : state => seat => {
      let price = 0
      switch (seat.type) {
        case TicketsType.INTEIRA:
          price = state.price || 0
          break
        case TicketsType.MEIA:
          price = (state.price || 0) / 2
          break
        case TicketsType.PROMOCIONAL:
        case TicketsType.CORTESIA:
	  price = 0
	  break
        case TicketsType.INTEGRANTE:
          price = 0
          break
        default:
          price = state.price
      }
      return price.toFixed(2)
    },
    [Getters.QNTY_SEATS] : state => {
      return state.totalIngressos - (state.selectedSeats.length + state.configSeats.length )
    }
  },

  mutations: {
    [Mutations.TICKET] : (state, newTicket) => {
      Vue.set(state.tickets, newTicket.type, newTicket.value)
    },
    [Mutations.NEW_STATE] : (state, newState) => {
      state.id = newState._id ? newState._id : 0
      state.hasSeats = newState.hasSeats ? newState.hasSeats : true
      state.title = newState.title ? newState.title : ""
      state.selectedSeats = newState.selectedSeats ? newState.selectedSeats : []
      state.description = newState.description ? newState.description : ""
      state.date = newState.date ? newState.date : ""
      state.hour = newState.hour ? newState.hour : ""
      state.roomTitle = newState.roomTitle
      state.configSeats = newState.configSeats ? newState.configSeats : []
      state.file = newState.file ? newState.file : ""
      state.totalIngressos = newState.totalIngressos ? newState.totalIngressos : 0
      state.ingressosExtra = newState.ingressosExtra ? newState.ingressosExtra : 0
      state.liberadoExtra = newState.liberadoExtra
      state.postSale = newState.postSale ? newState.postSale : false
    },
    [Mutations.DESELECT_SEAT] : (state, index) => state.selectedSeats.splice(index, 1),
    [Mutations.SELECT_SEAT] : (state, seat) => state.selectedSeats.push(seat),
    [Mutations.CLEAN_STATE] : state => {
      state.tickets = {},
      state.hasSeats = true,
      state.takenSeats = [],
      state.avaiableTickets = 99,
      state.title = "",
      state.description = "",
      state.date = "",
      state.price = 0,
      state.hour = "",
      state.selectedSeats = [],
      state.configSeats = [],
      state.sale = false,
      state.postSale = false,
      state.parsedImage = "",
      state.file = ""
    },
    [Mutations.CLEAN_NAVIGATION] : state => {
      state.sale = false
      state.postSale = false
    },
    [Mutations.PARSED_IMAGE] : (state, parsedImage) => state.parsedImage = parsedImage,
    [Mutations.TOGGLE_SALE] : (state, ignore) => state.sale = !state.sale,
    [Mutations.TOGGLE_POST_SALE] : (state, ignore) => state.postSale = !state.postSale,
    [Mutations.CHANGE_SEAT_TYPE] : (state, item) => {
      state.selectedSeats.forEach(seat => {
        if(seat.x == item.item.x && seat.y == item.item.y) {
          seat.type = item.type
        }
      })
    },
    [Mutations.DEFINE_SELECTED_SEATS_INTEIRA] : state => {
      state.selectedSeats.forEach(seat => seat.type = TicketsType.INTEIRA)
    }
  }

}
