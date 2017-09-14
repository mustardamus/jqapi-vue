<template>
  <div class="section">
    <div v-for="entry in entries" :key="entry.name">
      <h1 class="title is-1">{{entry.title}}</h1>

      <h3 class="title is-3">Signatures</h3>

      <div v-for="(i, signature) in entry.signatures" :key="'sig' + i">
        <h4 class="title is-4">
          Added: {{signature.added}}
        </h4>

        <table class="table is-striped is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="argument in signature.arguments" :key="argument.name">
              <td width="20%">{{argument.name}}</td>
              <td width="20%">{{argument.type}}</td>
              <td v-html="argument.desc"></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="content" v-html="entry.longdesc" />

      <h3 class="title is-3">Examples</h3>

      <div class="columns" v-for="example in entry.examples" :key="example.code">
        <div class="column is-4">
          <pre>{{example.html}}</pre>
        </div>
        <div class="column is-4">
          <pre>{{example.code}}</pre>
        </div>
        <div class="column is-4">
          <pre>{{example.css}}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import initActions from '~/plugins/init-actions'

export default {
  asyncData ({ store, route, error }) {
    initActions(store)

    return new Promise((resolve, reject) => {
      store.dispatch('entries/loadEntry', route.params.slug)
        .then(() => resolve())
        .catch(() => {
          error({ statusCode: 404, message: 'Entry not found' })
          resolve()
        })
    })
  },

  computed: {
    entries () {
      return this.$store.state.entries.current
    }
  }
}
</script>
