import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class TicketsService{
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