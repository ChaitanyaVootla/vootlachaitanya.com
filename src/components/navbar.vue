<template>
    <div class="navbar">
        <div class="navbar-inner">
            <div class="title">
                <router-link to="/" class="no-link-style-white">
                    Vootla Chaitanya
                </router-link>
            </div>
            <div class="right">
                <el-button class="social-btn" size="large" round>
                    <div class="social-icon">
                        <a target="_blank" href="https://github.com/ChaitanyaVootla"
                            class="no-link-style">
                            GitHub
                        </a>
                    </div>
                </el-button>
                <el-button class="social-btn" size="large" round>
                    <div class="social-icon">
                        <a target="_blank" href="https://www.linkedin.com/in/vootlachaitanya"
                            class="no-link-style">
                            LinkedIn
                        </a>
                    </div>
                </el-button>
                <el-button class="resume" size="large" round>
                    <a href="/Resume.pdf" class="no-link-style">
                        <i class="fa-solid fa-download download-icon"></i> Resume
                    </a>
                </el-button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NavBar',
})
</script>

<style lang="less" scoped>

.navbar {
    height: 50px;
    line-height: 50px;
    color: white !important;
    height: 60px;
    .navbar-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 60px;
        padding: 1rem 0;
        border-bottom: 1px solid #cfcfcf;
    }
    .title {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 600;
        color: #222;
    }
    .right {
        display: flex;
        float: right;
        justify-content: right;
        align-items: center;
    }
    .el-button {
        font-weight: 600 !important;
        i {
            margin-right: 0.5rem;
        }
    }
    .download-icon {
        margin-right: 5px;
    }
    .resume {
        color: #fff !important;
        background-color: #333;
    }
}
</style>
