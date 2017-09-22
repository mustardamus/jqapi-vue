import $ from '~/plugins/jquery'
import cleanString from '~/plugins/clean-string'

export const state = () => ({
  index: [],
  populated: []
})

const getSubCategories = $parent => {
  return $parent.children('category').map((i, el) => {
    const $el = $(el)

    return {
      name: $el.attr('name'),
      slug: $el.attr('slug'),
      desc: $el.children('desc').html(),
      categories: getSubCategories($el)
    }
  }).get()
}

export const mutations = {
  setCategoriesFromXML (state, xml) {
    const body = `<div>${cleanString(xml)}</div>`
    const $categories = $(body).children('categories')
    state.index = getSubCategories($categories)
  },

  populateWithEntries (state, entries) {
    if (state.populated.length === 0) {
      // TODO clone index, so it is not mutated
      state.populated = state.index.map(category => {
        category.entries = entries
          .filter(entry => {
            return entry.categories.filter(cats => {
              return cats.includes(category.slug)
            }).length
          })
          .sort((a, b) => {
            return (a.title < b.title) ? -1 : (a.title > b.title) ? 1 : 0
          })

        return category
      })
    }
  }
}

export const actions = {
  load ({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.index.length !== 0) {
        resolve()
      } else {
        this.$axios.get('/docs/categories.xml')
          .then(res => {
            commit('setCategoriesFromXML', res.data)
            resolve()
          })
          .catch(err => reject(err))
      }
    })
  }
}
