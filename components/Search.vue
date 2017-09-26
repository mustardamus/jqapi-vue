<template>
  <div>
    <input id="search-input" type="text" v-model="term" @keyup="onKeyup" />
  </div>
</template>

<script>
import { debounce } from 'lodash'

export default {
  data: () => ({
    term: ''
  }),

  methods: {
    onKeyup (e) {
      switch (e.keyCode) {
        case 13: // enter
          this.$emit('select')
          break

        case 27: // esc
          this.term = ''
          this.$emit('data', this.term)
          break

        case 38: // up
          this.$emit('navigate', 'up')
          e.preventDefault()
          break

        case 40: // down
          this.$emit('navigate', 'down')
          e.preventDefault()
          break

        default:
          this.submit()
      }
    },

    submit: debounce(function () {
      this.$emit('data', this.term)
    }, 300)
  }
}
</script>

<style lang="sass" scoped>
input
  width: 100%
  padding: 5px
  border: none
</style>
