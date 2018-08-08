import MockRepository from "../mock/MockRepository"
import * as Areas from "../admin/AdminAreas"
import store from "../store/store.js"
import * as StoreGetters from "../store/Getters"
import axios from "../axiosInstance"

export const loadRoom = id => {
  console.log(id)
  return axios({
    url: '/getroom',
    method: 'post',
    data: {
      id: id
    }
  }).then(resp => resp.data)
}

export const getRooms = () => {
  return axios({
    url: '/rooms',
    method: 'get'
  }).then(resp => resp.data)
}

export const saveRoom = room => {
  return axios({
    url: '/room',
    method: 'post',
    data: room
  })
}

export const deleteRoom = id => {
  return axios({
    url: '/room',
    method: 'delete',
    data: {
      id: id
    }
  })
}
