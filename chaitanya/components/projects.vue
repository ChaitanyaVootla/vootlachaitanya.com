<template>
    <div class="flex items-center mt-10 mb-5">
        <div class="uppercase text-neutral-500 w-32">My Projects</div>
        <div class="border-b-2 w-full"></div>
    </div>
    <div class="project bg-neutral-50 shadow-lg shadow-neutral-300 rounded-2xl pt-5 px-10 pb-10 flex">
        <div class="info flex-grow w-full text-lg">
            <NuxtLink to="https://themoviebrowser.com" target="_blank">
                <div class="text-xl flex gap-2 items-end font-extrabold text-neutral-800">
                    <NuxtImg src="/images/movie-icon.png" class="h-10 w-auto" />
                    <div class="underline underline-offset-2">TMB - The Movie Browser</div>
                    <v-chip class="uppercase !font-bold" size="small" color="success">
                        <v-icon icon="mdi-circle" size="small" class="mr-1"></v-icon>
                        in active development
                    </v-chip>
                </div>
            </NuxtLink>
            <div class="mt-2">
            </div>
            <div class="italic text-default">Below is a live window to TMB, you can also visit the site by clicking the link above.</div>
            <iframe src="https://themoviebrowser.com" class="w-full h-[80rem] rounded-lg" title="TMB"></iframe>

            <div class="mt-10 flex gap-20 items-center justify-between">
                <NuxtImg src="images/tmbratings.png" class="p-2 rounded-md bg-black mt-2 object-contain h-fit mb-1 w-1/2" />
                TMB helps you find the right movie or TV show by bringing ratings and watch links from
                multiple sources in one place.
            </div>
            <div class="mt-10 flex gap-20 items-center flex-row-reverse justify-between">
                <NuxtImg src="images/tmbtv.png" class="p-2 rounded-md bg-black mt-2 object-contain h-fit mb-1 w-1/2" />
                You can keep track of your TV shows and movies by adding them to your watchlist,
                <br />
                And has convenient links to continue watching on your favorite streaming service and even tells you when the next episode airs.
            </div>
            <div class="mt-10 flex gap-20 items-center justify-between">
                <NuxtImg src="images/tmbdiscover.png" class="p-2 rounded-md bg-black mt-2 object-contain h-fit mb-1 w-1/2" />
                TMB has a powerful discovery feature that lets you find movies and TV shows based on
                Genres, Keywords, Languages, Watch Providers, Cast & Crew and many more options...
                <br />
                And it lets you save your custom searches for later use and even share them with your friends and everyone else.
            </div>

            <div class="mt-10">
                <div class="text-2xl font-semibold">
                    Tech Stack
                </div>
                <div>
                    <div class="flex gap-10 h-12 mt-5 flex-wrap">
                        <div v-for="skill in skills" :key="skill.image"
                            class="h-full flex items-center shadow-md shadow-neutral-200 rounded-2xl p-3 bg-neutral-50" >
                            <NuxtImg :src="skill.image" class="h-full" />
                            <div v-if="skill.name" class="text-lg font-semibold ml-2">{{ skill.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const skills = [
    {
        image: 'images/nuxt.svg',
    },
    {
        image: 'images/ts.png',
    },
    {
        image: 'images/docker.svg',
    },
    {
        image: 'images/mongo.svg',
    },
    {
        image: 'images/lambda.svg',
        name: 'AWS Lambda',
    },
    {
        image: 'images/chroma.svg',
        name: 'Chroma',
    },
]
</script>
