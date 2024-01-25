<template>
    <div class="flex justify-center pb-10 animate-gradientBG">
        <div class="w-[70%] flex flex-col flex-wrap">
            <Navbar />
            <div class="flex justify-between gap-5">
                <div class="flex justify-between flex-col flex-grow">
                    <div class="about-me text-lg">
                        <div>
                            Software Engineer with <span class="font-semibold">{{ metadata.experience }}</span>
                            of experience in building microservice powered web applications.
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

<style scoped lang="less">
@keyframes gradientBG {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

.animate-gradientBG {
	// background: linear-gradient(-45deg, #fff, #eee, #aaa, #111);
	// background-size: 400% 400%;
	// animation: gradientBG 5s ease infinite;
}
</style>