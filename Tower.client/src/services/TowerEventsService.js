import { TowerEvent } from "../models/TowerEvent"
import { api } from "./AxiosService"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger"
import { applyStyles } from "@popperjs/core"

class TowerEventsService {

    async getComments(eventId){
        const res = await api.get('api/events/' + eventId + '/comments')
        logger.log(res.data)
        AppState.comments = res.data
    }
    async getAllEvents(){
        const res = await api.get('api/events')
        const towerEvents = res.data.map(t => new TowerEvent(t))
        AppState.towerEvents = towerEvents
        
    }

    async getTicketsByEvent(eventId){
        const res = await api.get('api/events/' + eventId + '/tickets')
        AppState.activeUsers = res.data
        logger.log(res.data)
    }

    async getOneEventById(eventId) {
        AppState.towerEvent = null
        const res = await api.get('api/events/' + eventId)
        AppState.towerEvent = new TowerEvent(res.data)
    }

    async createEvent(data) {
        const res = await api.post('api/events', data)
        return res.data
    }

    async cancelEvent(eventId){
        const res = await api.delete('api/events/' + eventId)
        logger.log('event canceled',res.data)
        let eventIndex = AppState.towerEvents.findIndex(t => t.id == eventId)
        if (eventIndex >= 0) {
            AppState.towerEvents.splice(eventIndex, 1)
            AppState.towerEvent = res.data
        }
    }
}

export const towerEventsService = new TowerEventsService