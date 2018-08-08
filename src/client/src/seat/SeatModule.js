import * as Actions from "./SeatActions"
import * as Getters from "./SeatGetters"
import * as Mutations from "./SeatMutations"

export default {

  state: {
    cols: 5,
    rows: 4,
    seats: []
  },

  actions: {
    [Actions.TOGGLE_SELECT] : (state, position) => state.commit(Mutations.TOGGLE_SELECT, position)
  },

  getters: {
    [Getters.GET_SEAT] : state => (x, y) => state.seats[x][y],
    [Getters.GET_ROWS] : state => state.rows,
    [Getters.GET_COLS] : state => state.cols
  },

  mutations: {
    [Mutations.TOGGLE_SELECT] : (state, position) => state.seats[position.x][position.y].selected = !state.seats[position.x][position.y].selected
  }

}
