<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New Event</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="createEvent()">
              <div class="form-floating mb-3">
                <input required v-model="newTowerEvent.name" type="text" class="form-control bg-btnnav" id="name"
                  placeholder="Name">
                <label for="name">Event Name</label>
              </div>
              <div class="form-floating mb-3">
                <input required v-model="newTowerEvent.description" type="text" class="form-control bg-btnnav"
                  id="description" placeholder="Description">
                <label for="description">Description</label>
              </div>
              <div class="form-floating mb-3">
                <input required v-model="newTowerEvent.coverImg" type="Url" class="form-control bg-btnnav" id="coverImg"
                  placeholder="Cover Image">
                <label for="coverImg">Cover Image</label>
              </div>
              <div class="form-floating mb-3">
                <input required v-model="newTowerEvent.location" type="text" class="form-control bg-btnnav" id="location"
                  placeholder="Location">
                <label for="location">Location</label>
              </div>
              <div class="form-floating mb-3">
                <input min="1" required v-model="newTowerEvent.capacity" type="number" class="form-control bg-btnnav"
                  id="capacity" placeholder="Capacity">
                <label for="capacity">Capacity</label>
              </div>
              <div class="form-floating mb-3 text-dark">
                <input required v-model="newTowerEvent.startDate" type="Date" class="form-control bg-btnnav text-light"
                  id="startDate" placeholder="Start Date">
                <label for="startDate">Start Date</label>
              </div>
              <div required class="form-floating mb-3 text-dark">
                <select v-model="newTowerEvent.type" class="form-select bg-btnnav text-light" id="type">
                  <option class="text-dark" value="concert">Concert</option>
                  <option class="text-dark" value="convention">Convention</option>
                  <option class="text-dark" value="sport">Sport</option>
                  <option class="text-dark" value="digital">Digital</option>
                </select>
                <label for="type">Type</label>
              </div>
              <button type="submit" class="btn btn-outline-dark">Initialize Event</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { Offcanvas } from 'bootstrap'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { AppState } from './AppState'
import Navbar from './components/Navbar.vue'
import { towerEventsService } from './services/TowerEventsService'
import { logger } from './utils/Logger'
import Pop from './utils/Pop'

export default {
  setup() {
    const newTowerEvent = ref({})
    const router = useRouter()
    return {
      newTowerEvent,
      async createEvent() {
        try {
          const towerEvent = await towerEventsService.createEvent(newTowerEvent.value)
          router.push({ name: 'TowerEvent', params: { eventId: towerEvent.id } })
          newTowerEvent.value = {}
          Offcanvas.getOrCreateInstance('#exampleModal').hide()
        } catch (error) {
          Pop.error(error.message)
          logger.error(error)
        }
      },
      appState: computed(() => AppState)
    }
  },
  components: { Navbar }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";

main {
  background-color: #2a2d3a;
}

:root {
  --main-height: calc(100vh - 32px - 64px);
}


footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
