<template>
<nav class="relative sticky p-1 text-xl font-bold top-0 bg-white text-left" >

   <router-link class="px-2 mx-1 hover:bg-slate-200 text-center" :to="{ name: 'home' }">Home</router-link>
   <router-link class="px-2 mx-1 hover:bg-slate-200 text-center" :to="{name:'canban',params:{id:'1'}}">kanban</router-link>
   <router-link class="px-2 mx-1 hover:bg-slate-200 text-center" :to="{name:'About'}">About</router-link>
   <router-link class="px-2 mx-1 hover:bg-slate-200 text-center" :to="{name:'ResourceNotFound',params:{resource:'page'}}">Profile</router-link>
</nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
