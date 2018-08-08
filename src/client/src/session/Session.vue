<template id="session">
  <div class="session-wrapper center-content" v-if="!isSale && !isPostSale">
    <div class="session" :class="{'seats': hasSeats, 'no-seats': !hasSeats}">
      <div title="Back" class="back-button" @click="back">
          <img src="../resources/left-arrow.svg" id="left-arrow">
          <div class="">
            ingressos livres:
          </div>
          <div class="">
            {{ingressosLivres}}
          </div>
      </div>
      <div class="session-area header lettering purple-bg center-content">
        <div class="main-header">
          <div class="session-title center-content">{{title}}</div>
          <div class="session-subtitle center-content">{{subTitle}}</div>
          <div class="session-description">{{description}}</div>
        </div>
      </div>
      <div class="session-area middle center-content">
        <session-seats
          :parentIsAdmin="false"
          :getSeatIndisponivelParent="getters.GET_SEAT_INDISPONIVEL"
          :getSelectedSeatParent="isSelectedSeat"
          :deselectedSeatParent="deselectedSeat"
          :selectedSeatParent="selectSeat"></session-seats>
      </div>
      <session-footer class="footer" :selected="selectedSeats"></session-footer>
    </div>
  </div>
  <div class="sale-wrapper" v-else-if="isSale && !isPostSale">
    <sale></sale>
  </div>
  <div class="post-sale-wrapper" v-else-if="isPostSale">
    <post-sale></post-sale>
  </div>
  <div class="post-sale-wrapper" v-else-if="isTicketsSold">
    <tickets-sold></tickets-sold>
  </div>
</template>

<script>

import "vuetify/dist/vuetify.min.css"
import SessionFooter from "./SessionFooter"
import {mapGetters, mapActions} from "vuex"
import * as Getters from './SessionGetter'
import * as Actions from "./SessionAction"
import store from "../store/store.js"
import router from "../router/index.js"
import SessionSeats from "./SessionSeats"
import Sale from "./Sale"
import PostSale from "./PostSale"
import TicketsSold from "./TicketsSold"

export default {
    router,
    store,
    name: "Session",
    components: {SessionFooter, SessionSeats, Sale, PostSale, TicketsSold},
    data: () => {
        return {
          getters: Getters
        }
    },
    computed: {
        ...mapGetters({
          subTitle: Getters.SUB_TITLE,
          title: Getters.TITLE,
          description:  Getters.DESCRIPTION,
          hasSeats: Getters.HAS_SEATS,
          selectedSeats: Getters.SELECTED_SEATS,
          seatsIndisponiveis: Getters.GET_SEAT_INDISPONIVEL,
          isSale: Getters.IS_SALE,
          isPostSale: Getters.IS_POST_SALE,
          isSelectedSeat: Getters.IS_SELECTED_SEAT,
          isTicketsSold: Getters.IS_TICKETS_SOLD,
          ingressosLivres: Getters.QNTY_SEATS
        })
    },
    methods: {
      ...mapActions({
        selectSeat: Actions.SELECT_SEAT,
        deselectedSeat: Actions.DESELECT_SEAT
      }),
      back: () => router.go(-1)
    },
    mounted: () => {
      store.dispatch(Actions.GET_SESSION, router.history.current.params);
    }
}
</script>

<style lang="scss" scoped>

.back-button {
    position: absolute;
    width: 28px;
    height: 28px;
    padding: 3px;
    margin: 6px;
    cursor: pointer;
}

.back-button:hover {
    box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}

.session-title {
    font-size: 20px;
    margin-bottom: 5px;
}

.session-description {
    width: 500px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

#left-arrow {
    height: 25px;
    width: 25px;
}

.session {
  // max-width: 700px;
  width: 80%;
  margin: 7%;
  background-color: white;
}

.seats {
  height: 90%;
  margin-top: 3%;
}

.no-seats {
  height: 45%;
}

.session-area {
  width: 100%;
}

.ticket-type-wrapper {
  height: 17%;
  margin: 2%;
  width: 100%;
  display: flex;
}

.header{
  color: white;
  height: 10%;
}

.middle {
  height: 50%;
}

.footer {
  height: 40%;
  padding:10px;
}

.seat-map {
  height: 100%;
}

</style>
