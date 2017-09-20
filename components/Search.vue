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

  methods: {
    onKeyup (e) {
      switch (e.keyCode) {
        case 13: // enter
          break
        case 27: // esc
          this.term = ''
          this.submit()
          break
        default:
          this.submit()
      }
    },

    submit () {
      this.$emit('data', this.term)
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
