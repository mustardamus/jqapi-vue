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
      longdesc: '',
      signatures: [
        {
          added: '',
          arguments: [
            name: '',
            type: '',
            desc: ''
          ]
        }
      ]
    } */
  ]
})

const getSignatures = $entry => {
  return $entry.find('signature').map((i, sig) => {
    const $sig = $(sig)
    const args = $sig.find('argument').map((i, arg) => {
      const $arg = $(arg)

      return {
        name: $arg.attr('name'),
        type: $arg.attr('type'),
        desc: cleanString($arg.find('desc').html())
      }
    }).get()

    return {
      added: cleanString($sig.find('added').text()),
      arguments: args
    }
  }).get()
}

export const mutations = {
  setEntries (state, val) {
    state.index = val
  },

  setCurrentEntry (state, xml) {
    const $el = $(`<root>${xml}</root>`)

    state.current = $el.find('entry').map((i, el) => {
      const $entry = $(el)

      // TODO categories, examples
      // TODO set name in parent object as entry 2 usually dont have the name field
      return {
        type: $entry.attr('type'),
        name: $entry.attr('name'),
        return: $entry.attr('return'),
        title: cleanString($entry.find('title').text()),
        desc: cleanString($entry.find('> desc').html()),
        longdesc: cleanString($entry.find('> longdesc').html()),
        signatures: getSignatures($entry)
      }
    }).get()
  }
}

export const actions = {
  load ({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.index.length !== 0) {
        resolve()
      } else {
        this.$axios.get('/docs/entries.json')
          .then(res => {
            commit('setEntries', res.data)
            resolve()
          })
          .catch(err => reject(err))
      }
    })
  },

  loadEntry ({ commit }, entrySlug) {
    return this.$axios.get(`/docs/entries/${entrySlug}.xml`)
      .then(res => commit('setCurrentEntry', res.data))
  }
}
