<template>
    <router-link :to="{ name: 'TowerEvent', params: { eventId: towerEvent.id } }">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <img :src="towerEvent.coverImg" :alt="towerEvent.name" :title="towerEvent.name" class="img-fluid">
                    <h6>{{ towerEvent.name }}</h6>
                </div>
            </div>
        </div>
    </router-link>
</template>


<script>
export default {
    props: {
        towerEvent: { type: Object, required: true }
    },
    setup() {
        return {}
    }
}
</script>


<style lang="scss" scoped></style>