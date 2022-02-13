<template>
    <nav-bar/>
    <current-projects/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import navBar from '@/components/navbar.vue'
import currentProjects from '@/components/currentProjects.vue'

export default defineComponent({
    name: 'Home',
    components: {
        navBar,
        currentProjects,
    },
})
</script>

<style lang="less" scoped>

</style>
