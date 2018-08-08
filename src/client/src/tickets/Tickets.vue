<template id="tickets">
  <div class="tickets-wrapper">
    <div class="card-list-wrapper">
      <div v-for="card in cards" class="card-wrapper" >
        <div class="card">
          <div class="card-image purple-bg">
          </div>
          <div class="card-title lettering center-content">
            {{card.title}}
          </div>
          <div class="session-info">
            <div class="card-session lettering md-font">
              SESSÃO: {{card.session}}
            </div>
          </div>
          <button v-on:click="navigate(card.id)" style="margin-top: 15px" class="lettering right-button reverse-gradient-bg">COMPRAR</button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>

import router from "../router/index.js"
import { mapActions, mapGetters } from "vuex"
import store from "../store/store.js"
import * as Actions from "./TicketsAction"
import * as Getters from "./TicketsGetter"

export default {
  store,
  name: 'Tickets',
  data: () => {
    return {
    }
  },
  computed: {
    ...mapGetters({
      cards: Getters.SESSIONS
    })
  },
  methods: {
    ...mapActions({
        getTickets: Actions.GET_TICKETS,
        navigate : Actions.GO_TO
    })
  },
  created: () => {
    store.dispatch(Actions.GET_TICKETS)
  }
}

</script>

<style scoped>

.card-list-wrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: center;
  padding:3%;
}

.card-wrapper {
  min-width: 300px;
  min-height: 300px;
  height: 50%;
  background: white;
  align-items: flex-start;
  margin: 10px;
  display: flex;
}

.card {
  min-height: 300px;
  height: 100%;
  width: 100%;
}

.card-image {
  width: 100%;
  min-height: 120px;
}

.card-title {
  width: 100%;
  height: 90px;
  font-size: 20px;
}

.session-info {
  padding: 5px;
}

.row {
  height: 30%;
  width: 100%;
  margin-top: 10px;
  padding: 5px;
}

.half-row {
  width: 50%;
}

.md-font {
  font-size: 16px;
}

.card-session {
  margin-bottom: 5px;
}

.card-tickets {
  /* width: 50%;
  height: 90px; */
}

</style>
