<template>
    <div>
        <div class="flex items-center">
            <div class="uppercase text-neutral-500">Skills</div>
            <div class="border-b-2 w-full ml-5"></div>
        </div>

        <div class="flex gap-10 h-12 mt-5 flex-wrap">
            <div v-for="skill in skills"
                class="h-full flex items-center shadow-md shadow-neutral-200 rounded-2xl p-3 bg-neutral-50" >
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
        image: 'images/nuxt-full.svg',
    },
    {
        image: 'images/ts.png',
    },
    {
        image: 'images/docker.svg',
    },
    {
        image: 'images/postgresql.png',
        name: 'PostgreSQL',
    },
    {
        image: 'images/mongo.svg',
    },
    {
        image: 'images/kubernetes.svg',
    },
]
</script>
