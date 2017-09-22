<template>
  <div>
    <search
      :entries="searchEntries"
      :selectedEntry="selectedEntry"
      @data="onSearchData"
    />

    <navigation
      :class="{ 'is-hidden': hasSearchTerm }"
      :categories="categories"
      :selectedEntry="selectedEntry"
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
      return this.$store.state.categories.populated
    },

    hasSearchTerm () {
      return this.$store.state.search.term.length
    },

    searchEntries () {
      return this.$store.state.search.index
    },

    selectedEntry () {
      return this.$store.state.entries.selected
    }
  },

  methods: {
    onSearchData (term) {
      this.$store.dispatch('search/search', term)
    }

    // TODO move any $store interaction from the children components to this
    // component, or better, the page
  }
}
</script>
