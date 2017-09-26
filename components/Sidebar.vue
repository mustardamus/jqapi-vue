<template>
  <div id="sidebar">
    <search
      id="search"
      @data="onSearchData"
      @navigate="onNavigate"
      @select="onSelect"
    />

    <entries-list
      id="search-entries"
      :class="{ 'is-hidden': !hasSearchTerm }"
      :entries="searchEntries"
      :selectedEntry="selectedEntry"
      @entryClick="onEntryClick"
    />

    <navigation
      id="navigation"
      :class="{ 'is-hidden': hasSearchTerm }"
      :categories="categories"
      :selectedEntry="selectedEntry"
    />
  </div>
</template>

<script>
import Search from './Search'
import EntriesList from './EntriesList'
import Navigation from './Navigation'

export default {
  components: { Search, EntriesList, Navigation },

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
    },

    onNavigate (direction) {
      if (this.hasSearchTerm) {
        this.$store.dispatch('entries/navigate', {
          direction,
          entries: this.$store.state.search.index
        })
      } else {
        // TODO navigate including categories
      }
    },

    onSelect () {
      this.$router.push(`/${this.selectedEntry.slug}`)
    },

    onEntryClick (entry) {
      this.$store.commit('entries/setSelected', entry)
      this.$router.push(`/${entry.slug}`)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/sass/variables"

#sidebar
  position: relative

#search
  position: sticky
  top: 0
  left: 0
  width: 100%
  background: $color5
  padding: 5px 6px 7px 6px
  z-index: 2
</style>
