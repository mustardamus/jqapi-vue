<template>
  <div class="categories menu">
    <div v-for="category in categories" :key="category.slug">
      <h3 class="category-name menu-label" @click="onCategoryClick(category)">
        {{category.name}}
      </h3>

      <entries-list
        :entries="findEntries(category.slug)"
        :class="{ 'is-hidden': !categoriesOpen[category.slug] }"
      />
    </div>
  </div>
</template>

<script>
import EntriesList from '~/components/EntriesList'

export default {
  components: { EntriesList },

  props: {
    categories: Array,
    entries: Array
  },

  data: () => ({
    categoriesOpen: {}
  }),

  mounted () {
    this.categories.forEach(category => {
      this.$set(this.categoriesOpen, category.slug, false)
    })
  },

  methods: {
    findEntries (categorySlug) {
      return this.entries
        .filter(entry => {
          return entry.categories.filter(category => {
            return category.includes(categorySlug)
          }).length
        })
        .sort((a, b) => {
          return (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0
        })
    },

    onCategoryClick (category) {
      const slug = category.slug
      const isOpen = this.categoriesOpen[slug]

      this.$set(this.categoriesOpen, slug, !isOpen)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/sass/variables"

.menu-label
  cursor: pointer
  font-size: 1em
  background: $color3
  margin: 0
  padding: 10px
  color: #222
  border-bottom: 1px solid $color4

  &:hover
    background: $color4
    color: white

  &:last-child
    border-bottom: none
</style>
