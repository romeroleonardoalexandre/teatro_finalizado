import * as Getters from "./AdminGetters.js"
import * as Actions from "./AdminActions.js"
import * as Mutations from "./AdminMutations.js"
import * as Areas from "./AdminAreas.js"
import * as AdminService from "./AdminService.js"
import router from "../router/index.js"

export default {

  state: {
    area: Areas.SHOWS,
    itens: {}
  },

  actions: {
    [Actions.LOAD_ITENS] : (store) => {
      AdminService.loadItens(store.state.area).then(response => {
        store.commit(Mutations.LOAD_ITENS, {
          area: store.state.area,
          itens: response
        })
      })
    },
    [Actions.SELECT_AREA] : (state, area) => {
      state.commit(Mutations.SELECT_AREA, {area})
      state.dispatch(Actions.LOAD_ITENS)
    },
    [Actions.GO_TO]: ({state}, {_id}) => {
      let path = AdminService.getPath(state.area)
      router.push({path: `/${path}/${_id}`})
    }
  },

  getters: {
    [Getters.IS_USERS] : state => state.area == Areas.USERS,
    [Getters.IS_SHOWS] : state => state.area == Areas.SHOWS,
    [Getters.IS_TRUPES] : state => state.area == Areas.TRUPES,
    [Getters.IS_ROOMS] : state => state.area == Areas.ROOMS,
    [Getters.GET_ITENS] : state => state.itens[state.area],
    [Getters.GET_TITLE] : state => {
      switch (state.area) {
        case Areas.SHOWS:
          return "Shows"
        case Areas.USERS:
          return "Usuários"
        case Areas.ROOMS:
          return "Salas"
        case Areas.TRUPES:
          return "Trupes"
        default:
          return ""
      }
    }
  },

  mutations: {
    [Mutations.SELECT_AREA] : (state, newState) => state.area = newState.area,
    [Mutations.LOAD_ITENS] : (state, newState) => {
      state.itens[newState.area] = newState.itens
    }
  }

}
