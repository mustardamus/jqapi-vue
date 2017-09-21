import $ from '~/plugins/jquery'
import cleanString from '~/plugins/clean-string'

export const state = () => ({
  index: [],
  selected: {
    /*
      title: '',
      slug: '',
      desc: '',
      categories: []
    */
  },
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

const getCategories = $entry => {
  return $entry.find('category').map((i, el) => {
    return $(el).attr('slug')
  }).get()
}

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

const getExamples = $entry => {
  return $entry.find('example').map((i, example) => {
    const $example = $(example)
    const get = tagName => {
      const html = $example.find(tagName).html() || ''
      return cleanString(html)
    }

    return {
      desc: get('desc'),
      code: get('code'),
      css: get('css'),
      html: get('markup')
    }
  }).get()
}

export const mutations = {
  setEntries (state, val) {
    state.index = val
  },

  setSelected (state, val) {
    state.selected = val
  },

  setCurrentEntry (state, xml) {
    // <html> in the examples is stripped away when parsing the xml code
    // so simply rename in to <markup> and parse this
    xml = cleanString(xml)
      .replace(/<html>/gi, '<markup>')
      .replace(/<\/html>/gi, '</markup>')

    const $el = $(`<root>${xml}</root>`)

    state.current = $el.find('entry').map((i, el) => {
      const $entry = $(el)

      // TODO set name/title in parent object as entry 2 usually dont have the name/title field
      return {
        type: $entry.attr('type'),
        name: $entry.attr('name'),
        return: $entry.attr('return'),
        title: cleanString($entry.find('title').text()),
        desc: cleanString($entry.find('> desc').html()),
        longdesc: cleanString($entry.find('> longdesc').html()),
        categories: getCategories($entry),
        signatures: getSignatures($entry),
        examples: getExamples($entry)
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
  },

  navigate ({ commit, state }, { direction, entries }) {
    const selected = state.selected
    let newIndex = 0

    if (selected.slug) {
      const index = entries.findIndex(entry => entry.slug === selected.slug)

      if (direction === 'down') {
        if (index + 1 < entries.length) {
          newIndex = index + 1
        }
      } else {
        if (index - 1 < 0) {
          newIndex = entries.length - 1
        } else {
          newIndex = index - 1
        }
      }
    }

    commit('setSelected', entries[newIndex])
  }
}
