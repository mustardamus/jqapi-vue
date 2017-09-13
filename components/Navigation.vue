<template>
  <div class="categories menu">
    <div v-for="category in categories" :key="category.slug">
      <h3 class="category-name menu-label" @click="onCategoryClick(category)">
        {{category.name}}
      </h3>

      <ul :class="{
        entries: true,
        'menu-list': true,
        'is-hidden': !categoriesOpen[category.slug]
      }">
        <li v-for="entry in findEntries(category.slug)" :key="entry.title">
          <a>{{entry.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
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
.menu
  padding: 10px

.menu-label
  cursor: pointer
  font-size: 1em

  &:hover
    color: #111
</style>
