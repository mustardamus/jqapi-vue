import { cloneDeep } from 'lodash'
import $ from '~/plugins/jquery'
import cleanString from '~/plugins/clean-string'

export const state = () => ({
  index: [],
  populated: [],
  open: {}
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
      const index = cloneDeep(state.index)

      state.populated = index.map(category => {
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
  },

  setCategoriesOpen (state) {
    state.index.forEach(category => {
      state.open[category.slug] = false
    })
  },

  setCategoryOpenToggle (state, category) {
    const slug = category.slug
    state.open[slug] = !state.open[slug]
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
            commit('setCategoriesOpen')
            resolve()
          })
          .catch(err => reject(err))
      }
    })
  }
}
