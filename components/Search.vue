<template>
  <div id="search">
    <div id="search-input">
      <input type="text" v-model="term" @keyup="onKeyup" />
    </div>

    <entries-list :entries="entries" />
  </div>
</template>

<script>
import EntriesList from '~/components/EntriesList'

export default {
  components: { EntriesList },

  props: {
    entries: Array
  },

  data: () => ({
    term: ''
  }),

  computed: {
    selectedEntry () {
      return this.$store.state.entries.selected
    }
  },

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
          this.submit()
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

    submit () {
      this.$emit('data', this.term)
    },

    navigate (direction) {
      if (this.term.length) {
        this.$store.dispatch('entries/navigate', {
          direction,
          entries: this.$store.state.search.index
        })
      } else {
        // TODO navigate including categories
      }
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
