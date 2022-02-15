<template>
    <div class="navbar">
        <div class="navbar-inner">
            <div class="left">
            </div>
            <div class="title">
                <router-link to="/" class="no-link-style-white">
                    Vootla Chaitanya
                </router-link>
            </div>
            <div class="right">
                <div class="social-icon">
                    <a target="_blank" href="https://github.com/ChaitanyaVootla"
                        class="no-link-style">
                        <i class="fa-brands fa-github-square"
                            style="color: #6e5494"></i>
                    </a>
                </div>
                <div class="social-icon">
                    <a target="_blank" href="https://www.linkedin.com/in/vootlachaitanya"
                        class="no-link-style">
                        <i class="fa-brands fa-linkedin"
                            style="color: #0072b1"></i>
                    </a>
                </div>
                <div>
                    <a href="/Resume.pdf" class="no-link-style">
                        <el-button class="resume">
                            <i class="fa-solid fa-download"></i> Resume
                        </el-button>
                    </a>
                </div>
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
    background-color: rgba(28, 28, 28, 0.947);
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    color: white !important;
    .navbar-inner {
        display: flex;
        align-items: center;
    }
    .title {
        flex: 1;
        text-align: center;
        font-size: 1.5rem;
        font-weight: 600;
    }
    .left {
        flex: 1;
        text-align: left;
        .no-link-style {
            color: #2c3e50;
            text-decoration: none;
        }
    }
    .right {
        display: flex;
        flex: 1;
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
    .social-icon {
        margin-right: 2rem;
        i {
            display: block;
            font-size: 2.2em;
        }
    }
    .resume {
        color: black;
        background-color: white;
    }
}
</style>