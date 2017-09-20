<template>
  <div>
    <input type="text" v-model="term" @keyup="onKeyup" />
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
