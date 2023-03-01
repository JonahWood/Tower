import { TowerEvent } from "../models/TowerEvent"
import { api } from "./AxiosService"
import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger"

class TowerEventsService {
    async getAllEvents(){
        const res = await api.get('api/events')
        const towerEvents = res.data.map(t => new TowerEvent(t))
        AppState.towerEvents = towerEvents
        
    }


    async getOneEventById(eventId) {
        AppState.towerEvent = null
        const res = await api.get('api/events/' + eventId)
        AppState.towerEvent = new TowerEvent(res.data)
    }
}

export const towerEventsService = new TowerEventsService