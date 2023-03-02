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
                            <h2>{{ towerEvent.name }}</h2>
                            <h3 class="text-secondary">{{ towerEvent.location }}</h3>
                            <h6 class="lighter-text-weight">{{ towerEvent.description }}</h6>
                            <div v-if="(towerEvent.capacity > 0)" class="ultra-margin">
                                <h5>
                                    <span class="heavier-shadow text-success">{{ towerEvent.capacity }}</span>
                                    spots left <button class="Attend rounded bg-gradient">Attend <i
                                            class="mdi mdi-plus-box"></i></button>
                                </h5>
                            </div>
                            <div v-else class="ultra-margin">
                                <h5>
                                    <span class="heavier-shadow text-danger">{{ towerEvent.capacity }}</span>
                                    spots left
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-12 mt-5">
                <!-- comments are gonna go here, hope you had a good lunch future me! -->
            </div>
        </div>


    </div>
</template>


<script>
import { computed, onMounted, ref, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { towerEventsService } from '../services/TowerEventsService';
import Pop from '../utils/Pop';



export default {
    setup() {
        const route = useRoute()
        const router = useRouter()


        async function getOneEventById() {
            try {
                const eventId = route.params.eventId
                await towerEventsService.getOneEventById(eventId)
            } catch (error) {
                Pop.error('we don\'t take kindly to your types around here')
                router.push('/')
            }
        }

        onMounted(() => {
            getOneEventById()
        })


        watchEffect(() => {
            if (route.params.eventId) {
                getOneEventById()
            }
        })
        return {
            towerEvent: computed(() => AppState.towerEvent),
        }
    }
}
</script>


<style lang="scss" scoped>
.Attend {
    padding: 1vh;
    padding-left: 2vh;
    padding-right: 2vh;
    color: black;
    background-color: #ffd464;
    margin-left: 55vh;
    border: 0px solid black;
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