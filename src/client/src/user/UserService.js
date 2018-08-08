import store from "../store/store.js"
import * as StoreGetters from "../store/Getters"

export const loadUser = id => {
  return store.getters[StoreGetters.GET_USERS].find(user => user.id == id)
}
