<template>
  <div>
    <input type="text" v-model="term" @keyup="onKeyup" />
  </div>
</template>

<script>
export default {
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
