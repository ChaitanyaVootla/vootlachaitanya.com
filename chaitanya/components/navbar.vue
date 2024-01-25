<template>
    <div class="w-full flex justify-between items-center h-20 mb-10 shadow-lg shadow-neutral-400
        rounded-3xl bg-neutral-800 mt-10 overflow-hidden text-white">
        <div class="name text-2xl font-light uppercase flex-grow flex ml-10">
            <div class="tracking-widest [word-spacing:10px]">Chaitanya Vootla</div>
            <div class="cursor-effect ml-1">_</div>
        </div>
        <div class="flex h-full items-center uppercase gap-5">
            <!-- <div class="py-4 h-full">
                <div class="h-full w-[1px] bg-neutral-200"></div>
            </div> -->
            <NuxtLink href="mailto:chaitanyavootla@proton.me" class="hover:bg-neutral-600 h-full w-full px-5 transition-all duration-300">
                <div class="flex gap-3 items-center h-full">
                    <v-icon icon="mdi-email" />
                    <div>EMail</div>
                </div>
            </NuxtLink>
            <!-- <div class="py-4 h-full">
                <div class="h-full w-[1px] bg-neutral-200"></div>
            </div> -->
            <NuxtLink href="tel:+917899057199" class="hover:bg-neutral-600 h-full w-full px-5 transition-all duration-300">
                <div class="flex gap-3 items-center h-full">
                    <v-icon icon="mdi-phone" />
                    <div>Call</div>
                </div>
            </NuxtLink>
            <!-- <div class="py-4 h-full">
                <div class="h-full w-[1px] bg-neutral-200"></div>
            </div> -->
            <NuxtLink to="/Resume.pdf" target="_blank" class="hover:bg-neutral-600 h-full w-full px-5 transition-all duration-300 pr-10">
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
