<template>
  <ul class="menu-list">
    <li
      v-for="entry in entries" :key="entry.name"
      :class="{ 'is-active': entry.slug === selectedEntry.slug }"
    >
      <a class="is-unselectable" @click="onEntryClick(entry)">
        <span class="entry-title" v-html="entry.titleHTML || entry.title" />
        <span class="entry-desc" v-html="entry.desc" />
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    entries: Array,
    selectedEntry: {
      type: Object,
      default: () => ({ slug: '' })
    }
  },

  methods: {
    onEntryClick (entry) {
      this.$emit('entryClick', entry)
    }
  }
}
</script>

<style lang="sass" scoped>
@import "~assets/sass/variables"

.menu-list
  li
    &:nth-child(odd) a
      background: $color2

    &.is-active, &:hover
      a
        background: $color5
        box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.2)

        .entry-title
          color: white
          text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.2)

        .entry-desc
          color: #444

    &:hover:not(.is-active) a
      background: $color4

    a
      border-radius: 0

      .entry-title
        display: block

      .entry-desc
        display: block
        width: 10000px
        color: #999
        font-size: 0.8em
        margin-top: 2px
</style>
