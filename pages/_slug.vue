<template>
  <div>
    <h1 class="title">{{$route.params.slug}}</h1>
  </div>
</template>

<script>
import initActions from '~/plugins/init-actions'

export default {
  asyncData ({ store }) {
    return initActions(store)
  }
}
</script>
