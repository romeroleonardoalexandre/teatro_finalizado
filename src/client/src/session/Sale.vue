<template>
<div class="sale-content-wrapper center-content">
  <div class="sale-content">
    <div title="Back" class="back-button" @click="back">
        <img src="../resources/left-arrow.svg" id="left-arrow">
    </div>
    <div class="commands reverse-gradient-bg">
      <div class="commands-title center-content lettering bg-font">
        Selecione o tipo de ingresso
      </div>
    </div>
    <div class="rows">
      <div class="row" v-for="item in getTickets">
        <div class="lettering md-font center-content row-title" v-if="isMesanino(item)">
            M
        </div>
        <div class="lettering md-font center-content row-title" v-else>
            {{alphabet[item.x]}}:{{item.y+1}}
        </div>
        <div class="right-content select-wrapper">
          <select dir="rtl" class="column-input bg lettering md-font" @change="onChangeType({$event, item})">
            <option v-for="item in getTicketsTypes" :value="item">{{item}}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="right-content">
      <div class="sale-footer reverse-gradient-bg">
        <button type="button" class="finalize-button lettering" @click="sell">OK</button>
      </div>
      <div class="sale-footer reverse-gradient-bg">
        <button type="button" class="finalize-button lettering" @click="postSale">FINALIZAR COMPRA</button>
      </div>
      <div class="sale-footer reverse-gradient-bg">
        <button type="button" class="finalize-button lettering" @click="cancel">CANCELAR</button>
      </div>
    </div>
  </div>

</div>
</template>

<script>

import * as Getter from "./SessionGetter"
import * as Action from "./SessionAction"
import store from "../store/store.js"
import {mapGetters, mapActions} from "vuex"

export default {
  name: "Sale",
  data: () => {
    return {
      alphabet: [...Array(26)].map((val, i) => String.fromCharCode(i + 65))
    }
  },
  computed: {
    ...mapGetters({
      getTickets: Getter.SELECTED_SEATS,
      getTicketsTypes: Getter.TICKETS_TYPE,
      isMesanino: Getter.IS_MESANINO
    })
  },
  methods: {
    ...mapActions({
      onChangeType: Action.CHANGE_SEAT_TYPE,
      back: Action.SELL,
      postSale: Action.POST_SALE,
      sell: Action.SELL_SHOW,
      cancel: Action.CANCEL_SALE
    })
  },
  created: () => {
    store.dispatch(Action.DEFINE_SELECTED_SEATS_INTEIRA)
  }

}
</script>

<style lang="css">

.back-button {
  position: absolute;
  width: 28px;
  height: 28px;
  padding: 3px;
  margin: 6px;
  cursor: pointer;
}

.finalize-button {
  height: 45px;
  width: 160px;
  color: #00549A;
  background-color: white;
  font-weight: 600;
  border-radius: 10px !important;
  float: right;
  margin-right: 15px;
  margin-top: -10px;
}

.back-button:hover {
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}

#left-arrow {
    height: 25px;
    width: 25px;
}

.sale-content-wrapper {
  width: 100%;
  height: 100%;
  margin-top: 3%;
}

.sale-content {
  width: 80%;
  max-width: 750px;
  height: 700px;
  background-color: white;
}

.commands {
  width: 100%;
  height: 10%;
}

.commands-title {
  width: 100%;
  height: 70%;
  color: white;
}

.rows {
  width: 100%;
  height: 90%;
  overflow-y: scroll;
}

.column-input {
  height: 90%;
  width: 300px;
  margin: 1%;
  margin-top: -8%;
  border-bottom: #005FA4 solid 1px;
}

.select-wrapper {
  margin-top: -3%;
  height: 90%;
}

.row {
  width: 100%;
  height: 7%;
  border-bottom: #ddd solid 1px;
}

.sale-footer {
  height: 70px;;
  width: 100%;
  padding-top: 3%;
  padding-bottom: 3%;
}

.row-title {
  max-width: 500px;
  text-align: left;
  border-right: #dbdbdb solid 1px;
  height: 90%;
  margin: 1%;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
