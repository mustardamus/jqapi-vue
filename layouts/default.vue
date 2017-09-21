<template>
  <div id="layout" class="container-fluid">
    <div class="columns is-gapless">
      <div id="sidebar-wrapper" class="column is-3">
        <sidebar id="sidebar" />
      </div>
      <div class="column">
        <div id="content">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar'

export default {
  components: { Sidebar },

  mounted () {
    if (process.browser) {
      window.onkeyup = this.onKeyUp
    }
  },

  methods: {
    onKeyUp (e) {
      const keyCode = e.keyCode ? e.keyCode : e.which

      switch (keyCode) {
        case 27: // ESC
          document.querySelector('#search-input input').focus()
          break
      }
    }
  }
}
</script>

<style lang="sass">
@import "~assets/sass/variables"

html, body, #__nuxt, #layout, #layout > .columns
  height: 100%

#sidebar-wrapper
  overflow: hidden
  position: relative

#sidebar
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  overflow-x: hidden
  overflow-y: scroll
  background: $color1
  border-right: 1px solid $color5

#content
  position: relative
  width: 100%
  height: 100%
  overflow: scroll
</style>
