export default store => {
  // TODO cache requests for categories and entries / check if already loaded

  return Promise.all([
    store.dispatch('categories/load'),
    store.dispatch('entries/load')
  ])
}
