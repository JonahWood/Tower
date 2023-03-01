<template>
    <div class="container-fluid" v-if="towerEvent">
        <div class="row">
            <div class="col-12">
                <h1>{{ towerEvent?.name }}</h1>
                <img :src="towerEvent?.coverImg" :alt="towerEvent?.name">
                <h5>{{ towerEvent?.description }}</h5>
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


<style lang="scss" scoped></style>