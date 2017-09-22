export default store => {
  return Promise.all([
    store.dispatch('categories/load'),
    store.dispatch('entries/load')
  ]).then(() => {
    store.commit('categories/populateWithEntries', store.state.entries.index)
  })
}
