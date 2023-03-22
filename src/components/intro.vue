<template>
    <div class="container">
        <div class="profile">
            <div class="overview">
                <div class="title">About me</div>
                <div class="description">
                    I am a software engineer with 7+ years of experience in building web applications.
                    I have worked on a wide range of technologies and tools including
                    <br/>
                    <br/>
                    <div class="pills">
                        <a href="https://nodejs.org/en/" target="_blank" noreferrer class="no-link-style">
                            <span class="pill">Node</span>
                        </a>
                        <a href="https://www.typescriptlang.org/" target="_blank" noreferrer class="no-link-style">
                            <span class="pill">Typescript</span>
                        </a>
                        <a href="https://vuejs.org/" target="_blank" noreferrer class="no-link-style">
                            <span class="pill">Vue</span>
                        </a>
                        <a href="https://www.docker.com/" target="_blank" noreferrer class="no-link-style">
                            <span class="pill">Docker</span>
                        </a>
                        <a href="https://kubernetes.io/" target="_blank" noreferrer class="no-link-style">
                            <span class="pill">Kubernetes</span>
                        </a>
                        <a href="https://www.mongodb.com/" target="_blank" noreferrer class="no-link-style">
                            <span class="pill">MongoDB</span>
                        </a>
                        <a href="https://www.postgresql.org/" target="_blank" noreferrer class="no-link-style">
                            <span class="pill">PostgreSQL</span>
                        </a>
                        <a href="https://d3js.org/" target="_blank" noreferrer class="no-link-style">
                            <span class="pill">Data visualization tools</span>
                        </a>
                    </div>
                </div>
                <br/>
                <br/>
                I've been working on
                <a href="https://jfrog.com/pipelines" target="_blank" noreferrer>Jfrog Pipelines</a>
                for the past 4 years
                <br/>
                It is built on top of Shippable's CI/CD tool and is a direct competitor to
                <a href="https://github.com/features/actions" target="_blank" noreferrer>GitHub Actions</a> 
                and <a href="https://circleci.com/" target="_blank" noreferrer>CircleCI</a>
                in the enterprise space.
                <br/>
                <br/>
                I've worked extensively in building the UI for the product and built it from scratch.
                <br/>
                I've also worked on the backend and have worked on the core CI/CD engine and cloud orchestration.
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
                <img :src="getImgUrl('vootla-bg.png')"/>
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
.pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}
.pill {
    line-height: 2rem;
    background-color: #e7e7e7;
    border: 1px solid #c3c3c3;
    padding: 0.3rem 0.6rem;
    border-radius: 1rem;
    color: #333;
    margin-right: 0.5rem;
    width: fit-content;
}
.container {
    margin-top: 4rem;
    .profile {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .overview {
            max-width: 40%;
            line-height: 1.4rem;
            .title {
                font-weight: 600;
                font-size: 1.5rem;
                color: #333;
                margin-bottom: 1rem;
            }
        }
        .image {
            img {
                background-color: #e3e3e3;
                border: 1px solid #b7b7b7;
                border-radius: 100%;
                background-size: cover;
            }
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