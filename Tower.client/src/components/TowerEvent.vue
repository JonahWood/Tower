<template>
    <router-link class="selectable" :to="{ name: 'TowerEvent', params: { eventId: towerEvent.id } }">
        <div class="eventCard my-2">
            <img class="img-fluid" :src="towerEvent.coverImg" :alt="towerEvent.name">
            <h5>{{ towerEvent.name }}</h5>
            <h6>{{ towerEvent.description }}</h6>
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
.eventCard {
    border: 5px solid #474c619b;
    background-color: #1b1d259c;
    color: white;
    text-shadow: 2px 2px 10px black;
}
</style>