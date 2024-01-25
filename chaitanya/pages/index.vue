<template>
    <div class="flex justify-center mb-10">
        <div class="w-4/5 flex flex-col flex-wrap">
            <Navbar />
            <div class="flex justify-between gap-5">
                <div class="flex justify-between flex-col flex-grow">
                    <div class="about-me text-lg">
                        <div>
                            Software Engineer with <span class="font-semibold">{{ metadata.experience }}</span>
                            of experience in building applications that run on both cloud and on-premise.
                        </div>
                        <div class="mt-5">
                            Worked heavily on the full width of the stack, from
                            <span class="font-semibold">frontend</span> creating scalable performant and realtime UIs,
                            <br/>
                            to the  <span class="font-semibold">backend</span> orchestrating
                            cloud infrastructure, and building CI/CD pipelines.
                        </div>
                    </div>
                    <Experience />
                </div>
                <NuxtImg src="/images/vootla-bg.png" class="rounded-3xl w-72 h-[18rem] object-cover
                    shadow-lg shadow-neutral-400 saturate-0 bg-neutral-100" />
            </div>
            <Skills class="mt-10" />
            <Projects class="mt-10"/>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
