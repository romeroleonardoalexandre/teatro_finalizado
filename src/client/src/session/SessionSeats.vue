<template>
    <div>
        <div class="seats center-block" align="center">
            <div class="row-table">
                <div class="text-right cell" style="right:12px"></div>
                <div class="text-right cell" style="right:12px"  v-for="(charr) in cols"><h4>{{charr}}</h4></div>
            </div>
            <div class="row-table" v-for="(line, index) in lines">
                <div class="cell" style="float: right">{{alphabet[index]}}</div>
                <session-seat :isAdmin="parentIsAdmin" :getSeatIndisponivelGetter="getSeatIndisponivelParent" v-on:deselectedSeat="deselectedSeat($event)" :getSelectedSeat="getSelectedSeatParent" v-on:selectedSeat="selectedSeat($event)" v-for="(col, index2) in cols" :key="col" :positions="[index,index2]"></session-seat>
            </div>
        </div>
    </div>
</template>

<script>
import SessionSeat from './SessionSeat';
import TicketsModule from '../tickets/TicketsModule';
import TicketsType from '../tickets/TicketsType';
import {mapGetters, mapActions} from "vuex"
import { EventBus } from '../Event-bus';

export default {
components: { SessionSeat },
    name: 'seats',
    props: ["getSeatIndisponivelParent", "parentIsAdmin", "selectedSeatParent", "deselectedSeatParent", "getSelectedSeatParent"],
    data () {
        return {
            lines:26,
            selectStatus:"",
            cols:45,
            alphabet:[...Array(26)].map((val, i) => String.fromCharCode(i + 65)),
            seatsIndisponiveisGetter: this.getSeatIndisponivelGetter
        }
    },
    methods: {
        selectedSeat:function(event){
          if(this.selectedSeatParent) this.selectedSeatParent(event)
          this.$emit('selectedSeatEmit',event)
        },
        deselectedSeat:function(event){
          if(this.deselectedSeatParent) this.deselectedSeatParent(event)
          this.$emit('deselectedSeat',event)
        },
        setStatusSelect:function(payload){
            this.selectStatus = payload
        },
        getSelectStatus:function(){
            return this.selectStatus
        },
        getLayout: function(){
            return this.$route.path.match(/\/room\/[\d]+\/seats*/)
        },
    },
    mounted () {
      this.height = this.height
      EventBus.$on('changeStatus', this.setStatusSelect);
    },
    beforeDestroy(){
        EventBus.$off("changeStatus", this.setStatusSelect);
    }

}
</script>

<style lang="scss">

.seats{
  display:table;
//   margin: 1%;
}

.row-table{
  display:table-row;
}

.cell{
  display:table-cell;
  width: 20px;
  height: 20px;
  border: 1px solid black;
}
</style>
