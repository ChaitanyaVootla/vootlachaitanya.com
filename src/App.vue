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
