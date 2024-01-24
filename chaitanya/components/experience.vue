<template>
    <div class="flex items-center">
        <div v-for="exp in experiences" class="w-44 h-30 flex flex-col items-center">
            <NuxtImg :src="exp.image" class="object-contain h-12 w-auto" />
            <div class="mt-5">{{ exp.name }}</div>
            <div class="text-neutral-500">{{ exp.job }}</div>
            <div class="text-neutral-500 text-xs">{{ exp.time }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
const experiences = [
    {
        name: 'JFrog',
        image: 'images/jfrog.png',
        job: 'Sr. Software Engineer',
        time: 'Apr 2019 - Present',
    },
    {
        name: 'Shippable',
        image: 'images/shippable.png',
        job: 'Software Engineer',
        time: 'Jun 2016 - April 2019',
    },
    {
        name: 'NIT Agartala',
        image: 'images/nita.png',
        job: 'B.Tech CSE',
        time: '2012 - 2016',
    }
]
</script>
