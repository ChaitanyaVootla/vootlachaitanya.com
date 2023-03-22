<template>
    <nav-bar/>
    <intro/>
    <current-projects/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import navBar from '@/components/navbar.vue'
import currentProjects from '@/components/currentProjects.vue'
import intro from '@/components/intro.vue'

export default defineComponent({
    name: 'Home',
    components: {
        navBar,
        currentProjects,
        intro,
    },
})
</script>

<style lang="less" scoped>

</style>
