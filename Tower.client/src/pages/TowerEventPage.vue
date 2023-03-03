<template>
    <div class="container" v-if="towerEvent">
        <div class="row text-light">
            <div class="col-12">
                <div class="big-img rounded">
                    <div class="row ps-2 py-2">
                        <div class="col-4">
                            <img class="img-fluid top-img rounded" :src="towerEvent.coverImg" :alt="towerEvent.name">
                        </div>
                        <div class="col-8">
                            <h2>{{ towerEvent.name }}
                                <button v-if="(towerEvent?.creatorId == account?.id) && (!towerEvent.isCanceled)"
                                    class="bg-danger bg-gradient text-light p-1 cancel rounded ms-1"
                                    @click="cancelEvent()">Cancel Event?</button>
                            </h2>
                            <h3 class="text-secondary">{{ towerEvent.location }}</h3>
                            <h6 class="lighter-text-weight">{{ towerEvent.description }}</h6>


                            <!-- LINK -->
                            <div v-if="(towerEvent.capacity == 0) || (towerEvent.isCanceled) || (isAttending)"
                                class="ultra-margin">
                                <h5>
                                    <span class="heavier-shadow text-danger">This event is no longer available.</span>
                                    <button disabled @click="createTicket()" class="Attend rounded bg-gradient">Attend
                                        <i class="mdi mdi-plus-box"></i></button>
                                </h5>
                            </div>
                            <!-- NOTE -->
                            <div v-else class="ultra-margin">
                                <h5>
                                    <span class="heavier-shadow text-success">{{ towerEvent.capacity }}</span>
                                    spots left. <button @click="createTicket()" class="Attend rounded bg-gradient">Attend <i
                                            class="mdi mdi-plus-box"></i></button>
                                </h5>
                            </div>
                            <div v-if="(isAttending)">
                                <div v-if="towerEvent.capacity > 0">
                                    <h6>
                                        <span class='text-success'>{{ towerEvent.capacity }}</span> spots left.
                                    </h6>
                                </div>
                                <div v-else>
                                    <h6>
                                        <span class='text-danger'>{{ towerEvent.capacity }}</span> spots left.
                                    </h6>
                                </div>
                            </div>
                            <!-- LINK -->




                        </div>
                    </div>
                </div>
            </div>
            <div v-if="attendees.length > 0" class="col-12 my-3 attendee-background rounded">
                <h6>Attendees:</h6>
                <img :title="a.profile.name" v-for="a in attendees" class="profile-picture" :src="a.profile.picture"
                    :alt="a.profile.name">
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row mt-5 comment-background p-2 rounded">
            <div class="offset-1 col-10 mb-5">
                <form @submit.prevent="createComment()">
                    <div class="form-floating">
                        <input title="Comment Field" v-model="liveComment.body" class="form-control comment-form w-100"
                            type="text">
                        <label class="text-dark">Tell the People...</label>
                    </div>
                    <div class="d-flex justify-content-end">
                        <button class="submit-button rounded mt-1" type="submit" title="Submit Comment">post
                            comment</button>
                    </div>
                </form>
            </div>

            <div class="col-12 mb-4" v-for="c in comments" :key="c.id">
                <Comment :comment="c" />
            </div>
        </div>
    </div>
</template>


<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { towerEventsService } from '../services/TowerEventsService';
import { commentsService } from '../services/CommentsService';
import { ticketsService } from '../services/TicketsService';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import Comment from '../components/Comment.vue';



export default {
    setup() {
        const liveComment = ref({})
        const route = useRoute();
        const router = useRouter();

        async function getComments() {
            try {
                await towerEventsService.getComments(route.params.eventId);
            }
            catch (error) {
                Pop.error(error.message);
                logger.error("this is from the getComments:", error);
            }
        }
        async function getOneEventById() {
            try {
                const eventId = route.params.eventId;
                await towerEventsService.getOneEventById(eventId);
            }
            catch (error) {
                Pop.error("we don't take kindly to your types around here");
                router.push("/");
            }
        }

        async function getTicketsByEvent() {
            try {
                await towerEventsService.getTicketsByEvent(route.params.eventId)
            } catch (error) {
                Pop.error(error.message)
                logger.error(error)
            }
        }


        onMounted(() => {
            getOneEventById();
            getComments();
            getTicketsByEvent();
        });
        watchEffect(() => {
            if (route.params.eventId) {
                getOneEventById();
            }
        });
        return {
            liveComment,
            account: computed(() => AppState.account),
            towerEvent: computed(() => AppState.towerEvent),
            comments: computed(() => AppState.comments),
            attendees: computed(() => AppState.activeUsers),
            isAttending: computed(() => AppState.activeUsers.find(a => a.accountId == AppState.account?.id)),
            async cancelEvent() {
                try {
                    await towerEventsService.cancelEvent(route.params.eventId)
                } catch (error) {
                    Pop.error(error.message)
                    logger.error('cancelEvent:', error)
                }
            },



            async createComment() {
                try {
                    liveComment.value.eventId = route.params.eventId
                    await commentsService.createComment(liveComment.value)
                    liveComment.value = {}
                } catch (error) {
                    Pop.error(error.message)
                    logger.error(error)
                }
            },
            async createTicket() {
                try {
                    await ticketsService.createTicket({ eventId: route.params.eventId })
                } catch (error) {
                    Pop.error(error.message)
                    logger.error(error)
                }
            }
        };
    },
    components: { Comment }
}
</script>


<style lang="scss" scoped>
.cancel {
    font-size: large;
    border: 0px solid black;
}

.profile-picture {
    height: 5vh;
    width: 5vh;
    border-radius: 50%;
    box-shadow: 2px 2px 4px black;
}

.submit-button {
    padding: 1vh;
    color: black;
    background-color: #79e7ab;
}

.comment-background {
    background-color: #474c61;
}

.attendee-background {
    padding: 1vh;
    background-color: #474c61;
}

.comment-form {
    min-height: 5vh;
}

.Attend {
    padding: 1vh;
    padding-left: 2vh;
    padding-right: 2vh;
    color: black;
    background-color: #ffd464;
    margin-left: 55vh;
    border: 0px solid black;
    box-shadow: 3px 3px 8px black;
}

.ultra-margin {
    margin-top: 19vh;
}

.heavier-shadow {
    text-shadow: 1px 1px 0px black;
}

.top-img {
    border: 1px solid #6d7b816d;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.543);
    height: 40vh;
}

.big-img {
    background-image: url(https://images.unsplash.com/photo-1415025148099-17fe74102b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1275&q=80);
    background-color: #7e7e7e9d;
    backdrop-filter: blur(5px);
    background-position: center;
    border: 1px solid #6d7b816d;
    text-shadow: 2px 2px 5px black;
    min-height: 50vh;
}

.lighter-text-weight {
    font-weight: 400;
    text-shadow: 1px 1px 1px black;
}
</style>