<template>
    <div class="box-card">
        <div class="top-info">
            <div class="heading">
                <div class="title">
                    <a :href="card.website.link" target="_blank" class="no-link-style title-container">
                        <img v-if="card.titleImage" :src="getImgUrl(card.titleImage)" class="title-image"/>{{card.title}}
                    </a>
                </div>
                <div class="desc">
                    <slot name="subtitle">
                    </slot>
                    <el-tag :type="card.status || 'info'" class="status-tag">Status: {{card.statusText}}</el-tag>
                </div>
                <div class="links">
                    <el-popover
                        placement="top"
                        :width="200"
                        trigger="hover"
                        :disabled="!card.github.disabled"
                    >
                        <div class="card-tooltip">not public yet</div>
                        <template #reference>
                            <a target="_blank" :href="card.github.link" class="no-link-style">
                                <el-button :disabled="card.github.disabled" round>
                                    View on GitHub
                                </el-button>
                            </a>
                        </template>
                    </el-popover>
                    <el-popover
                        placement="top"
                        :width="200"
                        trigger="hover"
                        :disabled="card.website.link"
                    >
                        <div class="card-tooltip">yet to host</div>
                        <template #reference>
                            <a target="_blank" :href="card.website.link" class="no-link-style">
                                <el-button :disabled="!card.website.link" round>
                                    {{card.website.name}}
                                </el-button>
                            </a>
                        </template>
                    </el-popover>
                </div>
                <div class="detailed-description">
                    <slot name="description">
                    </slot>
                </div>
            </div>

            <div class="image-container">
                <img @click="showImageDialog(card.image)" :src="getImgUrl(card.image)" class="image"/>
            </div>
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
    background-color: #f3f3f3;
    border: 1px solid #cacaca;
    padding: 1rem;
    padding-bottom: 2rem;
    border-radius: 5px;
    display: flex;
    align-items: start;
    flex-direction: column;
    .top-info {
        display: flex;
        .heading {
            flex: 2;
            .detailed-description {
                font-size: .9rem;
                padding: 1rem 0;
                max-width: 80%;
            }
            .title-container {
                display: flex;
                align-items: center;
                gap: 0.3rem;
                .title-image {
                    height: 1.5rem;
                }
            }
        }
        .image-container {
            flex: 2;
        }
    }
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
        cursor: pointer;
    }
    .title {
        font-size: 1.3rem;
        font-weight: 600;
        padding: 1rem 0;
    }
    .desc {
        font-weight: 400;
        font-size: .9rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    .links {
        padding: 1rem 0;
        display: flex;
        gap: 2rem;
    }
    button {
        font-weight: 500;
        i {
            margin-left: 5px;
        }
    }
}
</style>
