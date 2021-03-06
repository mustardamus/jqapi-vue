import { mount } from 'avoriaz'
import Categories from '~/components/Categories'

describe('Categories Component', () => {
  const commit = jest.fn()
  const state = {
    categories: {
      index: [],
      open: {
        cat1: false,
        cat2: false,
        cat3: false
      }
    },
    entries: { index: [] },
    search: { term: '' }
  }
  const comp = mount(Categories, {
    globals: {
      $store: { state, commit }
    },
    propsData: {
      categories: [
        {
          name: 'Category 1',
          slug: 'cat1',
          desc: 'Category 1 Desc',
          entries: [
            { title: 'Cat1Ent1', slug: 'cat1ent1', desc: 'Cat1Ent1 Desc' },
            { title: 'Cat1Ent2', slug: 'cat1ent2', desc: 'Cat1Ent2 Desc' }
          ]
        },
        {
          name: 'Category 2',
          slug: 'cat2',
          desc: 'Category 2 Desc',
          entries: [
            { title: 'Cat2Ent1', slug: 'cat2ent1', desc: 'Cat2Ent1 Desc' },
            { title: 'Cat2Ent2', slug: 'cat2ent2', desc: 'Cat2Ent2 Desc' }
          ]
        },
        {
          name: 'Category 3',
          slug: 'cat3',
          desc: 'Category 3 Desc',
          entries: [
            { title: 'Cat3Ent1', slug: 'cat3ent1', desc: 'Cat3Ent1 Desc' }
          ]
        }
      ]
    }
  })

  const entriesLis = i => comp.find('.menu > div')[i].find('.menu-list > li')

  it('should render the categories', () => {
    expect(comp.find('.menu > div').length).toBe(3)
  })

  it('should render the entries', () => {
    expect(entriesLis(0)).toHaveLength(2)
    expect(entriesLis(1)).toHaveLength(2)
    expect(entriesLis(2)).toHaveLength(1)
  })

  it('should have the entries initially closed', () => {
    expect(comp.find('.menu > div')[0].hasClass('is-active')).toBe(false)
  })

  it('should remove the hidden class if category title is clicked', () => {
    // comp.find('.menu-label')[0].trigger('click')
    // expect(comp.find('.menu > div')[0].hasClass('is-active')).toBe(true)
    // TODO fixme
  })
})
