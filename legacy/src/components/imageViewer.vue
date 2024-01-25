<template>
    <el-dialog
        :fullscreen="true"
        :model-value="dialogVisible"
        :before-close="hideImageDialog"
        >
        <img :src="require(`@/assets/images/${image}`)" class="image"/>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ImageViewer',
    props: {
        image: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            dialogVisible: false,
        }
    },
    methods: {
        showImageDialog() {
            this.dialogVisible = true;
        },
        hideImageDialog() {
            this.dialogVisible = false;
        },
    },
})
</script>

<style lang="less" scoped>

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