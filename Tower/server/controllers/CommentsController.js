import BaseController from "../utils/BaseController";
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";


export class CommentsController extends BaseController{
    constructor(){
        super('api/comments')
        this.router
        .use(Auth0Provider.getAuthorizedUserInfo)
        .post('', this.createComment)
        .delete('/:commentId', this.deleteComment)
    }
    async deleteComment(req, res, next) {
        try {
            const deadComment = await commentsService.deleteComment(req.params.commentId, req.userInfo.id)
            return res.send(deadComment + 'has been deleted')
        } catch (error) {
            next(error)
        }
    }
    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const comment = await commentsService.createComment(req.body)
            return res.send(comment)
        } catch (error) {
            next(error)
        }
    }
}