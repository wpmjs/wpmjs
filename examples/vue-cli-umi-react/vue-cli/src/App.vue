<template>
  <div>
    <UmiApp />
  </div>
</template>

<script>
import UmiApp from 'umi/App'
import {applyReactInVue} from "vuereact-combined"

export default {
  name: 'App',
  components: {
    UmiApp: applyReactInVue(UmiApp),
    // Button,
  }
}
</script>

<style>
</style>
