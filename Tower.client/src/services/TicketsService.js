import { AppState } from "../AppState"
import { api } from "./AxiosService"

class TicketsService{
    async getTicket(eventId){
        const res = await api.post('api/tickets', eventId)
        AppState.attendees.push(res.data)
        AppState.myTickets.push(res.data)
        AppState.towerEvent.capacity--
    }

    async getTicketsByUser(){
        const res = await api.get('account/tickets')
        AppState.myTickets = res.data
    }
}

export const ticketsService = new TicketsService