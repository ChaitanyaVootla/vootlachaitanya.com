<template>
    <div class="flex items-center gap-5 max-md:justify-center">
        <div v-for="exp in experiences" :key="exp.name" class="max-md:w-32 max-md:h-34
            md:w-44 md:h-30 flex flex-col items-center
            rounded-2xl shadow-lg shadow-neutral-900 border-neutral-800 border-2 py-3">
            <NuxtImg :src="exp.image" class="object-contain h-12 w-auto" />
            <div class="mt-1 max-md:text-sm">{{ exp.name }}</div>
            <div class="text-neutral-500 max-md:text-xs">{{ exp.job }}</div>
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
