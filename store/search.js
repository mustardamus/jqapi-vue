export const state = () => ({
  term: ''
})

export const mutations = {
  setTerm (state, val) {
    state.term = val
  }
}

export const actions = {
  term ({ commit }, term) {
    commit('setTerm', term)
  }
}
