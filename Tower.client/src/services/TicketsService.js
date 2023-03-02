import { AppState } from "../AppState"
import { api } from "./AxiosService"

class TicketsService{
    async getTicket(eventId){
        const res = await api.post('api/tickets', eventId)
        AppState.attendees.push(res.data)
        AppState.myTickets.push(res.data)
        AppState.towerEvent.capacity--
    }
}

export const ticketsService = new TicketsService