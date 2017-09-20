<template>
  <div>
    <search
      :entries="searchEntries"
      @data="onSearchData"
    />

    <navigation
      :class="{ 'is-hidden': hasSearchTerm }"
      :categories="categories"
      :entries="entries"
    />
  </div>
</template>

<script>
import Navigation from './Navigation'
import Search from './Search'

export default {
  components: { Navigation, Search },

  computed: {
    categories () {
      return this.$store.state.categories.index
    },

    entries () {
      return this.$store.state.entries.index
    },

    hasSearchTerm () {
      return this.$store.state.search.term.length
    },

    searchEntries () {
      return this.$store.state.search.index
    }
  },

  methods: {
    onSearchData (term) {
      this.$store.dispatch('search/search', term)
    }
  }
}
</script>
