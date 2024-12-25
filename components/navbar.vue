<template>
    <div class="flex justify-center bg-black">
        <div class="flex justify-between items-center h-20 md:mb-10 max-md:mb-5
            overflow-hidden w-full md:w-[63%] max-md:!text-xs border-[1px] bg-neutral-950 border-neutral-800 rounded-b-xl
            shadow-inner shadow-neutral-800">
            <div class="max-md:!text-sm text-3xl uppercase font-bold flex-grow flex ml-10">
                <div class="tracking-widest [word-spacing:10px] font-light">Chaitanya Vootla</div>
                <div class="cursor-effect ml-1">_</div>
            </div>
            <div class="flex h-full items-center uppercase text-sm">
                <NuxtLink href="mailto:chaitanyavootla@proton.me" class="hover:bg-neutral-600 h-full w-full px-5 transition-all duration-300">
                    <div class="flex gap-3 items-center h-full">
                        <v-icon icon="mdi-email" />
                        <div class="max-md:hidden">EMail</div>
                    </div>
                </NuxtLink>
                <NuxtLink href="tel:+917899057199" class="hover:bg-neutral-600 h-full w-full px-5 transition-all duration-300">
                    <div class="flex gap-3 items-center h-full">
                        <v-icon icon="mdi-phone" />
                        <div class="max-md:hidden">Call</div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/Resume.pdf" target="_blank" class="hover:bg-neutral-600 h-full w-full px-5 transition-all duration-300 pr-10">
                    <div class="flex gap-3 items-center h-full">
                        <v-icon icon="mdi-download" />
                        <div class="max-md:hidden">Resume</div>
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped lang="less">
.cursor-effect {
    animation: blink-animation 1s steps(3, start) infinite;
}

@keyframes blink-animation {
    to {
        visibility: hidden;
    }
}
</style>
