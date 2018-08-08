<template id="session-footer">
  <div class="session-area footer">
    <div class="tickets-select-wrapper">
      <div class="tickets-selection md-font">
        <span>Cadeiras selecionadas: </span>
        <div style="display:table-row">
            <div v-for="seat in getSelectedSeats" class="seat">
                <div class="seat-number">
                  <p>{{seat.y+1}}:{{seat.x}}</p>
                </div>
            </div>
        </div>
      </div>
      <div class="row">
        <button class="save-button lettering purple-bg" @click="sell()">VENDER</button>
      </div>
    </div>
  </div>
</template>

<script>

import 'vuetify/dist/vuetify.min.css'
import PrettyRadio from 'pretty-checkbox-vue/radio'
import { mapActions, mapGetters } from "vuex"
import * as TicketsType from '../tickets/TicketsType'
import * as Actions from './SessionAction'
import * as Getters from './SessionGetter'
import * as Utils from "../components/Utils"
import { EventBus } from '../Event-bus';

export default {
  name: "SessionFooter",
  props:["selected"],
  components:{
    PrettyRadio
  },
  data: () => {
    return {
      tickets: {},
      currentStatus:"",
      getters: Getters,
      seats:[],
      alphabet:["", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"]
    }
  },
  computed : {
      ...mapGetters({
        getTicketsNumber: Getters.TICKETS_NUMBER,
        getSelectedSeats: Getters.SELECTED_SEATS
      }),
      ticketsType : () => {
        return Object.keys(TicketsType)
      },
      generateNumber: () => {
        let arr = []
        for (var i = 1; i < 48; i++) {
          arr.push(i)
        }
        return arr
      }
  },
  watch:{
      selected:function(value){
          this.seats = value;
      },
      currentStatus:function(value){
          EventBus.$emit('changeStatus', value);
      }
  },
  methods: {
    ...mapActions({
      sell: Actions.SELL,
      onSelect: Actions.TICKET_SELECTED
    })
  }
}
</script>

<style lang="css" scoped>

.ticket-type-title {
  height: 40px;
  width: 20%;
  margin-right: 20px;
}

.tickets-selection {
  width: 100%;
  height: 10%;
}

.tickets-selection-input {
  width: 60%;
  border: #ddd solid 1px;
  border-radius: 3px;
  height: 100%;
  font-size: 18px;
  font-weight: 400;
}

.ticket-type-select {
  width: 10%;
  border: #ddd solid 1px;
  border-radius: 3px;
}

.ticket-type-select:hover {
  border-color: #ccc;
}

.tickets-type-wrapper {
  display: flex;
  margin-bottom: 10px;
}

.tickets-type-select-wrapper {
  height: 8 0%;
  width: 100%;
  padding: 20px;
}

.tickets-select-wrapper{
  height: 100%;
  width: 100%;
  margin-left: 3%;
}

.session-area {
  width: 100%;
}

.save-button {
  margin-top: -30px;
  height: 35px;
  width: 100px;
  color: white;
  border-radius: 10px !important;
  float: right;
  color: white;
  background-color: #00549A;
  margin-right: 10px;
}

.seat{
    display:table-cell;
    float:left;
    width:40px;
    height:40px;
    text-align: -webkit-center;
    vertical-align: middle;
}

.seat-number{
    background-color:#41B883;
    width:30px;
    height:30px;
    border-radius:5px;
}

.seat p{
  color:	 #63636d;
  padding-top:5px;

}

.radios{
  display: block;
  margin-top: 10px;
}
</style>
