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

    <categories
      id="categories"
      :class="{ 'is-hidden': hasSearchTerm }"
      :categories="categories"
      :categoriesOpen="categoriesOpen"
      :selectedEntry="selectedEntry"
      @categoryClick="onCategoryClick"
      @entryClick="onEntryClick"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import Search from './Search'
import EntriesList from './EntriesList'
import Categories from './Categories'

export default {
  components: { Search, EntriesList, Categories },

  computed: {
    categories () {
      return this.$store.state.categories.populated
    },

    categoriesOpen () {
      return this.$store.state.categories.open
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

      if (this.searchEntries[0]) {
        this.$store.commit('entries/setSelected', this.searchEntries[0])
      }
    },

    onNavigate (direction) {
      this.$store.dispatch('entries/navigate', direction)

      Vue.nextTick(() => {
        const el = this.$el.querySelector('.is-active')
        const top = el.getBoundingClientRect().top
        const height = this.$el.querySelector('#search').offsetHeight

        this.$el.scrollTop += top - height
      })
    },

    onSelect () {
      this.$router.push(`/${this.selectedEntry.slug}`)
    },

    onCategoryClick (category) {
      this.$store.commit('categories/setCategoryOpenToggle', category)
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
