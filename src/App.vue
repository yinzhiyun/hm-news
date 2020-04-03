<template>
  <div id="app">
    <keep-alive :include="$store.state.catchList">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

