<template>
  <div>
    <navigation :categories="categories" :entries="entries" />
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
  },

  asyncData ({ store }) {
    return Promise.all([
      store.dispatch('categories/load'),
      store.dispatch('entries/load')
    ])
  }
}
</script>
