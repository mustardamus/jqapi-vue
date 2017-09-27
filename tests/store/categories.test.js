import { state, mutations, actions } from '~/store/categories'

const contextMock = {
  $axios: {
    get (url) {
      return new Promise(resolve => resolve({ data: url }))
    }
  }
}

describe('Categories Store', () => {
  it('should export needed stuff', () => {
    expect(state).toBeTruthy()
    expect(mutations).toBeTruthy()
    expect(actions).toBeTruthy()
  })

  it('should send a request on load action if index empty', () => {
    const commit = jest.fn()
    const state = { index: [] }

    return actions.load.call(contextMock, { commit, state }).then(res => {
      expect(commit.mock.calls.length).toBe(2)
      expect(commit.mock.calls[0][0]).toBe('setCategoriesFromXML')
      expect(commit.mock.calls[0][1]).toBe('/docs/categories.xml')
      expect(commit.mock.calls[1][0]).toBe('setCategoriesOpen')
    })
  })

  it('should not send a request on load action if index not empty', () => {
    const commit = jest.fn()
    const state = { index: ['loaded'] }

    return actions.load.call(contextMock, { commit, state }).then(res => {
      expect(commit.mock.calls.length).toBe(0)
    })
  })

  it('should parse the categories and update the state', () => {
    const categoriesXML = `<?xml version="1.0"?>
    <categories>
      <category name="Single Category" slug="single-category">
        <desc><![CDATA[Single Category Description]]></desc>
      </category>
      <category name="With Sub-Categories" slug="with-sub-categories">
        <desc><![CDATA[With Sub-Categories Description]]></desc>
        <category name="Sub-Category 1" slug="sub-category-1">
          <desc><![CDATA[Sub-Category 1 Description]]></desc>
        </category>
        <category name="Sub-Category 2" slug="sub-category-2">
          <desc><![CDATA[Sub-Category 2 Description]]></desc>
        </category>
      </category>
    </categories>`

    const check = [
      {
        name: 'Single Category',
        slug: 'single-category',
        desc: 'Single Category Description',
        categories: []
      },
      {
        name: 'With Sub-Categories',
        slug: 'with-sub-categories',
        desc: 'With Sub-Categories Description',
        categories: [
          {
            name: 'Sub-Category 1',
            slug: 'sub-category-1',
            desc: 'Sub-Category 1 Description',
            categories: []
          },
          {
            name: 'Sub-Category 2',
            slug: 'sub-category-2',
            desc: 'Sub-Category 2 Description',
            categories: []
          }
        ]
      }
    ]

    const state = { index: [] }

    mutations.setCategoriesFromXML(state, categoriesXML)
    expect(state.index).toEqual(check)
  })

  it('should create a entries popluated categories list', () => {
    const state = {
      index: [
        { name: 'Cat1', slug: 'cat1' },
        { name: 'Cat2', slug: 'cat2' },
        { name: 'Cat3', slug: 'cat3' }
      ],
      populated: []
    }

    const entries = [
      { title: 'cEntry()', slug: 'cEntry', categories: ['cat2', 'cat3'] },
      { title: 'aEntry()', slug: 'aEntry', categories: ['cat1', 'cat3'] },
      { title: 'bEntry()', slug: 'bEntry', categories: ['cat2'] }
    ]

    mutations.populateWithEntries(state, entries)

    expect(state.populated.length).toBe(state.index.length)
    expect(state.populated[0].entries.length).toBe(1)
    expect(state.populated[1].entries.length).toBe(2)
    expect(state.populated[2].entries[0].slug).toBe('aEntry')
    expect(state.populated[2].entries[1].slug).toBe('cEntry')
  })

  it('should create a open state for each category', () => {
    const state = {
      index: [
        { slug: 'cat1' },
        { slug: 'cat2' }
      ],
      open: {}
    }

    mutations.setCategoriesOpen(state)
    expect(state.open).toEqual({ cat1: false, cat2: false })
  })

  it('should toggle the open state of a category', () => {
    const state = {
      open: { cat: false }
    }

    mutations.setCategoryOpenToggle(state, { slug: 'cat' })
    expect(state.open.cat).toBe(true)
  })
})
