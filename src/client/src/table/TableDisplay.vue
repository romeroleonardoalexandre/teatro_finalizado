<template id="table-display">
  <v-data-table
      :headers="headers"
      :items="cards"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.title }}</td>
        <td class="text-xs-right">{{ props.item.session }}</td>
        <td class="text-xs-right">{{ props.item.sala }}</td>
        <td class="text-xs-right">{{ props.item.tickets }}</td>
      </template>
    </v-data-table>

</template>

<script>
export default {
  name: "TableDisplay",
  data: () => {
    return {
      headers: [{
          text: 'Título',
          align: 'left',
          sortable: false,
          value: 'title'
        },
        { text: 'Sessáo', value: 'session' },
        { text: 'Sala', value: 'sala' },
        { text: 'Ingressos disp.', value: 'tickets' }],
      cards: [
        {
          id: 1,
          title: "oi",
          session: "04/03 - 00:00",
          sala: "sala 2",
          tickets: "99"
        },{
          id: 2,
          title: "oi",
          session: "04/03 - 00:00",
          sala: "sala 2",
          tickets: "99"
        },{
          id: 3,
          title: "oi",
          session: "04/03 - 00:00",
          sala: "sala 2",
          tickets: "99"
        },{
          id: 4,
          title: "oi",
          session: "04/03 - 00:00",
          sala: "sala 2",
          tickets: "99"
        }
      ]
    }
  }

}
</script>

<style lang="css">


</style>
