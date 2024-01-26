<template>
    <div>
        <div class="uppercase text-neutral-500 w-32">My Projects</div>
        <div class="project pb-10 flex mt-2">
            <div class="info flex-grow w-full text-lg">
                <NuxtLink to="https://themoviebrowser.com" target="_blank">
                    <div class="text-xl flex gap-2 items-end font-extrabold text-neutral-800">
                        <NuxtImg src="/images/movie-icon.png" class="h-10 w-auto" />
                        <div class="tracking-widest">TMB</div>
                        <div class="underline underline-offset-2 text-lg text-neutral-600">themoviebrowser.com</div>
                        <v-chip class="uppercase !font-bold" size="small" color="success">
                            <v-icon icon="mdi-circle" size="x-small" class="mr-1 transition-all ease-in-out"></v-icon>
                            in active development
                        </v-chip>
                    </div>
                </NuxtLink>
                <div class="mt-3 font-medium text-base">
                    <div class="text-lg font-default">
                        TMB is a movie and TV show discovery platform that helps you find the right content to watch.
                        With features like ratings, watch links, watchlist, discovery and AI recommendations TMB is the only platform you need to find your next watch.
                    </div>
                    <div class="tmb-list ml-3">
                        <div class="mt-1">
                            Feel like you've watched everything? TMB begs to differ with its powerful discovery feature.
                        </div>
                        <div class="mt-1">
                            Not sure if a movie is worth watching? TMB has ratings from multiple sources.
                        </div>
                        <div class="mt-1">
                            Not sure when the next episodes of all your favorite TV shows air? TMB has you covered.
                        </div>
                        <div class="mt-1">
                            Want to quickly jump to your favorite streaming service to continue watching? TMB has watch links for that.
                        </div>
                        <div class="mt-1">
                            Want to watch every last zombie movie? TMB has a filter for that.
                        </div>
                        <div class="mt-1">
                            Want to find movies that are war comedies that are available on amazon prime? OK, TMB doesnt have a filter for that, but you can create your own
                            <br />
                            <div class="cursor-pointer underline text-sm text-[#129856] ml-5" @click="updateIFrame">
                                check this out, seems like you're looking for
                                Tropic Thunder
                            </div>
                        </div>
                    </div>
                    <div class="font-semibold mt-2">
                        TMB is THE platform for movie enthusiasts
                    </div>
                </div>

                <div class="mt-2 flex gap-20 items-center justify-between">
                    <NuxtImg src="images/tmbratings.png" class="p-2 rounded-md bg-black mt-2 object-contain h-fit mb-1 w-2/3 shadow-lg shadow-neutral-600" />
                    <div>
                        <div class="font-semibold text-2xl mb-2">
                            Ratings and Watch Links
                        </div>
                        TMB helps you find the right movie or TV show by bringing ratings and watch links from
                        multiple sources into one place.
                        <div class="text-[#129856]">
                            Data for this is scraped from google search results and other sources using AWS Lambda functions
                        </div>
                    </div>
                </div>
                <div class="mt-10 flex gap-20 items-center flex-row-reverse justify-between">
                    <NuxtImg src="images/tmbtv.png" class="p-2 rounded-md bg-black mt-2 object-contain h-fit mb-1 w-2/3 shadow-lg shadow-neutral-600" />
                    <div>
                        <div class="font-semibold text-2xl mb-2">
                            Track your content
                        </div>
                        You can keep track of your TV shows and movies by adding them to your watchlist,
                        <br />
                        And has convenient links to continue watching on your favorite streaming service and even tells you when the next episode airs.
                        <div class="text-[#129856]">
                            Info for this is stored in a mongodb database based on your google account id
                        </div>
                    </div>
                </div>
                <div class="mt-10 flex gap-20 items-center justify-between">
                    <NuxtImg src="images/tmbdiscover.png" class="p-2 rounded-md bg-black mt-2 object-contain h-fit mb-1 w-2/3 shadow-lg shadow-neutral-600" />
                    <div>
                        <div class="font-semibold text-2xl mb-2">
                            Powerful Discovery with Custom filters
                        </div>
                        TMB has a powerful discovery feature that lets you find movies and TV shows based on
                        Genres, Keywords, Languages, Watch Providers, Cast & Crew and many more filters...
                        <br />
                        And it lets you save your custom filters for later use and even share them with everyone.
                        <div class="text-[#129856]">
                            Discovery feature is powered by the discover api from TMDB
                        </div>
                    </div>
                </div>
                <div class="mt-10 flex gap-20 items-center flex-row-reverse justify-between">
                    <NuxtImg src="images/tmbai.png" class="p-2 rounded-md bg-black mt-2 object-contain h-fit mb-1 w-2/3 shadow-lg shadow-neutral-600" />
                    <div>
                        <div class="font-semibold text-2xl mb-2">
                            AI Recommendations and discovery <span class="italic text-lg">BETA</span>
                        </div>
                        AI recommendation engine is still in beta, but it can already recommend movies based on similarity.
                        <br />
                        User recommendations are coming soon.
                        <br />
                        <div class="text-[#129856]">
                            AI features are based on a custom vector embeddings database that is built using a combination of movie metadata using sentence transformers stored in chromadb.
                        </div>
                    </div>
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
                    <div class="mt-10 flex items-end gap-1">
                        TMB is fully open source, visit the repo
                                <v-btn href="https://github.com/ChaitanyaVootla/movie-browser/tree/nuxt" target="_blank" variant="tonal" prepend-icon="mdi-github"
                                    rounded size="small">
                                    ChaitanyaVootla / movie-browser
                                </v-btn>
                        for more info. Dont forget to <v-icon class="text-yellow-400">mdi-star</v-icon> the repo if you like it.
                    </div>
                </div>
                <div class="italic text-sm mb-1 mt-3 text-[#129856]">Below is a live window into TMB, you can also visit the site by clicking the title above.</div>
                <iframe src="https://themoviebrowser.com" class="w-full h-[60rem] rounded-lg" title="TMB"></iframe>
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
];

