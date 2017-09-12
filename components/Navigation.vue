<template>
  <div>
    <ul class="categories">
      <li v-for="category in categories" :key="category.slug">
        <h3>{{category.name}}</h3>

        <ul class="entries">
          <li v-for="entry in findEntries(category.slug)" :key="entry.title">
            {{entry.title}}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    entries: Array
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
    }
  }
}
</script>
