import * as StoreMutations from "../store/Mutations"
import * as Actions from "./UserActions"
import * as Getters from "./UserGetters"
import * as Mutations from "./UserMutations"
import * as UserService from "./UserService"
import router from "../router/index.js"

export default {

  state: {
    id: 0,
    title: "",
    userPass: "",
    isAdmin: false
  },

  actions: {
    [Actions.GET_USER] : ({commit, state}, id) => {
      let user = UserService.loadUser(id)
      commit(Mutations.UPDATE_STATE, user)
    },
    [Actions.TOGGLE_ADMIN] : ({commit, state}) => {
      commit(Mutations.TOGGLE_ADMIN, !state.isAdmin)
    },
    [Actions.ON_CHANGE_USER_TITLE] : ({commit}, event) => {
      let title = event.target.value
      commit(Mutations.UPDATE_STATE, {title})
    },
    [Actions.ON_CHANGE_USER_PASS] : ({commit}, event) => {
      let userPass = event.target.value
      commit(Mutations.UPDATE_STATE, {userPass})
    },
    [Actions.SAVE_USER] : ({commit, state}) => {
      let newUser = Object.assign({}, state)
      newUser.id = state.id || Math.floor((Math.random() * 10000) + 1)
      commit(StoreMutations.ADD_USER, newUser)
      commit(Mutations.CLEAN, {})
      router.go(-1)
    }
  },

  getters: {
    [Getters.USER_TITLE] : state => state.title,
    [Getters.USER_PASS] : state => state.userPass,
    [Getters.IS_ADMIN] : state => state.isAdmin
  },

  mutations: {
    [Mutations.UPDATE_STATE] : (state, newState) => Object.assign(state, newState),
    [Mutations.TOGGLE_ADMIN] : (state, isAdmin) => state.isAdmin = isAdmin,
    [Mutations.CLEAN] : (state, ignore) => {
      state = {
        title: "",
        userPass: "",
        isAdmin: false
      }
    }
  }

}
