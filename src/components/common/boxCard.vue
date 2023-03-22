<template>
    <div class="box-card">
        <div class="title">
            <a :href="card.website.link" target="_blank" class="no-link-style">
                {{card.title}}
            </a>
        </div>
        <div class="desc">
            <slot name="subtitle">
            </slot>
            <el-tag :type="card.status || 'info'" class="status-tag">Status: {{card.statusText}}</el-tag>
        </div>

        <img @click="showImageDialog(card.image)" :src="getImgUrl(card.image)" class="image"/>
        <div class="bottom">
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
                            View on GitHub
                        </el-button>
                    </a>
                </template>
            </el-popover>
            <a target="_blank" :href="card.website.link" class="no-link-style">
                <el-button>
                    {{card.website.name}}
                </el-button>
            </a>
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
    border-radius: 5px;
    display: flex;
    align-items: start;
    width: 40%;
    flex-direction: column;
    .card-tooltip {
        width: 100%;
        text-align: center;
    }
    .image {
        border-radius: 5px;
        width: 100%;
        height: 100%;
        object-fit: contain;
        background-color: black;
        filter: grayscale(1);
        margin: 1rem 0;
        cursor: pointer;
        &:hover {
            filter: none;
        }
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
    .bottom {
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
