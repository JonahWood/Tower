<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-3" v-for="t in towerEvents" :key="t.id">
        <TowerEvent :towerEvent="t" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue';
import { logger } from '../utils/Logger';
import Pop from '../utils/Pop';
import { towerEventsService } from '../services/TowerEventsService'
import { AppState } from '../AppState';
import TowerEvent from '../components/TowerEvent.vue';

export default {
  setup() {
    const filterCategory = ref("");
    async function getAllEvents() {
      try {
        await towerEventsService.getAllEvents();
      }
      catch (error) {
        Pop.error(error.message);
        logger.error("this is the getAllEvents error:", error);
      }
    }
    onMounted(() => {
      getAllEvents();
    });
    return {
      towerEvents: computed(() => {
        if (!filterCategory.value) {
          return AppState.towerEvents;
        }
        // else {
        // }
      })
    };
  },
  components: { TowerEvent }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
