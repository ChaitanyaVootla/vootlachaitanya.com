<template>
    <div class="main-container">
        <div class="cards-title">
            My Projects
        </div>
        <div class="cards-container">
            <boxCard :show-image-dialog="showImageDialog"
                :card="{
                    title: 'Movie Browser',
                    image: 'movieBrowser.png',
                    titleImage: 'movie-icon.png',
                    github: {
                        link: 'https://github.com/ChaitanyaVootla/movie-browser',
                    },
                    website: {
                        name: 'TheMovieBrowser.com',
                        link: 'https://themoviebrowser.com',
                    },
                    statusText: 'In active development',
                    status: ''
                }">
                <template v-slot:subtitle>
                    Powered by <a href="https://developers.themoviedb.org/3/getting-started/introduction"
                        target="_blank">The Movie Database API</a>
                </template>
                <template v-slot:description>
                    Movie browser helps you to browse find the right movie or tv show to watch. with powerful and highly customizable filters
                    <br/>
                    It stores your watched movies and tv shows, and also watchlists.
                    <br/>
                    <br/>
                    It helps you to not waste time watching the wrong movie by showing ratings from multiple sources. and also shows the watchlinks from streaming services.
                    <br/>
                    <br/>
                    <span class="pills-heading">Technology stack</span>
                    <div class="mt-2">
                        <div class="pills-heading">Frontend</div>
                        <div class="pills mt-2">
                            <span class="pill">Vue 3</span>
                            <span class="pill">Typescript</span>
                            <span class="pill">Element plus</span>
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="pills-heading">Backend</div>
                        <div class="pills mt-2">
                            <span class="pill">Node.js</span>
                            <span class="pill">Typescript</span>
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="pills-heading">Rating and watch link extraction</div>
                        <div class="pills mt-2">
                            <span class="pill">Puppeteer on AWS Lambda</span>
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="pills-heading">Database and auth</div>
                        <div class="pills mt-2">
                            <span class="pill">Postgresql</span>
                            <span class="pill">Google auth</span>
                        </div>
                    </div>
                </template>
            </boxCard>
            <boxCard :show-image-dialog="showImageDialog"
                :card="{
                    title: 'Stonks',
                    image: 'stonks.png',
                    titleImage: 'stonks-icon.png',
                    github: {
                        disabled: true,
                    },
                    website: {
                        link: 'http://stonks.vootlachaitanya.com',
                        name: 'stonks.vootlachaitanya.com',
                    },
                    statusText: 'On ice',
                    status: 'info'
                }">
                <template v-slot:subtitle>
                    work in progress
                </template>
                <template v-slot:description>
                    Stonks is a proof of concept stock viewer and management project to see how much can be done without using any paid APIs or services.
                    <br/>
                    <br/>
                    It shows the current and historical stock prices of various companies, and also some additional information like
                    ownership, delivery percentage per day and market cap.
                    <br/>
                    <br/>
                    It also imports your portfolio from zerodha and shows the current value of your portfolio. what you exits have been,
                    and what you have gained/lost.
                    <br/>
                    <br/>
                    <span class="pills-heading">Technology stack</span>
                    <div class="mt-2">
                        <div class="pills-heading">Frontend</div>
                        <div class="pills mt-2">
                            <span class="pill">Vue 3</span>
                            <span class="pill">Typescript</span>
                            <span class="pill">Element plus</span>
                        </div>
                    </div>
                    <div class="mt-2">
                        <div class="pills-heading">Backend</div>
                        <div class="pills mt-2">
                            <span class="pill">Node.js</span>
                            <span class="pill">Typescript</span>
                        </div>
                    </div>
                </template>
            </boxCard>
            <boxCard :show-image-dialog="showImageDialog"
                :card="{
                    title: 'Ludo',
                    image: 'ludo.png',
                    titleImage: 'ludo-icon.png',
                    github: {
                        link: 'https://github.com/ChaitanyaVootla/ludo',
                    },
                    website: {
                        name: 'vootlachaitanya.com',
                    },
                    statusText: 'On ice',
                    status: 'info'
                }">
                <template v-slot:subtitle>
                    yet to start on phase II
                </template>
                <template v-slot:description>
                    Ludo is a proof of concept for a multiplayer game. Its built using just the in-built canvas API.
                    <br/>
                    <br/>
                    Phase II will be to add a backend and make it a online multiplayer game.
                    <br/>
                    <br/>
                    Phase III will be to add twists to the game to make it more interesting.
                    <br/>
                    <br/>
                    Phase IV will be to add a AI player.
                </template>
            </boxCard>
        </div>
    </div>
    <image-viewer :image="currentImage" ref="imageDialog"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import imageViewer from '@/components/imageViewer.vue'
import boxCard from './common/boxCard.vue';

export default defineComponent({
    components: {
        imageViewer,
        boxCard,
    },
    data() {
        return {
            dialogVisible: false,
            currentImage: '',
        }
    },
    methods: {
        showImageDialog(img: string) {
            this.currentImage = img;
            (this.$refs.imageDialog as any).showImageDialog();
        },
        hideImageDialog() {
            this.dialogVisible = false;
        },
    },
})
</script>

<style lang="less" scoped>
.main-container {
    margin-top: 3rem;
    .cards-title {
        font-weight: 600;
        font-size: 1.3rem;
        text-align: left;
    }
    .cards-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        gap: 3rem;
        flex-direction: row;
        margin-top: 2rem;
    }
}
.el-dialog {
    margin-top: 0 !important;
}
</style>