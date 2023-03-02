<template>
    <div class="container" v-if="towerEvent">
        <div class="row">
            <div class="col-12">
                <div class="big-img">
                    <div class="row ps-2 py-2">
                        <div class="col-5">
                            <img class="img-fluid" :src="towerEvent.coverImg" :alt="towerEvent.name">
                        </div>
                    </div>
                </div>
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
.big-img {
    background-image: url(https://images.unsplash.com/photo-1566755272146-d8ebc6bdcdc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80);
    background-color: #7e7e7e9d;
    backdrop-filter: blur(5px);
}

.blur-work {
    background-color: #80808063;
}
</style>