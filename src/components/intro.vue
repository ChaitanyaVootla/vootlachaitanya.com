<template>
    <div class="container">
        <div class="profile">
            <div class="overview">
                I'm a Computer Science and Engineering student from NIT Agartala with experience in
                Nodejs, Vue.js, Angular, SQL/PostgreSQL, MongoDB, Kubernetes and Docker.
                Over the course of my career I've created and overhauled features spanning from UI to API to
                microservices working with multiple teams across multiple time zones.
                <br/>
                <br/>
                Currently creating the next big CI/CD tool
                <a href="https://jfrog.com/pipelines" target="_blank" noreferrer>Jfrog Pipelines</a>
            </div>
            <div class="image">
                <el-avatar :src="getImgUrl()" :size="270"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'intro',
    methods: {
        getImgUrl(): string {
            return require('@/assets/images/vootla-bg.png')
        }
    }
}
</script>

<style scoped lang="less">
.container {
    margin-top: 4rem;
    .profile {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .overview {
            max-width: 40%;
        }
        .image {
            filter: grayscale(1);
            &:hover {
                filter: grayscale(0);
            }
        }
    }
}
</style>