<template>
  <div>
    <div v-for="category in categories" :key="category.slug">
      <h2>{{category.name}}</h2>
      <div v-html="category.desc"></div>
    </div>

    <hr>

    <div v-for="entry in entries" :key="entry.title">
      <h2>{{entry.title}}</h2>
      <p>{{entry.categories.join(',')}}</p>
      <p>{{entry.desc}}</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    categories () {
      return this.$store.state.categories.index
    },

    entries () {
      return this.$store.state.entries.index
    }
  },

  asyncData ({ store }) {
    return Promise.all([
      store.dispatch('categories/load'),
      store.dispatch('entries/load')
    ])
  }
}
</script>
