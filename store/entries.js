export const state = () => ({
  index: []
})

export const mutations = {
  setEntries (state, val) {
    state.index = val
  }
}

export const actions = {
  load ({ commit }) {
    return this.$axios.get('/docs/entries.json')
      .then(res => commit('setEntries', res.data))
  }
}
