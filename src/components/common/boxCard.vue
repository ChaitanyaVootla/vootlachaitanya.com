<template>
    <div class="box-card">
        <div class="title">
            {{card.title}}
            <span class="desc">
                <slot name="subtitle">
                </slot>
            </span>
        </div>

        <img @click="showImageDialog(card.image)" :src="getImgUrl(card.image)" class="image"/>
        <div class="bottom">
            <el-row>
                <el-col :span="12">
                    <el-popover
                        placement="top"
                        :width="200"
                        trigger="hover"
                        :disabled="!card.github.disabled"
                    >
                        <div class="card-tooltip">not public yet</div>
                        <template #reference>
                            <a target="_blank" :href="card.github.link" class="no-link-style">
                                <el-button :disabled="card.github.disabled">
                                    View on GitHub <i class="ml-2 fa-brands fa-github"></i>
                                </el-button>
                            </a>
                        </template>
                    </el-popover>
                </el-col>
                <el-col :span="12">
                    <a target="_blank" :href="card.website.link" class="no-link-style">
                        <el-button>
                            {{card.website.name}}
                            <i class="ml-2 fa-solid fa-square-arrow-up-right"></i>
                        </el-button>
                    </a>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
    },
    props: {
        showImageDialog: {
            type: Function,
            required: true,
        },
        card: {
            type: Object,
            required: true,
        }
    },
    methods: {
        getImgUrl(image: string) {
            return require('@/assets/images/' + image)
        }
    },
})
</script>

<style lang="less">
.box-card {
    position: relative;
    background-color: #222;
    border: 1px solid black;
    border-radius: 5px;
    margin: 1rem;
    color: white;
    display: flex;
    max-width: 30%;
    flex-direction: column;
    .card-tooltip {
        width: 100%;
        text-align: center;
    }
    .image {
        border-radius: 5px;
        width: 100%;
        height: 100%;
        object-fit: cover;
        margin: 1rem 0;
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
</style>
