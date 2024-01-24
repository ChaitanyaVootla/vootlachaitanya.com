<template>
    <div class="flex justify-center">
        <div class="w-1/2">
            <div class="w-full flex items-center h-28 border-b-2 mb-10 border-neutral-200">
                <div class="name text-5xl font-light">
                    Vootla Chaitanya
                </div>
            </div>
            <div class="flex justify-between gap-10">
                <div class="about-me text-xl">
                    I am a software engineer with {{metadata.experience}} experience in building web applications.
                    I have worked on a wide range of technologies and tools including
                </div>
                <NuxtImg src="/images/vootla.jpeg" class="rounded-3xl w-96 h-auto shadow-lg shadow-neutral-400" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { metadata } from '~/utils/meta';

</script>
