import Vue from 'vue'
import Router from 'vue-router'
import Tickets from '@/tickets/Tickets'
import Session from '@/session/Session'
import User from '@/user/User'
import Trupe from '@/trupe/Trupe'
import Room from '@/room/Room'
import Show from '@/show/Show'
import Admin from '@/admin/Admin'
import TicketsSold from '@/session/TicketsSold'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Tickets',
      component: Tickets
    },{
      path: '/session/:id',
      name: 'Session',
      component: Session
    },{
      path: '/admin',
      name: 'Admin',
      component: Admin
    },{
      path: '/show/:id',
      name: 'Show',
      component: Show
    },{
      path: '/user/:id',
      name: 'User',
      component: User
    },{
      path: '/trupe/:id',
      name: 'Trupe',
      component: Trupe
    },{
      path: '/room/:id',
      name: 'Room',
      component: Room
    },{
      path: '/room/:id/seats',
      name: 'ChooseSeats',
      component: Session
    },{
       path: '/room/:id/tickets/sold',
       name: 'ticketsSold',
       component: TicketsSold
     }
  ]
})
