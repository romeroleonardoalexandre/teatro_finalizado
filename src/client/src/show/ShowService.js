import MockRepository from "../mock/MockRepository"
import store from "../store/store.js"
import * as StoreGetters from "../store/Getters"
import * as Areas from "../admin/AdminAreas"
import axios from "../axiosInstance"

export const loadShow = id => {
  return axios({
    url: '/getshow',
    method: 'post',
    data: {
      id: id
    }
  }).then(resp => resp.data)
}

export const loadShows = () => {
  return axios({
    url: '/shows',
    method: 'get'
  }).then(resp => resp.data)
}

export const saveShow = show => {
  return axios({
    url: '/show',
    method: 'post',
    data: show
  })
}

export const deleteShow = id => {
  return axios({
    url: '/show',
    method: 'delete',
    data: {
      id: id
    }
  })
}