const updateIFrame = () => {
    const link = 'https://themoviebrowser.com/browse?discover=JTdCJTIybWVkaWFfdHlwZSUyMiUzQSUyMm1vdmllJTIyJTJDJTIyc29ydF9ieSUyMiUzQSUyMnBvcHVsYXJpdHkuZGVzYyUyMiUyQyUyMndpdGhfZ2VucmVzJTIyJTNBJTVCMTA3NTIlMkMzNSU1RCUyQyUyMndpdGhfa2V5d29yZHMlMjIlM0ElNUIlNUQlMkMlMjJ3aXRoX29yaWdpbmFsX2xhbmd1YWdlJTIyJTNBbnVsbCUyQyUyMndpdGhvdXRfZ2VucmVzJTIyJTNBJTVCJTVEJTJDJTIyd2l0aF93YXRjaF9wcm92aWRlcnMlMjIlM0ElNUI5JTJDMTAlNUQlMkMlMjJ3aXRoX2Nhc3QlMjIlM0ElNUIlNUQlMkMlMjJ3aXRoX2NyZXclMjIlM0ElNUIlNUQlMkMlMjJ3aXRoX3dhdGNoX21vbmV0aXphdGlvbl90eXBlcyUyMiUzQSUyMiUyMiUyQyUyMndhdGNoX3JlZ2lvbiUyMiUzQSUyMklOJTIyJTJDJTIyd2l0aF9ydW50aW1lLmd0ZSUyMiUzQSUyMiUyMiUyQyUyMndpdGhfcnVudGltZS5sdGUlMjIlM0ElMjIlMjIlMkMlMjJ3aXRoX3JlbGVhc2VfdHlwZSUyMiUzQSUyMiUyMiUyQyUyMnZvdGVfYXZlcmFnZS5ndGUlMjIlM0FudWxsJTJDJTIydm90ZV9jb3VudC5ndGUlMjIlM0FudWxsJTdE';
    const iframe = document.querySelector('iframe') as HTMLIFrameElement;
    iframe.src = link;
    iframe.scrollIntoView({ behavior: 'smooth' });
}
</script>

<style scoped lang="less">
.tmb-list {
    >div {
        &::before {
            content: '•';
            margin-right: 0.5rem;
        }
    }
}
</style>
