<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-12">
        <h1 class="text-light">Hello {{ account.name }}.</h1>
      </div>
      <div class="col-12">
        <img class="rounded dope-img" :src="account.picture" alt="" />
      </div>
      <!-- <div v-for="t in tickets" class="col-3 text-light rounded mb-2">
        <TowerEvent :towerEvent="t.towerEvent" />
      </div> -->
    </div>

  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import TowerEvent from '../components/TowerEvent.vue'
import { ticketsService } from '../services/TicketsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  setup() {
    async function getTicketsByUser() {
      try {
        await ticketsService.getTicketsByUser();
      }
      catch (error) {
        Pop.error(error.message);
        logger.error(error);
      }
    }
    onMounted(() => {
      getTicketsByUser();
    });
    return {
      account: computed(() => AppState.account),
      tickets: computed(() => AppState.myTickets)
    };
  },
  components: { TowerEvent }
}
</script>

<style scoped>
.dope-img {
  height: 30vh;
  width: 22vh;
}
</style>
