<template>
    <router-link class="selectable" :to="{ name: 'TowerEvent', params: { eventId: towerEvent.id } }">
        <div class="eventCard rounded my-2 d-flex align-items-end" :title="towerEvent.name"
            :style="{ backgroundImage: `url('${towerEvent.coverImg}')` }">
            <div class="towerEvent-text w-100">
                <div>
                    <h5 class="ms-1 mt-1">{{ towerEvent.name }}</h5>
                    <h6 class="lighter-text-weight ms-1 mt-1">{{ towerEvent.location }}</h6>
                    <h6 class="lighter-text-weight ms-1 mt-1">On {{ new
                        Date(towerEvent.startDate).toLocaleDateString() }}</h6>
                    <div v-if="(towerEvent.capacity > 0)">
                        <div class="d-flex justify-content-end me-2">
                            <h6 class="lighter-text-weight text-success-event">Spots Remaining: {{ towerEvent.capacity }}
                            </h6>
                        </div>
                    </div>
                    <div v-else-if="(towerEvent.capacity == 0)"
                        class="capacity-filled d-flex justify-content-center bg-gradient">
                        <h5>FULL</h5>
                    </div>
                    <div v-else-if="(towerEvent.isCanceled)"
                        class="capacity-filled d-flex justify-content-center bg-gradient">
                        <h5>CANCELLED</h5>
                    </div>
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
.capacity-filled {
    background-color: rgba(245, 0, 0, 0.767);
    color: white;
}

.text-success-event {
    color: rgba(148, 255, 214, 0.712);
}

.lighter-text-weight {
    font-weight: 400;
}


.eventCard {
    background-position: center;
    background-size: cover;
    height: 30vh;
    border: 5px solid #474c61;
    color: white;
    text-shadow: 2px 2px 10px black;
    box-shadow: 3px 3px 5px black;
}


.towerEvent-text {
    min-height: 10vh;
    background-color: #0101019d;
    backdrop-filter: blur(10px);
}
</style>