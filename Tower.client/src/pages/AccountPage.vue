<template>
  <div class="container text-center">
    <div class="row">
      <div class="col-12">
        <h1 class="text-light me-4">Hello {{ account.name }}.</h1>
      </div>
      <div class="col-12">
        <img class="rounded dope-img me-4" :src="account.picture" alt="" />
      </div>
      <div class="row">
        <div class="offset-5 col-2">
          <h3 class="your-tickets rounded">Your Tickets:</h3>
        </div>
        <div v-for="t in tickets" class="col-6">
          <TowerEvent :towerEvent="t.event" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import TowerEvent from '../components/TowerEvent.vue'
import UserTowerEvents from '../components/UserTowerEvents.vue'
import { ticketsService } from '../services/TicketsService'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop'
export default {
  setup() {
    async function getTicketsByUser() {
      try {
        await ticketsService.getTicketsByUser()
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
  components: { TowerEvent, UserTowerEvents, TowerEvent }
}
</script>

<style scoped>
.your-tickets {
  padding: 5px;
  margin-top: 2vh;
  color: antiquewhite;
  background-color: #16181f;
}

.dope-img {
  height: 30vh;
  width: 22vh;
}
</style>
