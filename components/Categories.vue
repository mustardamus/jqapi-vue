<template>
  <div class="menu">
    <div
      v-for="category in categories" :key="category.slug"
      :class="{ 'is-active': categoriesOpen[category.slug] }"
    >
      <h3 class="menu-label is-unselectable" @click="onCategoryClick(category)">
        <span class="arrow"></span>
        <span class="category-name">{{category.name}}</span>
      </h3>

      <entries-list
        class="entries"
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
    selectedEntry: Object,
    categoriesOpen: Object
  },

  methods: {
    onCategoryClick (category) {
      this.$emit('categoryClick', category)
    },

    onEntryClick (entry) {
      this.$emit('entryClick', entry)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/sass/variables"

.menu
  position: relative
  z-index: 1

  .menu-label
    cursor: pointer
    font-size: 1em
    background: $color3
    margin: 0
    padding: 10px
    color: #222
    border-bottom: 1px solid $color4
    position: relative

    .arrow
      width: 0
      height: 0
      border-style: solid
      border-width: 7.5px 0 7.5px 13.0px
      border-color: transparent transparent transparent $color4
      position: absolute
      top: 15px
      left: 10px

    .category-name
      padding-left: 20px

    &:hover
      background: $color4
      color: white

      .arrow
        border-color: transparent transparent transparent $color5

    &:last-child
      border-bottom: none

  .entries
    display: none

  .is-active
    .entries
      display: block

    .arrow
      transform: rotate(90deg)
</style>
