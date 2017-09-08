import Vue from 'vue'
import { JSDOM } from 'jsdom'
import IndexPage from './index.vue'

const renderer = require('vue-server-renderer').createRenderer()

describe('Index Page', () => {
  it('should have the correct title', () => {
    const Component = Vue.extend(IndexPage)
    const component = new Component().$mount()

    renderer.renderToString(component, (err, str) => {
      if (err) {
        throw err
      }

      const dom = new JSDOM(str)
      const firstHeading = dom.window.document.querySelector('h1')

      expect(firstHeading.textContent).toBe('Hi there! What\'s up?')
    })
  })
})
