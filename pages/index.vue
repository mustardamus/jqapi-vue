<template>
  <div>
    <div v-for="category in categories" :key="category.slug">
      {{category.name}}
      <div v-html="category.desc"></div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    categories () {
      return this.$store.state.categories.index
    }
  },

  asyncData ({ store }) {
    return store.dispatch('categories/load')
  }
}
</script>
