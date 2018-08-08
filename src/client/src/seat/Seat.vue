<template>
    <div class="seat text-center" :style="{ backgroundColor: getBackgroundColor, opacity:0.7}" @click="toggleSelect()">
        <img src="../resources/seat.png" class="seat-image">
    </div>
</template>

<script>

import * as Actions from "./SeatActions"
import * as Getters from "./SeatGetters"
import SeatTypes from "./SeatTypes"
import {mapGetters, mapActions} from "vuex"

export default {
    props:['initialPosition','status'],
    name: 'Seat',
    data () {
      return  {
        position:{
            x:0,
            y:0
        },
      }
    },
    mounted:function(){
        this.position = Object.assign({}, this.initialPosition)
    },
    methods:{
      ...mapActions({
        toggleSelect: Actions.TOGGLE_SELECT
      }),
	},
  computed: {
    ...mapGetters({
      getSeat: Getters.GET_SEAT,
      getSeatTypes: Getters.SEAT_TYPES
    }),
    getBackgroundColor: () => {
      let seat = this.getSeat(this.position.x, this.position.y)
      return this.getSeatTypes(seat.type).color
    }
  }
}
</script>

<style scoped>

.seat{
    display:table-cell;
    height: 50px;
}

.seat-image{
  height: 100%;
}

</style>
