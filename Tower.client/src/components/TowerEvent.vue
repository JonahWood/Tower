<template>
    <router-link class="selectable" :to="{ name: 'TowerEvent', params: { eventId: towerEvent.id } }">
        <div class="eventCard my-2 d-flex align-items-end" :title="towerEvent.name"
            :style="{ backgroundImage: `url('${towerEvent.coverImg}')` }">
            <div class="towerEvent-text w-100">
                <div class="ms-1 mt-1">
                    <h5>{{ towerEvent.name }}</h5>
                    <h6 class="lighter-text-weight">{{ towerEvent.location }}</h6>
                    <h6 class="lighter-text-weight">On {{ new Date(towerEvent.startDate).toLocaleDateString('fr-ca') }}</h6>
                </div>
            </div>
        </div>
    </router-link>
</template>


<script>
import { computed } from 'vue';
import { TowerEvent } from '../models/TowerEvent';



export default {
    props: {
        towerEvent: { type: TowerEvent, required: true }
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped>
.lighter-text-weight {
    font-weight: 400;
}


.eventCard {
    height: 30vh;
    border: 5px solid #474c61;
    color: white;
    text-shadow: 2px 2px 10px black;
}


.towerEvent-text {
    min-height: 10vh;
    background-color: #0101019d;
    backdrop-filter: blur(10px);
}
</style>