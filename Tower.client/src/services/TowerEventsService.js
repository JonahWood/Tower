import { TowerEvent } from "../models/TowerEvent"
import { api } from "./AxiosService"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger"

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

    async getTickets(eventId){
const res = await api.get('api/events/' + eventId + '/tickets')
AppState.attendees = res.data
    }

    async getOneEventById(eventId) {
        AppState.towerEvent = null
        const res = await api.get('api/events/' + eventId)
        AppState.towerEvent = new TowerEvent(res.data)
    }
}

export const towerEventsService = new TowerEventsService