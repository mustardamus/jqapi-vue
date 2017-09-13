<template>
  <div>
    Index Page
  </div>
</template>

<script>
export default {
  asyncData ({ store }) {
    // TODO put the init calls in a plugin, since this must be called on multiple pages
    // TODO cache requests for categories and entries / check if already loaded

    return Promise.all([
      store.dispatch('categories/load'),
      store.dispatch('entries/load')
    ])
  }
}
</script>
