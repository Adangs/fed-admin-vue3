<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route" />
  </router-view>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
};
</script>

<style>

</style>
