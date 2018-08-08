import * as Actions from "./TicketsAction"
import * as Mutations from "./TicketsMutation"
import * as Getters from "./TicketsGetter"
import router from "../router/index.js"
import * as TicketsService from "./TicketsService.js"
import * as ShowService from "../show/ShowService"
import moment from "moment"

export default {

  state: {
    sessions: []
  },

  actions : {
    [Actions.GO_TO] : (context, id) => {
      router.push({path: `/session/${id}`})
    },
    [Actions.GET_TICKETS] : (context) => {
      ShowService.loadShows().then(response => {
        let format = date => date.split("-").reverse().join('/')
        let withoutreduce = response.filter(show => {
          let dia = moment() .date()
          let hora = moment().hour()
          let minuto = moment().minute()
          let horaShow = show.hour.slice(0,2)
          let minutoShow = show.hour.slice(3,5)
          let diaShow = show.date.slice(8, 10)
          if(dia == diaShow) {
            if(hora < horaShow) {
              return true
            } else if (hora == horaShow) {
              if(minuto <= minutoShow) {
                return true
              }
            }
          }
          if(dia < diaShow) {
            return true
          }
          return false
        }).map(show => {
            return {
              id: show._id,
              title: show.title,
              session: `${format(show.date)} - ${show.hour}`
            }
        })
        context.commit(Mutations.UPDATE_TICKETS, {sessions: withoutreduce})
      })
      // let sessions = TicketsService.getTickets()
      // context.commit(Mutations.UPDATE_TICKETS, {sessions})
    }
  },

  getters: {
    [Getters.SESSIONS] : state => {
      let cards = state.sessions.map(s => {
        s.session
      })
      return state.sessions
    }
  },

  mutations: {
    [Mutations.UPDATE_TICKETS] : (state, payload) => {
      state.sessions = payload.sessions
    }
  }


}
