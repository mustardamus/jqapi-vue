<template>
  <div class="section">
    <div v-for="entry in entries" :key="entry.name">
      <h1 class="title">{{entry.title}}</h1>
      <div class="content" v-html="entry.longdesc" />
    </div>
  </div>
</template>

<script>
import initActions from '~/plugins/init-actions'

export default {
  asyncData ({ store, route, error }) {
    initActions(store)

    return new Promise((resolve, reject) => {
      store.dispatch('entries/loadEntry', route.params.slug)
        .then(() => resolve())
        .catch(() => {
          error({ statusCode: 404, message: 'Entry not found' })
          resolve()
        })
    })
  },

  computed: {
    entries () {
      return this.$store.state.entries.current
    }
  }
}
</script>
