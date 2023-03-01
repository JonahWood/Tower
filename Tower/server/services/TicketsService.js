import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class TicketsService{
    async createTicket(ticketData) {
        const towerEvent = await dbContext.TowerEvents.findById(ticketData.eventId)
        if (towerEvent?.capacity == 0) {
            throw new BadRequest('Event at capacity')
        }
        if (towerEvent?.isCanceled) {
            throw new BadRequest('Event is canceled')
        }
        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('profile event')
        // @ts-ignore
        towerEvent?.capacity --
        await ticket.save()
        return ticket
    }

}

export const ticketsService = new TicketsService