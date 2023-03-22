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
                    Movie browser helps you to browse movies and tv shows, search for them using advanced and storable filters,
                    get watch links and ratings from various sources, and much more.
                    <br/>
                    <br/>
                    Technology stack:
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
                </template>
            </boxCard>
            <boxCard :show-image-dialog="showImageDialog"
                :card="{
                    title: 'Stonks',
                    image: 'stonks.png',
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
                    Stonks is a proof of concept project to see how much can be done without using any paid APIs or services.
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
                    Technology stack:
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
        gap: 2rem;
        flex-direction: row;
        margin-top: 2rem;
    }
}
.el-dialog {
    margin-top: 0 !important;
}
</style>