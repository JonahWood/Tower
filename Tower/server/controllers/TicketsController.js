import BaseController from "../utils/BaseController"
import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";


export class TicketsController extends BaseController{
    constructor(){
        super('api/tickets')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createTicket)
        .get('')
        .delete('/:ticketId', this.deleteTicket)
    }
    async deleteTicket(req, res, next) {
        try {
        const deadTicket = await ticketsService.deleteTicket(req.params.ticketId, req.userInfo.id) 
            return res.send(deadTicket + 'Ticket Deleted')
        } catch (error) {
            next(error)
        }
    }
    async createTicket(req, res, next) {
        try {
            const ticketData = req.body
            // ticketData.creatorId = req.userInfo.id
            ticketData.accountId = req.userInfo.id
            const ticket = await ticketsService.createTicket(ticketData)
            return res.send(ticket)
        } catch (error) {
            next(error)
        }
    }
}