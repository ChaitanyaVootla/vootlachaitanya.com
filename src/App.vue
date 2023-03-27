<template>
    <router-view />
</template>

<style lang="less">
@import "~/src/assets/styles/main.less";
body {
    height: 100%;
    margin: 0;
    width: 70%;
    margin-left: 15%;
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #222;
    background: rgb(248, 248, 248);
    margin-bottom: 2rem;
    
    // margin: 0;
    // height: 100vh;
    // background: linear-gradient(45deg, #ffffff, #e4d5d0, #d0e9ef);
    // background-size: 600% 600%;
    // animation: gradientAnimation 12s ease infinite;
}

@keyframes gradientAnimation {
  0% {background-position: 0% 50%;}
  50% {background-position: 100% 50%;}
  100% {background-position: 0% 50%;}
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
