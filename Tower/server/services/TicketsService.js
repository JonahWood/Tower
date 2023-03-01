import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"

class TicketsService{
    async deleteTicket(ticketId, accountId) {
        const ticket = await dbContext.Tickets.findById(ticketId).populate('event profile')
        if (!ticket) {
            throw new BadRequest('Invalid Ticket Id, bub')
        }
        // @ts-ignore
        if (ticket.accountId.toString() !== accountId) {
            throw new Forbidden('I know who you are.')
        }
        // @ts-ignore
        const towerEvent = await towerEventsService.getOneEventById(ticket.eventId)
        if (towerEvent.isCanceled) {
            throw new BadRequest('Event has already been canceled')
        }
        // @ts-ignore
        await ticket.remove()
        towerEvent.capacity++
        await towerEvent.save()
        return ticket
    }
    async getTicketByEventId(eventId) {
        const tickets = await dbContext.Tickets.find({eventId})
        .populate('profile', 'name picture')
        return tickets
    }
    async getTicketByUser(accountId) {
        const userTickets = await dbContext.Tickets.find({accountId}).populate('profile event')
        return userTickets
    }
    async createTicket(ticketData) {
        const towerEvent = await dbContext.TowerEvents.findById(ticketData.eventId)
        
            // @ts-ignore
            if (towerEvent.capacity == 0) {
            throw new BadRequest('Event at capacity')
        }
        // @ts-ignore
        if (towerEvent.isCanceled) {
            throw new Forbidden('Event is canceled')
        }
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile event')
        // @ts-ignore
        towerEvent.capacity--
        // @ts-ignore
        await towerEvent.save()
        return ticket
    }

}

export const ticketsService = new TicketsService