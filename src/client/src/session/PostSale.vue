<template>
  <div class="post-sale-content-wrapper center-content">
    <div class="post-sale-content">
      <div title="Back" class="back-button" @click="back">
          <img src="../resources/left-arrow.svg" id="left-arrow">
      </div>
      <div class="post-sale-header reverse-gradient-bg center-content">
        <div class="header-title center-content lettering bg-font white-font">
          INGRESSOS
        </div>
      </div>
      <div class="seats-list">
        <div class="seat" v-for="seat in getSelectedSeats">
          <div class="seat-info">
            <div class="seat-info-col lettering md-font" v-if="isMesanino(seat)">M</div>
            <div class="seat-info-col lettering md-font" v-else>Assento: {{alphabet[seat.x]}}:{{seat.y+1}}</div>
            <div class="seat-info-col lettering md-font">Peça: {{seat.title}}</div>
            <div class="seat-info-col lettering md-font">Sessão: {{seat.session}}</div>
            <div class="seat-info-col lettering md-font">Tipo: {{seat.type}}</div>
            <div class="seat-info-col lettering md-font">R$ {{getPrice(seat)}},00</div>
          </div>
          <img :src="getImage" class="seat-image">
        </div>
      </div>
      <div class="post-sale-footer reverse-gradient-bg right-content">
        <div class="total-ing lettering bg-font">
          total : {{getTotalPrice}},00
        </div>
        <span class="pagou bg-font lettering">Pagou:   </span>
        <input type="text" class="input-troco" v-model="troco">
        <span class="bg-font troco-resultado">    Troco: {{getTroco}}</span>
        <button type="button" class="post-sale-button primary-button" @click="sold">FINALIZAR E IMPRIMIR</button>
        <button type="button" class="post-sale-button secondary-button" @click="cancel">CANCELAR</button>
      </div>
    </div>
  </div>
</template>

<script>

import * as Getter from "./SessionGetter"
import * as Action from "./SessionAction"
import * as Mutations from "./SessionMutation"
import {mapGetters, mapActions} from "vuex"
import * as StoreGetters from "../store/Getters"
import * as StoreMutations from "../store/Mutations"
import router from "../router/index.js"
import store from "../store/store.js"

export default {
  name: "PostSale",
  data: () => {
    return {
      troco: 0,
      alphabet: [...Array(26)].map((val, i) => String.fromCharCode(i + 65))
    }
  },
  computed: {
    ...mapGetters({
      // getSelectedSeats: Getter.SELECTED_SEATS,
      getSelectedSeats: StoreGetters.CURRENT_SALE,
      getQRCode: Getter.QR_CODE,
      getPrice: Getter.PRICE,
      getTitle: Getter.TITLE,
      getSubTitle: Getter.SUB_TITLE,
      getImage: Getter.GET_PARSED_IMAGE,
      isMesanino: Getter.IS_MESANINO
    }),
    getPrice() {
      return seat => {
        switch (seat.type) {
          case "INTEIRA":
            return 20
          case "MEIA":
            return 10
          case "PROMOCIONAL":
            return 8
          case "CORTESIA":
            return 0
          case "INTEGRANTE":
            return 4
          default:
            return 20
        }
      }
    },
    getTotalPrice() {
      let totalIng = this.getSelectedSeats
      return totalIng.map(ing => this.getPrice(ing)).reduce((a, b) => a + b, 0)
    },
    getTroco() {
      //TODO
      let troco = this.troco -this.getTotalPrice
      return troco < 0 ? 0 : troco
    }
  },
  methods: {
    ...mapActions({
      back: Action.POST_SALE,
      sold: Action.SOLD
    }),
    cancel: () => {
      store.commit(StoreMutations.CLEAN_CURRENT_SALE)
      store.commit(Mutations.CLEAN_STATE)
      router.push({path: '/'})
    }
  },
  created: () => {
    store.dispatch(Action.LOAD_PARSED_IMAGE)
  }
}
</script>

<style lang="css" scoped>

.seat {
  width: 100%;
  border-bottom: solid 1px #00549A;
  max-height: 250px;
}

.seat-info-col {
  width: 15%;
  margin-right: 5%;
}

.remove-sale-button {
  height: 40px;
  width: 40px;
  background-color: #e85c5c;
  border-radius: 10px;
}

.pagou {
  color: white;
  margin-right: 10px;
}

.seat-info {
  width: 100%;
  display: flex;
  height: 30%;
  padding: 1%;
}

.troco-resultado {
  margin-right: 20px;
  color: white;
}

.total-ing {
  width: 30%;
  color: white;
}

.input-troco {
  background-color: white;
  margin-right: 50px;
}

.seat-image {
  height: 100px;
}

.post-sale-content-wrapper {
  width: 100%;
  height: 100%;
  margin-top: 3%;
}

.post-sale-content {
  width: 80%;
  height: 700px;
}

.post-sale-button {
  height: 45px;
  width: 160px;
  font-weight: 600;
  border-radius: 10px !important;
  float: right;
  margin-right: 15px;
}

.primary-button {
  color: #00549A;
  background-color: white;
}

.primary-button:hover {
  background-color: #e8f0ff;
}

.secondary-button {
  color: white;
  background-color: #00549A;
}

.secondary-button:hover {
  background-color: #005FA4;
}

.post-sale-header {
  width: 100%;
  height: 10%;
}

.seats-list {
  width: 100%;
  background-color: white;
}

.post-sale-footer {
  width: 100%;
  height: 10%;
}

</style>
