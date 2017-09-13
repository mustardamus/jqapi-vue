import $ from '~/plugins/jquery'
import cleanString from '~/plugins/clean-string'

export const state = () => ({
  index: [],
  current: [
    /* {
      type: '',
      name: '',
      return: '',
      title: '',
      desc: '',
      longdesc: ''
    } */
  ]
})

export const mutations = {
  setEntries (state, val) {
    state.index = val
  },

  setCurrentEntry (state, xml) {
    const $el = $(`<root>${xml}</root>`)

    state.current = $el.find('entry').map((i, el) => {
      const $entry = $(el)

      // TODO categories, examples, signatures
      return {
        type: $entry.attr('type'),
        name: $entry.attr('name'),
        return: $entry.attr('return'),
        title: cleanString($entry.find('title').text()),
        desc: cleanString($entry.find('> desc').html()),
        longdesc: cleanString($entry.find('> longdesc').html())
      }
    }).get()
  }
}

export const actions = {
  load ({ commit }) {
    return this.$axios.get('/docs/entries.json')
      .then(res => commit('setEntries', res.data))
  },

  loadEntry ({ commit }, entrySlug) {
    return this.$axios.get(`/docs/entries/${entrySlug}.xml`)
      .then(res => commit('setCurrentEntry', res.data))
  }
}
