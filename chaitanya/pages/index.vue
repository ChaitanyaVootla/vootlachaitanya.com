<template>
    <div class="flex justify-center">
        <div class="w-4/5">
            <Navbar />
            <div class="flex justify-between">
                <div class="flex justify-between flex-col">
                    <div class="about-me w-1/2">
                        I am a software engineer with <b>{{metadata.experience}}</b> experience in building web applications.
                        I have worked on a wide range of technologies and tools including

                    </div>
                    <Experience />
                </div>
                <NuxtImg src="/images/vootla-bg.png" class="rounded-3xl w-72 h-auto shadow-lg shadow-neutral-400 saturate-0 bg-neutral-100" />
            </div>
            <Skills class="mt-10" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { metadata } from '~/utils/meta';

useHead({
    title: 'Chaitanya Vootla',
})
</script>
