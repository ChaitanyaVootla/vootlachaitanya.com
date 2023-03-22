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
        gap: 6rem;
        flex-direction: row;
        margin-top: 20px;
    }
}
.el-dialog {
    margin-top: 0 !important;
}
</style>