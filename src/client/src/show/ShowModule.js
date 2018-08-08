import * as StoreMutations from "../store/Mutations"
import * as Actions from "./ShowActions"
import * as Getters from "./ShowGetters"
import * as Mutations from "./ShowMutations"
import * as ShowService from "./ShowService.js"
import * as RoomService from "../room/RoomService.js"
import * as TicketsType from '../tickets/TicketsType'
import router from "../router/index.js"

export default {

  state: {
    id: 0,
    title: "",
    room: 0,
    hour: "",
    date: "",
    file: {},
    trupe: "",
    liberadoExtra: false,
    ingressosExtra: 0,
    avaiableRooms: [],
    description: "",
    totalIngressos: 500,
    sales: []
  },

  actions: {
    [Actions.GET_SHOW] : (store, {id}) => {
      RoomService.getRooms().then(response => {
        let avaiableRooms = response.map(room => {
          return {
            value: room._id,
            desc: room.title
          }
        })
        let newState = {}
        newState.avaiableRooms = avaiableRooms
        if(avaiableRooms && avaiableRooms.length> 0) {
          newState.room = avaiableRooms[0].value
        }
        store.commit(Mutations.UPDATE_STATE, newState)
      })
      if(id != 0) {
        ShowService.loadShow(id).then(response => {
          store.commit(Mutations.UPDATE_STATE, response)
        })
      }
    },
    [Actions.ON_CHANGE_DATE] : (store, event) => {
      let date = event.target.value
      store.commit(Mutations.UPDATE_STATE, {date})
    },
    [Actions.ON_CHANGE_HOUR] : (store, event) => {
      let hour = event.target.value
      store.commit(Mutations.UPDATE_STATE, {hour})
    },
    [Actions.ON_CHANGE_TITLE] : (store, event) => {
      let title = event.target.value
      store.commit(Mutations.UPDATE_STATE, {title})
    },
    [Actions.ON_LIBERADO_EXTRA] : store => {
      let liberadoExtra = !store.state.liberadoExtra
      store.commit(Mutations.UPDATE_STATE, {liberadoExtra})
    },
    [Actions.ON_CHANGE_ROOM] : (store, event) => {
      let room = event.target.value
      store.commit(Mutations.UPDATE_STATE, {room})
    },
    [Actions.ON_CHANGE_PRICE] : (store, event) => {
      let price = event.target.value
      store.commit(Mutations.UPDATE_STATE, {price})
    },
    [Actions.ON_CHANGE_DESCRIPTION] : (store, event) => {
      let description = event.target.value
      store.commit(Mutations.UPDATE_STATE, {description})
    },
    [Actions.ON_CHANGE_TRUPE] : (store, event) => {
      let trupe = event.target.value
      store.commit(Mutations.UPDATE_STATE, {trupe})
    },
    [Actions.ON_CHANGE_ING_EXTRA] : (store, event) => {
      let ingressosExtra = event.target.value
      store.commit(Mutations.UPDATE_STATE, {ingressosExtra})
    },
    [Actions.ON_TOTAL_INGRESSOS] : (store, event) => {
      let totalIngressos = event.target.value
      store.commit(Mutations.UPDATE_STATE, {totalIngressos})
    },
    [Actions.ON_CHANGE_HOUR_PREVENTIVA] : (store, event) => {
      let horaPreventiva = event.target.value
      store.commit(Mutations.UPDATE_STATE, {horaPreventiva})
    },
    [Actions.ON_CHANGE_QRCODE] : (store, event) => {
      var preview = document.querySelector('img');
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();

      reader.onloadend = () => {
        preview.src = reader.result;
        store.commit(Mutations.UPDATE_STATE, {file: reader.result})
      }
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = "";
      }
    },
    [Actions.SAVE_SHOW] : store => {
      let newShow = {
        title: store.state.title,
        room: store.state.room ? store.state.room : (store.state.avaiableRooms.length > 0 ? store.state.avaiableRooms[0] : 0),
        hour: store.state.hour,
        date: store.state.date,
        trupe: store.state.trupe,
        totalIngressos: store.state.totalIngressos,
        ingressosExtra: store.state.ingressosExtra,
        liberadoExtra: store.state.liberadoExtra,
        description: store.state.description
      }
      if(store.state._id) {
        newShow._id = store.state._id
      }
      ShowService.saveShow(newShow)
      store.commit(Mutations.CLEAN, {})
      router.go(-1)
    }
  },

  getters: {
    [Getters.GET_TITLE] : state => state.title,
    [Getters.GET_ROOM] : state => state.room,
    [Getters.GET_PRICE] : state => state.price,
    [Getters.GET_DESCRIPTION] : state => state.description,
    [Getters.GET_TRUPE] : state => state.trupe,
    [Getters.GET_HOUR] : state => state.hour,
    [Getters.GET_DATE] : state => state.date,
    [Getters.GET_AVAIABLE_ROOMS] : state => state.avaiableRooms,
    [Getters.GET_INGRESSO_EXTRA] : state => state.ingressosExtra,
    [Getters.GET_HORA_PREVENTIVA] : state => state.horaPreventiva,
    [Getters.GET_TOTAL_INGRESSOS] : state => state.totalIngressos,
    [Getters.LIBERADO_EXTRA] : state => state.liberadoExtra,
    [Getters.SALES_QUANTITY] : state => state.sales.map(sales => sales.tickets.length).reduce((a, b) => a + b, 0),
    [Getters.SALES_TOTAL] : state => state.sales.map(sales => {
      let total = sales.tickets.map(ticket => {
        let price = 0
        switch (ticket.type) {
          case TicketsType.INTEIRA:
            price = 20
            break
          case TicketsType.MEIA:
            price = 10
            break
          case TicketsType.PROMOCIONAL:
          case TicketsType.CORTESIA:
          case TicketsType.INTEGRANTE:
            price = 0
            break
          default:
            price = state.price
        }
        return price.toFixed(2)
      }).reduce((a, b) => (+a) + (+b), 0)
      return total
    }).reduce((a, b) => a + b, 0)
  },

  mutations: {
    [Mutations.UPDATE_STATE] : (state, newState) => Object.assign(state, newState),
    [Mutations.CLEAN] : (state, ignore) => {
      state = {
        title: "",
        room: "",
        hour: "",
        date: "",
        price: "",
        trupe: "",
        description: "",
        sessions: []
      }
    }
  }

}
