import { AppState } from "../AppState"
import { api } from "./AxiosService"

class CommentsService{
async createComment(data){
    const res = await api.post('api/comments', data)
    AppState.comments.unshift(res.data)
}

async deleteComment(commentId){
    const res = await api.delete('api/comments/' + commentId)
    const commentIndex = AppState.comments.findIndex(c => c.id == commentId)
    if (commentIndex >= 0) {
        AppState.comments.splice(commentIndex, 1)
    }
}
}

export const commentsService = new CommentsService()