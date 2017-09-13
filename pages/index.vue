<template>
  <div>
    Index Page
  </div>
</template>

<script>
import initActions from '~/plugins/init-actions'

export default {
  asyncData ({ store }) {
    return initActions(store)
  },

  mounted () {
    if (process.browser) {
      const hash = location.hash

      if (hash.includes('#p=')) {
        this.$router.push(`${hash.replace('#p=', '')}`)
      }
    }
  }
}
</script>
