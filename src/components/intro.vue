<template>
    <div class="container">
        <div class="profile">
            <div class="overview">
                <div class="title">About me</div>
                I'm a Computer Science and Engineering student from NIT Agartala with experience in
                Nodejs, Vue.js, Angular, SQL/PostgreSQL, MongoDB, Kubernetes and Docker.
                Over the course of my career I've created and overhauled features spanning from UI to API to
                microservices working with multiple teams across multiple time zones.
                <br/>
                <br/>
                Currently creating the next big CI/CD tool
                <a href="https://jfrog.com/pipelines" target="_blank" noreferrer>Jfrog Pipelines</a>

                <div class="panels">
                    <div class="panel">
                        <img :src="getImgUrl('jfrog.png')" class="ref-image"/>
                        <div class="info">
                            JFrog
                            <div class="description">
                                Software Engineer
                            </div>
                            <div class="description small">
                                Apr 2019 - Present
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <img :src="getImgUrl('shippable.png')" class="ref-image"/>
                        <div class="info">
                            Shippable
                            <div class="description">
                                Software Engineer
                            </div>
                            <div class="description small">
                                Jun 2016 - Mar 2019
                            </div>
                        </div>
                    </div>
                    <div class="panel">
                        <img :src="getImgUrl('nita.png')" class="ref-image"/>
                        <div class="info">
                            NIT Agartala
                            <div class="description">
                                B.Tech C.S.E
                            </div>
                            <div class="description small">
                                2012 - 2016
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="image">
                <el-avatar :src="getImgUrl('vootla-bg.png')" :size="270"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'intro',
    methods: {
        getImgUrl(path: string): string {
            return require('@/assets/images/' + path)
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
            .title {
                font-weight: 600;
                font-size: 1.5rem;
                color: #333;
                margin-bottom: 1rem;
            }
        }
        .image {
            filter: grayscale(1);
            &:hover {
                filter: grayscale(0);
            }
        }
    }
    .panels {
        margin-top: 3rem;
        display: flex;
        align-items: center;
        gap: 3rem;
        .panel {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            align-items: center;
            .ref-image {
                filter: grayscale(1);
                height: 3rem;
                &:hover {
                    filter: grayscale(0);
                }
            }
            .info {
                font-weight: 600;
                font-size: 0.9rem;
                color: #333;
                text-align: center;
                .description {
                    font-weight: 400;
                    color: #666;
                    &.small {
                        margin-top: 0.3rem;
                        font-size: 0.8rem;
                        font-weight: 500;
                    }
                }
            }
        }
    }
}
</style>