import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"

class TowerEventsService {
    async cancelEvent(eventId, requesterId) {
        const towerEvent = await this.getOneEventById(eventId)
        if (towerEvent.creatorId.toString() != requesterId) {
            throw new Forbidden('You are not this events creator, you fool')
        }
        if (towerEvent.isCanceled == true) {
            throw new BadRequest('This event has already been canceled')
        }
        if (!towerEvent) {
            throw new BadRequest('ThisEventDoesNotExist')
        }
        towerEvent.isCanceled = true
        await towerEvent.save()
        return towerEvent
    }
    async editEvent(id, body, userId) {
        const towerEvent = await this.getOneEventById(id)
        if (!towerEvent) {
            throw new BadRequest('Invalid Id')
        }
        if (towerEvent.creatorId != userId) {
            throw new Forbidden('Access Denied')
        }
        if (towerEvent.isCanceled == true) {
            throw new BadRequest('This event has been canceled and can no longer be edited')
        }
        towerEvent.name = body.name ? body.name : towerEvent.name
        towerEvent.description = body.description ? body.description : towerEvent.description
        towerEvent.coverImg = body.coverImg ? body.coverImg : towerEvent.coverImg
        towerEvent.location = body.location ? body.location : towerEvent.location
        towerEvent.capacity = body.capacity ? body.capacity : towerEvent.capacity
        towerEvent.startDate = body.startDate ? body.startDate : towerEvent.startDate
        towerEvent.type = body.type ? body.type : towerEvent.type
        await towerEvent.save()
        return towerEvent
    }
    async getOneEventById(eventId) {
        const towerEvent = await dbContext.TowerEvents.findById(eventId)
        .populate('creator', 'name picture')
        if (!towerEvent) {
            throw new BadRequest('Invalid TowerEvent Id bub')
        }

        return towerEvent
    }
    async getAllEvents() {
        const towerEvents = await dbContext.TowerEvents.find()
        .populate('creator', 'name picture')
        return towerEvents
    }
    async createEvent(towerEventData) {
        const towerEvent = await dbContext.TowerEvents.create(towerEventData)
        await towerEvent.populate('creator', 'name picture')
        return towerEvent
    }

}

export const towerEventsService = new TowerEventsService()