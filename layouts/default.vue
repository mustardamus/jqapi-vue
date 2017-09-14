<template>
  <div id="layout" class="container-fluid">
    <div class="columns">
      <div class="column is-2">
        <navigation id="navigation" :categories="categories" :entries="entries" />
      </div>
      <div class="column">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import Navigation from '~/components/Navigation'

export default {
  components: { Navigation },

  computed: {
    categories () {
      return this.$store.state.categories.index
    },

    entries () {
      return this.$store.state.entries.index
    }
  }
}
</script>

<style lang="sass">
html, body, #__nuxt, #layout, #navigation
  height: 100%

#navigation
  overflow-x: hidden
  overflow-y: scroll
  position: fixed
  top: 0
  left: 0
</style>
