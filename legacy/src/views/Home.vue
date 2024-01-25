<template>
    <nav-bar/>
    <intro/>
    <div class="separator"></div>
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
.separator {
    border-bottom: 1px solid #cfcfcf;
    margin: 2rem 0;
}
</style>
