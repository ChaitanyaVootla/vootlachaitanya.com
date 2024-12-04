<template>
    <Navbar />
    <div class="flex justify-center py-10 bg-black">
        <div class="max-md:px-5 md:w-[60%] flex flex-col flex-wrap">
            <div class="flex max-md:flex-col-reverse flex-wrap justify-between items-center gap-5">
                <div class="flex justify-between flex-col w-2/3">
                    <div class="about-me text-lg max-md:text-center max-md:mb-5">
                        <div>
                            <span class="text-2xl">Full Stack Software Engineer</span> with <span class="font-semibold">{{ metadata.experience }}</span>
                            of experience in building microservice powered web applications.
                        </div>
                        <div class="mt-5">
                            Experience in the full width of the software development lifecycle building enterprise-grade applications from the ground up in a startup environment.
                            <br/>Dealing with eveything from front-end to back-end to cloud infrastructure to databases and devops.
                        </div>
                        <div class="mt-5">
                            Currently working in the JFrog Artifactory team. And building up my personal project
                            <NuxtLink href="https://themoviebrowser.com" target="_blank" class="underline underline-offset-2">TheMovieBrowser.com</NuxtLink> in my free time.
                        </div>
                    </div>
                    <Experience class="mt-15" />
                </div>
                <div class="rounded-3xl shadow-lg shadow-neutral-900 border-2 border-neutral-800 w-1/5 h-fit flex flex-col justify-center overflow-clip">
                    <NuxtImg src="/images/vootla-bg.png" class="w-full h-full object-contain
                        saturate-0 bg-neutral-600" />
                    <div class="w-full flex justify-center gap-10 py-4 opacity-85">
                        <NuxtLink href="https://www.linkedin.com/in/vootlachaitanya" target="_blank">
                            <v-icon icon="mdi-linkedin" size="large" class="text-[#0077B5]" />
                        </NuxtLink>
                        <NuxtLink href="https://github.com/ChaitanyaVootla" target="_blank">
                            <v-icon icon="mdi-github" size="large" class="text-[#fff]" />
                        </NuxtLink>
                        <NuxtLink href="https://wa.me/+917899057199" target="_blank">
                            <v-icon icon="mdi-whatsapp" size="large" class="text-[#25d366]" />
                        </NuxtLink>
                    </div>
                </div>
            </div>
            <Skills class="mt-20" />
            <Projects class="mt-20"/>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
