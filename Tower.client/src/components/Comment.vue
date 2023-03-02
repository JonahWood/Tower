<template>
    <span class="d-flex justify-content-start">
        <img :title="comment.creator.name" class="profile-picture" :src="comment.creator.picture"
            :alt="comment.creator.name">
        <div class="comment-body ms-2 rounded"> {{ comment.body }}
            <div v-if="(comment.creatorId == account.id)">
                <button class="delete-button rounded" @click="deleteComment(comment.id)" title="Delete Comment"><i
                        class="mdi mdi-delete"></i></button>
            </div>
        </div>
    </span>
</template>


<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { AppState } from '../AppState';
import { commentsService } from '../services/CommentsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';


export default {
    props: {
        comment: { type: Object, required: true }
    },

    setup() {
        return {
            account: computed(() => AppState.account),

            async deleteComment(commentId) {
                try {
                    if (await Pop.confirm("Are you sure you'd like to delete this comment?")) {
                        await commentsService.deleteComment(commentId)
                    }
                } catch (error) {
                    Pop.error(error.message)
                    logger.error(error)
                }
            }


        }
    }
}
</script>


<style lang="scss" scoped>
.delete-button {
    border: 0px solid black;
    height: 5vh;
    width: 5vh;
    margin-top: 3vh;
    color: white;
    background-color: #cf2600;
}

.comment-body {
    border: 2px solid #6c83af9d;
    width: 90%;
    padding: 2vh;
    color: black;
    background-color: #e2f9ff;
}

.profile-picture {
    height: 10vh;
    width: 10vh;
    border-radius: 50%;
    box-shadow: 2px 2px 4px black;
}
</style>