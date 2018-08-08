<template>
    <div class="seat text-center" :style="{ backgroundColor: getColor(this.currentSeat), opacity:0.7}" @click="change()">
        <img src="../resources/seat.png" style="height:100%;">
    </div>
</template>

<script>
import * as Tickets from '../tickets/TicketsType';
import {mapGetters, mapActions} from "vuex"
import * as Getters from './SessionGetter'
import * as Actions from "./SessionAction"
import store from "../store/store.js"

export default {
    props:['positions','status', 'getSeatIndisponivelGetter', 'isAdmin', 'getSelectedSeat'],
    name: 'seat',
    data () {
    return  {
            seat:[
                {
                    id:0,
                    desc:"DISPONIVEL",
                    color:"#ffffff"
                },{
                    id:1,
                    desc:"OCUPADO",
                    color:"#606368"
                },{
                    id:2,
                    desc:"INDISPONIVEL",
                    color:"#D9534F"
                },{
                    id:3,
                    desc:"CORTESIA",
                    color: "#428BCA"
                },{
                    id:4,
                    desc:"BALCAO_SELECIONADO",
                    color: "#239b3d"
                }
            ],
            value:"",
            // currentSeat:{},
            position:{
                x:0,
                y:0
            },
            alphabet:[...Array(26)].map((val, i) => String.fromCharCode(i + 65))
        }
    },
    created:function(){
      this.propheight = this.propheight
      this.position.x = this.positions[0];
      this.position.y = this.positions[1];
    },
    computed: {
      ...mapGetters({
        getSeat: Getters.GET_SEAT
      }),
      currentSeat() {
        let seat = this.getSeat(this.position.x, this.position.y)
        if(seat) {
          return seat
        }
        return {
          type: "DISPONIVEL"
        }
      },
      getColor() {
        return seat => {
          switch (seat.type) {
            case "DISPONIVEL":
            return "#ffffff"
            case "OCUPADO":
            return "#606368"
            // case "INDISPONIVEL":
            // return "#D9534F"
            case "BALCAO":
            let t = this.getSelectedSeat(this.position.x, this.position.y)
            if(t) {
              return "#167029"
            }
            return "#36db5a"
            case "CORTESIA":
            return "#428BCA"
            default:
            return "#D9534F"
          }
        }
      }
    },
    watch:{
        status:function(value, old){
            this.value = value;
        }
    },
    methods:{
      change(){
          if(this.isAdmin){
              this.setCurrentSeatStatus();
          }else{
              this.select();
          }
      },
  		select:function(){
        if(this.currentSeat.type == "DISPONIVEL"){
            this.currentSeat = this.seat[1];
            this.$emit('selectedSeat',this.position);
        } else if (this.currentSeat.type == "BALCAO"){
            this.currentSeat = this.seat[4];
            this.$emit('selectedSeat',this.position);
        }else if(this.currentSeat.type == "OCUPADO"){
            this.$swal({
                title: 'Tem certeza?',
                text: "Este assento "+ this.alphabet[this.position.y + 1] + this.position.x +" ja esta oculpado, deseja mudar para disponivel?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim, disponibilize!'
            }).then((result) => {
                if (result.value) {
                    this.currentSeat = this.seat[0];
                    this.$emit('deselectedSeat',this.position);
                    this.$swal(
                    'Disponivel!',
                    'O assento na posição ' + this.alphabet[this.position.y + 1] + this.position.x + " foi disponibilizado",
                    'success'
                    )
                }
            });
        }else{
            this.$swal("Este acento esta indisponivel")
        }
      },
      setCurrentSeatStatus:function(){
          if(this.$parent.getSelectStatus() == "INDISPONIVEL"){
              this.currentSeat = this.seat[2];
          }else if(this.$parent.getSelectStatus() == "CORTESIA"){
              this.currentSeat = this.seat[3];
          }else if(this.$parent.getSelectStatus() == "INTEIRA"){
              this.currentSeat = this.seat[0];
          }
          this.$emit('selectedSeat',this.position);
      }
	}
}
</script>

<style scoped>
.seat{
  display:table-cell;
  height: 20px;
  border: 1px solid black;
}

.seat:hover {
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}
</style>
