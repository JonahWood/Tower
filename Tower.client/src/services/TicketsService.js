import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{

async createTicket(eventId){
    const res = await api.post('api/tickets', eventId)
    AppState.activeUsers.push(res.data)
    AppState.myTickets.push(res.data)
    logger.log('res data:', res.data)
    logger.log('capacity before:', AppState.towerEvent.capacity)
    AppState.towerEvent.capacity--
    logger.log('capacity after:', AppState.towerEvent.capacity)
}


async getTicketsByUser(){
    const res = await api.get('account/tickets')
    AppState.myTickets = res.data
    logger.log('my tickets:',res.data)
}


async removeTicket(ticketId){
    const res = await api.delete('api/tickets/' + ticketId)
    const i = AppState.myTickets.findIndex(t => t.id == ticketId)
    AppState.myTickets.splice(i, 1)
}

























    
    // async getTicket(eventId){
    //     const res = await api.post('api/tickets', eventId)
    //     AppState.tickets.push(res.data)
    //     AppState.myTickets.push(res.data)
    //     AppState.towerEvent.capacity--
    //     logger.log('please work, creating ticket', res.data)
    //     return res.data
    //     const res = await api.post('api/tickets', eventId)
    //     logger.log('getTicket',res.data)
    //     AppState.attendees.push(res.data)
    //     AppState.tickets = res.data
    //     AppState.towerEvent.capacity--
    //     return res.data
    // }

    // async getTicketsByUser(){
    //     const res = await api.get('account/tickets')
    //     AppState.myTickets = res.data
    // }


}

export const ticketsService = new TicketsService