<template>
  <div id="layout" class="container-fluid">
    <div class="columns">
      <div class="column is-2">
        <sidebar id="sidebar" />
      </div>
      <div class="column">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar'

export default {
  components: { Sidebar }
}
</script>

<style lang="sass">
html, body, #__nuxt, #layout, #sidebar
  height: 100%

#sidebar
  overflow-x: hidden
  overflow-y: scroll
  position: fixed
  top: 0
  left: 0
</style>
