import { Auth0Provider } from "@bcwdev/auth0provider";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";

export class TowerEventsController extends BaseController {
    constructor(){
        super('api/events')
        this.router
        .get('', this.getAllEvents)
        .get('/:eventId', this.getOneEventById)
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createEvent)
        .put('/:eventId', this.editEvent)
        .delete('/:eventId', this.cancelEvent)
    }
    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const requesterId = req.userInfo.id
            const towerEvent = await towerEventsService.cancelEvent(eventId, requesterId)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const updatedTowerEvent = await towerEventsService.editEvent(req.params.eventId, req.body, req.userInfo.id)
            return res.send(updatedTowerEvent)
        } catch (error) {
            next(error)
        }
    }
    async getOneEventById(req, res, next) {
        try {
            const eventId = req.params.eventId
            const towerEvent = await towerEventsService.getOneEventById(eventId)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async getAllEvents(req, res, next){
        try {
            const towerEvents = await towerEventsService.getAllEvents()
            res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }


    async createEvent(req, res, next){
        try {
            const towerEventData = req.body
            towerEventData.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.createEvent(towerEventData)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }
}