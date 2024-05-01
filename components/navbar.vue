<template>
    <div class="flex justify-center">
        <div class="flex justify-between items-center h-20 md:mb-10 max-md:mb-5
            overflow-hidden w-full md:px-[15%]
            bg-neutral-50 shadow-md shadow-neutral-200 max-md:!text-xs">
            <div class="name max-md:!text-sm text-2xl uppercase font-medium flex-grow flex ml-10">
                <div class="tracking-widest [word-spacing:10px]">Chaitanya Vootla</div>
                <div class="cursor-effect ml-1">_</div>
            </div>
            <div class="flex h-full items-center uppercase">
                <NuxtLink href="mailto:chaitanyavootla@proton.me" class="hover:bg-neutral-600 h-full w-full px-5 transition-all duration-300">
                    <div class="flex gap-3 items-center h-full">
                        <v-icon icon="mdi-email" />
                        <div>EMail</div>
                    </div>
                </NuxtLink>
                <NuxtLink href="tel:+917899057199" class="hover:bg-neutral-600 h-full w-full px-5 transition-all duration-300">
                    <div class="flex gap-3 items-center h-full">
                        <v-icon icon="mdi-phone" />
                        <div>Call</div>
                    </div>
                </NuxtLink>
                <NuxtLink to="/Resume.pdf" target="_blank" class="hover:bg-neutral-600 h-full w-full px-5 transition-all duration-300 pr-10">
                    <div class="flex gap-3 items-center h-full">
                        <v-icon icon="mdi-download" />
                        <div>Resume</div>
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
