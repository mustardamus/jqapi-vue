<template>
  <div class="categories menu">
    <div v-for="category in categories" :key="category.slug">
      <h3 class="category-name menu-label" @click="onCategoryClick(category)">
        {{category.name}}
      </h3>

      <entries-list
        :class="{ 'is-hidden': !categoriesOpen[category.slug] }"
        :entries="category.entries"
        :selectedEntry="selectedEntry"
        @entryClick="onEntryClick"
      />
    </div>
  </div>
</template>

<script>
import EntriesList from './EntriesList'

export default {
  components: { EntriesList },

  props: {
    categories: Array,
    selectedEntry: Object
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
    onCategoryClick (category) {
      const slug = category.slug
      const isOpen = this.categoriesOpen[slug]

      this.$set(this.categoriesOpen, slug, !isOpen)
    },

    onEntryClick (entry) {
      this.$store.commit('entries/setSelected', entry)
      this.$router.push(`/${entry.slug}`)
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
