<template>
  <div id="search">
    <div id="search-input">
      <input type="text" v-model="term" @keyup="onKeyup" />
    </div>

    <ul class="entries menu-list">
      <li v-for="entry in entries" :key="entry.name">
        <nuxt-link :to="'/' + entry.slug" v-html="entry.titleHTML" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
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
