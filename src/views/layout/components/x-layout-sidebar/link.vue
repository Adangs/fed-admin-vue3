<template>
  <component v-if="isExternalLink" :is="'a'" :href="to" target="_blank">
    <slot/>
  </component>
  <component v-else :is="'router-link'" :to="to">
    <slot/>
  </component>
</template>

<script>
import { isExternal } from '@/utils';

export default {
  props: {
    to: {
      type: String,
      required: true,
    },
  },
  computed: {
    isExternalLink() {
      return isExternal(this.to);
    },
  },
};
</script>
