<template>
  <div class="container-fluid">
    <div class="row">
      <div class="offset-1 col-10 cc">
        <div class="cover-card">
          <div class="cover-glass ">
            <p class="ms-1">Get aHEAD of the scalpers.</p>
            <p class="ms-4">Become one of the scalpers.</p>
            <p class="at-tower">Here at Tower, all your scalping dreams can come true.</p>
          </div>
        </div>
      </div>
      <span class="offset-1 col-10 rounded nav-buttons mt-2 mb-1">
        <button @click="changeFilterType('')" class="nav-button selectable w-25"
          :class="[filterType == '' ? 'nav-button-selected' : '']">All</button>
        <button @click="changeFilterType('concert')" class="nav-button selectable w-25"
          :class="[filterType == 'concert' ? 'nav-button-selected' : '']">Concert</button>
        <button @click="changeFilterType('convention')" class="nav-button selectable w-25"
          :class="[filterType == 'convention' ? 'nav-button-selected' : '']">Convention</button>
        <button @click="changeFilterType('sport')" class="nav-button selectable w-25"
          :class="[filterType == 'sport' ? 'nav-button-selected' : '']">Sport</button>
        <button @click="changeFilterType('digital')" class="nav-button selectable w-25"
          :class="[filterType == 'digital' ? 'nav-button-selected' : '']">Digital</button>

      </span>
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
    const filterType = ref('');
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
      filterType,
      towerEvents: computed(() => {
        if (!filterType.value) {
          return AppState.towerEvents;
        }
        else {
          return AppState.towerEvents.filter(t => t.type == filterType.value)
        }
      }),
      tickets: computed(() => AppState.tickets),
      account: computed(() => AppState.account),


      changeFilterType(type) {
        filterType.value = type
      }
    };
  },
  components: { TowerEvent }
}
</script>

<style scoped lang="scss">
.cc {
  color: #CCF3FD;
}

.nav-button {
  background-color: #474c61;
  color: whitesmoke;
  border-top: 0px solid black;
  border-left: 0px solid black;
  border-right: 0px solid black;
  border-bottom: 0px solid #8dff83a0;
  margin-top: 5px;
  margin-bottom: 5px;
}

.nav-button-selected {
  background-color: #474c61;
  color: #8dff83a0;
  border-top: 0px solid black;
  border-left: 0px solid black;
  border-right: 0px solid black;
  border-bottom: 2px solid #8dff83a0;
  margin-top: 5px;
  margin-bottom: 5px;
}


.nav-buttons {
  background-color: #474c61;
  display: flex;
  justify-content: space-around;
  box-shadow: 2px 2px 2px black;
}

.cover-glass {
  background-color: rgba(128, 128, 128, 0);
  width: 100%;
}


.cover-card {
  background-image: url(coverImg.jpg);
  padding-top: 20vh;
  padding-right: 0vh;
  padding-bottom: 20vh;
  padding-left: 0vh;
  font-weight: 500;
  border: 2px solid #204051;
  background-position: center;
  background-size: cover;
}

.at-tower {
  margin-left: 4.5vh;
}


.big-img-dawg {
  width: 80vw;
  height: 38vh;
  border: 2px solid #204051;
}


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
