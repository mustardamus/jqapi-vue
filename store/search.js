import fuzzysort from 'fuzzysort'

export const state = () => ({
  term: '',
  index: []
})

export const mutations = {
  setTerm (state, val) {
    state.term = val
  },

  setIndex (state, entries) {
    if (state.term.length === 0) {
      state.index = []
    } else {
      entries = JSON.parse(JSON.stringify(entries)) // make a deep clone

      state.index = entries
        .filter(entry => {
          const result = fuzzysort.single(state.term, entry.title)

          if (result) {
            entry.search = result
            entry.titleHTML = fuzzysort.highlight(result, '<b>', '</b>')
          }

          return result
        })
        .sort((a, b) => {
          const aScore = a.search.score
          const bScore = b.search.score

          return (aScore > bScore) ? -1 : (aScore < bScore) ? 1 : 0
        })
    }
  }
}

export const actions = {
  search ({ commit, rootState }, term) {
    commit('setTerm', term)
    commit('setIndex', rootState.entries.index)
  }
}
