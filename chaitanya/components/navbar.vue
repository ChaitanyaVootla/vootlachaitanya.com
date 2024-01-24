<template>
    <div class="w-full flex justify-between items-center h-20 mb-10 shadow-md shadow-neutral-200
        rounded-3xl bg-neutral-50 mt-10 overflow-hidden">
        <div class="name text-2xl font-light uppercase flex-grow flex ml-10 text-black">
            <div class="tracking-widest [word-spacing:10px]">Vootla Chaitanya</div>
            <div class="cursor-effect ml-1">_</div>
        </div>
        <div class="flex h-full items-center uppercase gap-5">
            <!-- <div class="py-4 h-full">
                <div class="h-full w-[1px] bg-neutral-200"></div>
            </div> -->
            <NuxtLink href="mailto:chaitanyavootla@proton.me" class="hover:bg-neutral-200 h-full w-full px-5 transition-all duration-300">
                <div class="flex gap-3 items-center h-full">
                    <v-icon icon="mdi-email" />
                    <div>EMail</div>
                </div>
            </NuxtLink>
            <!-- <div class="py-4 h-full">
                <div class="h-full w-[1px] bg-neutral-200"></div>
            </div> -->
            <NuxtLink href="tel:+917899057199" class="hover:bg-neutral-200 h-full w-full px-5 transition-all duration-300">
                <div class="flex gap-3 items-center h-full">
                    <v-icon icon="mdi-phone" />
                    <div>Call</div>
                </div>
            </NuxtLink>
            <!-- <div class="py-4 h-full">
                <div class="h-full w-[1px] bg-neutral-200"></div>
            </div> -->
            <NuxtLink to="/Resume.pdf" target="_blank" class="hover:bg-neutral-200 h-full w-full px-5 transition-all duration-300">
                <div class="flex gap-3 items-center h-full">
                    <v-icon icon="mdi-download" />
                    <div>Resume</div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<style lang="less">
.cursor-effect {
    animation: blink-animation 1s steps(3, start) infinite;
}

@keyframes blink-animation {
    to {
        visibility: hidden;
    }
}
</style>
