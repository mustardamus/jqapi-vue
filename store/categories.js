import $ from '~/plugins/jquery'
import cleanString from '~/plugins/clean-string'

export const state = () => ({
  index: []
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
