import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TicketsService{
    async deleteTicket(ticketId, requesterId, ticketData) {
        const towerEvent = await dbContext.TowerEvents.findById(ticketData.eventId)
        const ticket = await dbContext.Tickets.findById(ticketId)
        if (!ticketId) {
            throw new BadRequest('Invalid Ticket Id')
        }
        // @ts-ignore
        if (ticket.accountId.toString() !== requesterId) {
            throw new Forbidden('I know who you are.')
        }
        // @ts-ignore
        towerEvent.capacity++
        // @ts-ignore
        await towerEvent.save()
        // @ts-ignore
        await ticket.remove()
        return 'Ticket Deleted'
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