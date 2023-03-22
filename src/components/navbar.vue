<template>
    <div class="navbar">
        <div class="navbar-inner">
            <div class="title">
                <router-link to="/" class="no-link-style-white">
                    Vootla Chaitanya
                </router-link>
            </div>
            <div class="right">
                <el-button size="large" round>
                    <a target="_blank" href="https://github.com/ChaitanyaVootla"
                        class="no-link-style">
                        GitHub
                    </a>
                </el-button>
                <el-button size="large" round>
                    <a target="_blank" href="https://www.linkedin.com/in/vootlachaitanya"
                        class="no-link-style">
                        LinkedIn
                    </a>
                </el-button>
                <el-dropdown>
                    <el-button size="large" round>
                        Contact me
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                <a href="tel:+917899057199" class="no-link-style">
                                    <i class="fa-solid fa-phone"></i> 7899057199
                                </a>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <a href="mailto:chaitanyavootla@proton.me" class="no-link-style">
                                    <i class="fa-solid fa-envelope"></i> chaitanyavootla@proton.me
                                </a>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
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
        gap: 1rem;
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
