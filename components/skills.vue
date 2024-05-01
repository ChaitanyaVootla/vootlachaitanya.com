<template>
    <div>
        <div class="flex items-center">
            <div class="uppercase text-neutral-500 w-auto">My Skill Set</div>
        </div>

        <div class="flex mt-2 md:gap-10 max-md:gap-2 flex-wrap max-md:justify-center saturate-0">
            <div v-for="skill in skills" :key="skill.name" class="flex items-center p-3 h-12 max-md:h-10" >
                <NuxtImg :src="skill.image" class="h-full" />
                <div v-if="skill.name" class="text-xl font-semibold ml-2">{{ skill.name }}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const skills = [
    {
        image: 'images/nodejs.svg',
    },
    {
        image: 'images/vue.svg',
        name: 'Vue.js',
    },
    {
        image: 'images/nuxt.svg',
    },
    {
        image: 'images/ts.png',
    },
    {
        image: 'images/postgresql.png',
        name: 'PostgreSQL',
    },
    {
        image: 'images/mongo.svg',
    },
    {
        image: 'images/docker.svg',
    },
    {
        image: 'images/kubernetes.svg',
    },
]
</script>
