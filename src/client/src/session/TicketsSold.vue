<template id="ticketsSold">
<div>
  <button @click="createPDF()" style="margin-top: 5px" class="lettering-courier right-button reverse-gradient-bg">IMPRIMIR</button>
    <div  id="ticketprint" >
        <div v-for="ticket in getSelectedSeats" >
          <p style="page-break-after: always;">&nbsp;</p>
          <p style="font-size: 20px;font-weight: 600;font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;">FURB - Universidade Regional de Blumenau / 31 FITUB</p>
          <table class="fixed" cellpadding="20px" style="border:1px solid black">
            <col width="420px" />
            <col width="30px" />
            <tr>
                <td style="padding:5px;margin:0px">
                  <p style="font-size: 25px;font-weight: 600;line-height: 1;font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;">{{ticket.title}}</p>
                  <p style="font-size: 25px;font-weight: 600;line-height: 1;font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;">{{ticket.roomTitle}}</p>
                  <p style="font-size: 25px;font-weight: 600;font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;">DATA: {{ticket.session}}</p><br>
                </td>
                <td style="padding:5px">
                  <p style="font-size: 28px;font-weight: 600;text-align: center;font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;">Lugar</p>
                  <p style="font-size: 32px;font-weight: 600;text-align: center;font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;" v-if="isMesanino(ticket)">M</p>
                  <p style="font-size: 32px;font-weight: 600;text-align: center;font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;" v-else>{{alphabet[ticket.x]}}:{{ticket.y + 1}}</p>
                  <h2 style="font-size: 32px;font-weight: 600;text-align: center;font-family: Courier New, Courier, Lucida Sans Typewriter, Lucida Typewriter, monospace;">{{ticket.id}}</h2>
                </td>
            </tr>
          </table>
        </div>
    </div>
</div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex"
    import store from "../store/store.js"
    import * as Actions from "../tickets/TicketsAction"
    import * as Getters from "../tickets/TicketsGetter"
    import * as StoreGetters from "../store/Getters"
    import * as StoreMutations from "../store/Mutations"
    import * as Getter from "./SessionGetter"
    import * as Mutations from "./SessionMutation"
    import jsPDF from 'jspdf'
    import { Printd } from 'printd'


    export default {
        store,
        name: 'TicketsSold',
        data: () => {
            return {
                alphabet:[...Array(26)].map((val, i) => String.fromCharCode(i + 65))
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
            })
        },
        methods: {
            ...mapActions({
                getTickets: Actions.GET_TICKETS,
                navigate : Actions.GO_TO
            }),

            createPDF () {
                store.commit(Mutations.CLEAN_STATE, {})
                store.commit(StoreMutations.CLEAN_CURRENT_SALE, {})
                const d = new Printd()
                d.print( document.getElementById('ticketprint'))
            }
        },
        created: () => {
            store.dispatch(Actions.GET_TICKETS)
        }
    }

</script>

<style scoped>

</style>
