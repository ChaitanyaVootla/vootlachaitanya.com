<template>
    <div class="cards-title">
        Current Projects
    </div>
    <div class="cards-container">
        <div class="box-card">
            <div class="title">
                TheMovieBrowser
                <span class="desc">
                    Powered by <a href="https://developers.themoviedb.org/3/getting-started/introduction" target="_blank">The Movie Database API</a>
                </span>
            </div>
            
            <img @click="showImageDialog('movieBrowser.png')" src="@/assets/images/movieBrowser.png" class="image"/>
            <div class="bottom">
                <el-row>
                    <el-col :span="12">
                        <a target="_blank" href="https://github.com/ChaitanyaVootla/movie-browser" class="no-link-style">
                            <el-button>
                                View on GitHub <i class="fa-brands fa-github"></i>
                            </el-button>
                        </a>
                    </el-col>
                    <el-col :span="12">
                        <a target="_blank" href="https://themoviebrowser.com" class="no-link-style">
                            <el-button>
                                TheMovieBrowser.com
                                <i class="fa-solid fa-square-arrow-up-right"></i>
                            </el-button>
                        </a>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="box-card">
            <div class="title">
                Stonks
            </div>
            
            <img @click="showImageDialog('stonks.png')" src="@/assets/images/stonks.png" class="image"/>
            <div class="bottom">
                <el-row>
                    <el-col :span="12">
                        <el-popover
                            placement="top"
                            :width="200"
                            trigger="hover"
                        >
                        <div class="card-tooltip">not public yet</div>
                        <template #reference>
                            <a target="_blank" href="https://github.com/ChaitanyaVootla/movie-browser" class="no-link-style">
                                <el-button disabled>
                                    View on GitHub <i class="fa-brands fa-github"></i>
                                </el-button>
                            </a>
                        </template>
                        </el-popover>
                    </el-col>
                    <el-col :span="12">
                        <a target="_blank" href="https://stonks.vootlachaitanya.com" class="no-link-style">
                            <el-button>
                                stonks.vootlachaitanya.com
                                <i class="fa-solid fa-square-arrow-up-right"></i>
                            </el-button>
                        </a>
                    </el-col>
                </el-row>
            </div>
        </div>
    </div>
    <image-viewer :image="currentImage" ref="imageDialog"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import imageViewer from '@/components/imageViewer.vue'

export default defineComponent({
    components: {
        imageViewer,
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
.cards-title {
    text-transform: uppercase;
    margin: 1rem;
    font-weight: 600;
    font-size: 1.3em;
    color: white;
}
.cards-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 20px;
    padding: 0 8rem;
    .box-card {
        position: relative;
        background-color: #111;
        border: 1px solid black;
        border-radius: 5px;
        margin: 1rem;
        width: 40rem;
        color: white;
        display: flex;
        flex-direction: column;
        .card-tooltip {
            width: 100%;
            text-align: center;
        }
        .title {
            text-align: left;
            font-size: 1.4rem;
            font-weight: 600;
            padding: 1rem;
            .desc {
                padding-left: 1rem;
                font-weight: 400;
                font-size: .9rem;
                margin: 10px 0;
            }
        }
        .bottom {
            padding: 1rem 0;
        }
        button {
            font-weight: 500;
            i {
                margin-left: 5px;
            }
        }
        img {
            border-radius: 0;
            opacity: 0.9;
        }
    }
}
.image {
    border-radius: 5px;
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 1rem 0;
}
.el-dialog {
    margin-top: 0 !important;
}
</style>