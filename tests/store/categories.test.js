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
      expect(commit.mock.calls.length).toBe(1)
      expect(commit.mock.calls[0][0]).toBe('setCategoriesFromXML')
      expect(commit.mock.calls[0][1]).toBe('/docs/categories.xml')
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
})
