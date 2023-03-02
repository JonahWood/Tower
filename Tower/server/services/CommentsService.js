import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"
import { towerEventsService } from "./TowerEventsService"

class CommentsService{
    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        // @ts-ignore
        if (userId != comment.creatorId) {
            throw new Forbidden('I know who you are, bub')
        }
        if (!comment) {
            throw new BadRequest('NonExistent Comment')
        }
        await comment.remove()
        return comment
    }
    async getEventComments(eventId) {
        const towerEventComments = await dbContext.Comments.find({eventId})
        .populate('creator')
        return towerEventComments
    }
    async createComment(body) {
        const towerEvent = await towerEventsService.getOneEventById(body.eventId)
        if (towerEvent.isCanceled) {
            throw new BadRequest('This event is cancelled, bub')
        } 
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator')
        await comment.save()
        return comment
    }

}

export const commentsService = new CommentsService