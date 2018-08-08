import MockRepository from "../mock/MockRepository"
import store from "../store/store.js"
import * as StoreGetters from "../store/Getters"

export const getTickets = () => {
  let shows = store.getters[StoreGetters.GET_SHOWS]
  let format = date => date.split("-").reverse().join('/')
  let withoutreduce = shows.map(show => {
      return {
        id: show.id,
        title: show.title,
        session: `${format(show.date)} - ${show.hour}`
      }
  })
  return withoutreduce
}
