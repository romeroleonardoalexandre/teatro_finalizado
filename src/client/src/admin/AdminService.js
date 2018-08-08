import MockRepository from "../mock/MockRepository"
import store from "../store/store.js"
import * as StoreGetters from "../store/Getters"
import * as Areas from "./AdminAreas.js"
import axios from "../axiosInstance"

const getGetter = area => {
  switch (area) {
    case Areas.SHOWS:
      return StoreGetters.GET_SHOWS
    case Areas.USERS:
      return StoreGetters.GET_USERS
    case Areas.TRUPES:
      return StoreGetters.GET_TRUPES
    case Areas.ROOMS:
      return StoreGetters.GET_ROOMS
    default:
      return StoreGetters.GET_SHOWS
  }
}

let loadItensFn = (url) => {
  return axios({
    url: url,
    method: 'get'
  }).then(resp => resp.data)
}

export const loadItens = (area) => {
  switch (area) {
    case Areas.SHOWS:
      return loadItensFn('/shows')
    case Areas.USERS:
      return loadItensFn('/users')
    case Areas.TRUPES:
      return loadItensFn('/trupes')
    case Areas.ROOMS:
      return loadItensFn('/rooms')
    default:
      return loadItensFn('/shows')
  }
}

export const getPath = (area) => {
  switch(area) {
    case Areas.SHOWS:
      return "show"
    case Areas.USERS:
      return "user"
    case Areas.TRUPES:
      return "trupe"
    case Areas.ROOMS:
      return "room"
    default:
      return "show"
  }
}
