<template>
    <div>
        <div class="seats center-block" align="center">
            <div class="row-table">
                <div class="text-right cell"  v-for="(charr) in alphabet.slice(0, cols + 1)"><h4>{{charr}}</h4></div>
            </div>
            <div class="row-table" v-for="(row, xIndex) in getRows">
                <h3 class="row-header">{{xIndex}}</h3>
                <seat v-for="(col, yIndex) in getCols" :initialPosition="{x: xIndex, y: yIndex}"></seat>
            </div>
        </div>
    </div>
</template>

<script>

import * as Getters from "./SeatGetters"
import * as Actions from "./SeatActions"
import router from "../router/index.js"
import Seat from './Seat'
import store from "../store/store.js"
import { mapActions, mapGetters } from "vuex"

export default {
  components: {
    'seat': Seat
  },
  name: 'Seats',
  data () {
      return {
      }
  },
  computed: {
    ...mapGetters({
      getRows: Getters.GET_ROWS,
      getCols: Getters.GET_COLS
    })
  },
  created: () => {
    store.dispatch(Actions.LOAD_SEAT_MAP, router.history.current.params)
  }

}
</script>

<style lang="scss">

.seats{
  display:table;
}

.row-table{
  display:table-row;
  height: 10px;
}

.row-header {
  display:  table-cell;
  float: right;
  margin-bottom: 20px;
}

.cell{
  display:table-cell;
  right: 12px;
}
</style>
