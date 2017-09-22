<template>
  <div id="search">
    <div id="search-input">
      <input type="text" v-model="term" @keyup="onKeyup" />
    </div>

    <entries-list
      :entries="entries"
      :selectedEntry="selectedEntry"
      @entryClick="onEntryClick"
    />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import EntriesList from '~/components/EntriesList'

export default {
  components: { EntriesList },

  props: {
    entries: Array,
    selectedEntry: Object
  },

  data: () => ({
    term: ''
  }),

  methods: {
    onKeyup (e) {
      switch (e.keyCode) {
        case 13: // enter
          if (this.selectedEntry.slug) {
            this.$router.push(`/${this.selectedEntry.slug}`)
          }
          break

        case 27: // esc
          this.term = ''
          this.$emit('data', this.term)
          break

        case 38: // up
          this.navigate('up')
          e.preventDefault()
          break

        case 40: // down
          this.navigate('down')
          e.preventDefault()
          break

        default:
          this.submit()
      }
    },

    submit: debounce(function () {
      this.$emit('data', this.term)
    }, 300),

    navigate (direction) {
      if (this.term.length) {
        this.$store.dispatch('entries/navigate', {
          direction,
          entries: this.$store.state.search.index
        })
      } else {
        // TODO navigate including categories
      }
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

#search
  position: relative

#search-input
  position: sticky
  top: 0
  left: 0
  width: 100%
  background: $color5
  padding: 5px 6px 7px 6px

  input
    width: 100%
    padding: 5px
    border: none
</style>
