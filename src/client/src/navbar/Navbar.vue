<template id="navbar-wrapper">
  <div class="navbar">

    <div class="left-navbar navbar-area left-content">
      <div class="navbar-item lettering center-content">
        Quantidade de tickets no carrinho: {{quantity}}
        <div class="button-cart center-content" @click="openCart">
          <img src="../resources/shopping-cart.svg" style="height: 30px; width: 30px;">
        </div>
      </div>
    </div>

    <div class="middle-navbar navbar-area center-content">
      <div class="navbar-item lettering center-content">
        <!-- <img src="../resources/fitub_logo.png" class="fitub-logo"> -->
        <span class="lettering center-content" style="font-size: 28px">FITUB</span>
      </div>
    </div>

    <div class="right-navbar navbar-area right-content">
      <div class="navbar-item lettering center-content">
        <dropdown></dropdown>
      </div>
    </div>

  </div>
</template>

<script>
import Dropdown from "../components/Dropdown"
import {mapGetters, mapActions} from "vuex"
import * as StoreGetters from "../store/Getters"
import * as StoreMutations from "../store/Mutations"
import store from "../store/store.js"
import router from "../router/index.js"

export default {
  name: 'Navbar',
  components: {
    'dropdown': Dropdown
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapGetters({
      quantity: StoreGetters.ITENS_ON_CARRINHO
    })
  },
  methods: {
    openCart() {
      if(this.quantity > 0) {
        router.push({path: '/session/0'})
      }
    },
    cleanCart() {
      store.commit(StoreMutations.CLEAN_CURRENT_SALE)
    }
  }
}
</script>

<style scoped>

.fitub-logo{
  height: 50px;
}

.button-cart {
  height: 40px;
  width: 60px;
  background-color: #00549A;
  border-radius: 5px;
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
}

.button-cart:hover {
  background-color: #005FA4;
  cursor: pointer;
}

.button-clean-cart {
  background-color: #e85c5c;
  height: 30px;
  border-radius: 7px;
  margin-left: 10px;
}

.navbar {
  display: flex;
  /* background:  linear-gradient(to right, rgba(234, 127, 155, 1) 50%, rgba(255,167,78, 1) 50%); */
  background: #005FA4;
  width: 100%;
  height: 50px;
  max-height: 12%;
}

.navbar-area {
  width: 33%;
  padding: 1%;
}

.navbar-item {
  height: 100%;
  color: white;
  font-size: 18px;
  font-weight: 700;
}

</style>
