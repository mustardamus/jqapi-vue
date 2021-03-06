import { state, mutations, actions } from '~/store/entries'

const contextMock = {
  $axios: {
    get (url) {
      return new Promise(resolve => resolve({ data: url }))
    }
  }
}

const singleEntryXML = `<?xml version="1.0"?>
<entry type="method" name="singleEntry" return="string">
  <title>.singleEntry()</title>

  <desc>Entry Desc</desc>
  <longdesc><p>Entry Longdesc</p></longdesc>

  <category slug="singleentry/cat1"/>
  <category slug="singleentry/cat2"/>

  <signature>
    <added>1.0</added>
    <argument name="selector" type="Selector">
      <desc>Signature 1 Desc</desc>
    </argument>
  </signature>
  <signature>
    <added>1.4</added>
    <argument name="elements" type="Element">
      <desc>Signature 2 Arg1 Desc</desc>
    </argument>

    <argument name="text" type="String">
      <desc>Signature 2 Arg2 Desc</desc>
    </argument>
  </signature>

  <example>
    <desc>Example 1 Desc</desc>
    <code><![CDATA[
      Example 1 Code
    ]]></code>
    <css><![CDATA[
      Example 1 CSS
    ]]></css>
    <html><![CDATA[
      Example 1 HTML
    ]]></html>
  </example>

  <example>
    <desc>Example 2 Desc</desc>
    <code><![CDATA[
      Example 2 Code
    ]]></code>
    <css><![CDATA[
      Example 2 CSS
    ]]></css>
    <html><![CDATA[
      Example 2 HTML
    ]]></html>
  </example>
</entry>`

const multiEntriesXML = `<?xml version="1.0"?>
<entries>
  <entry type="method" name="multiEntry1" return="string">
    <title>.multiEntry1()</title>

    <desc>Entry 1 Desc</desc>
    <longdesc><p>Entry 1 Longdesc</p></longdesc>

    <category slug="multientry1/cat1"/>
    <category slug="multientry1/cat2"/>

    <signature>
      <added>1.0</added>
      <argument name="selector" type="Selector">
        <desc>Signature 1 Desc</desc>
      </argument>
    </signature>

    <example>
      <desc>Example 1 Desc</desc>
      <code><![CDATA[
        Example 1 Code
      ]]></code>
      <css><![CDATA[
        Example 1 CSS
      ]]></css>
      <html><![CDATA[
        Example 1 HTML
      ]]></html>
    </example>

    <example>
      <desc>Example 2 Desc</desc>
      <code><![CDATA[
        Example 2 Code
      ]]></code>
      <css><![CDATA[
        Example 2 CSS
      ]]></css>
      <html><![CDATA[
        Example 2 HTML
      ]]></html>
    </example>
  </entry>

  <entry type="method" name="multiEntry2" return="string">
    <title>.multiEntry2()</title>

    <desc>Entry 2 Desc</desc>
    <longdesc><p>Entry 2 Longdesc</p></longdesc>

    <category slug="multientry2/cat1"/>
    <category slug="multientry2/cat2"/>

    <signature>
      <added>1.0</added>
      <argument name="selector" type="Selector">
        <desc>Signature 1 Desc</desc>
      </argument>
      <argument name="text" type="Stringr">
        <desc>Signature 1 Desc</desc>
      </argument>
    </signature>

    <example>
      <desc>Example 1 Desc</desc>
      <code><![CDATA[
        Example 1 Code
      ]]></code>
      <css><![CDATA[
        Example 1 CSS
      ]]></css>
      <html><![CDATA[
        Example 1 HTML
      ]]></html>
    </example>
  </entry>
</entries>`

const singleEntryJSON = {
  type: 'method',
  name: 'singleEntry',
  return: 'string',
  title: '.singleEntry()',
  desc: 'Entry Desc',
  longdesc: '<p>Entry Longdesc</p>',
  categories: ['singleentry/cat1', 'singleentry/cat2'],
  signatures: [
    {
      added: '1.0',
      arguments: [
        { name: 'selector', type: 'Selector', desc: 'Signature 1 Desc' }
      ]
    },
    {
      added: '1.4',
      arguments: [
        { name: 'elements', type: 'Element', desc: 'Signature 2 Arg1 Desc' },
        { name: 'text', type: 'String', desc: 'Signature 2 Arg2 Desc' }
      ]
    }
  ],
  examples: [
    { desc: 'Example 1 Desc', code: 'Example 1 Code', css: 'Example 1 CSS', html: 'Example 1 HTML' },
    { desc: 'Example 2 Desc', code: 'Example 2 Code', css: 'Example 2 CSS', html: 'Example 2 HTML' }
  ]
}

describe('Entries Store', () => {
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
      expect(commit.mock.calls[0][0]).toBe('setEntries')
      expect(commit.mock.calls[0][1]).toBe('/docs/entries.json')
    })
  })

  it('should not send a request on load action if index not empty', () => {
    const commit = jest.fn()
    const state = { index: ['loaded'] }

    return actions.load.call(contextMock, { commit, state }).then(res => {
      expect(commit.mock.calls.length).toBe(0)
    })
  })

  it('should update the index state', () => {
    const state = { index: [] }

    mutations.setEntries(state, ['success'])
    expect(state.index).toEqual(['success'])
  })

  it('should update the selected state', () => {
    const state = { selected: {} }

    mutations.setSelected(state, { slug: 'success' })
    expect(state.selected).toEqual({ slug: 'success' })
  })

  it('should send a request on loadEntry action', () => {
    const commit = jest.fn()

    return actions.loadEntry.call(contextMock, { commit }, 'entrySlug')
      .then(res => {
        expect(commit.mock.calls.length).toBe(1)
        expect(commit.mock.calls[0][0]).toBe('setCurrentEntry')
        expect(commit.mock.calls[0][1]).toBe('/docs/entries/entrySlug.xml')
      })
  })

  it('should transform the xml and set the state on setCurrentEntry', () => {
    const state = { current: [] }

    mutations.setCurrentEntry(state, singleEntryXML)

    expect(state.current.length).toBe(1)
    expect(state.current[0]).toEqual(singleEntryJSON)

    mutations.setCurrentEntry(state, multiEntriesXML)

    expect(state.current.length).toBe(2)
    expect(state.current[0].title).toBe('.multiEntry1()')
    expect(state.current[1].title).toBe('.multiEntry2()')
  })

  it('should navigate up and down if search term and entries are present', () => {
    const commit = jest.fn()
    const state = {
      index: [
        { slug: 'aEntry' },
        { slug: 'bEntry' }
      ],
      selected: {}
    }
    const rootState = {
      search: {
        term: 'ent',
        index: state.index
      }
    }

    actions.navigate({ commit, state, rootState }, 'down')

    expect(commit.mock.calls.length).toBe(1)
    expect(commit.mock.calls[0][0]).toBe('setSelected')
    expect(commit.mock.calls[0][1]).toEqual(state.index[0])

    state.selected = state.index[0]
    actions.navigate({ commit, state, rootState }, 'down')
    expect(commit.mock.calls[1][1]).toEqual(state.index[1])

    state.selected = state.index[1]
    actions.navigate({ commit, state, rootState }, 'down')
    expect(commit.mock.calls[2][1]).toEqual(state.index[0])

    state.selected = state.index[0]
    actions.navigate({ commit, state, rootState }, 'up')
    expect(commit.mock.calls[3][1]).toEqual(state.index[1])
  })

  /*
  it('should open the first category and select the first entry if nothing is selected', () => {
    const commit = jest.fn()
    const state = {
      index: [
        { slug: 'aEntry' },
        { slug: 'bEntry' }
      ],
      selected: {}
    }
    const rootState = {
      search: {
        term: ''
      },
      categories: {
        populated: [
          { slug: 'cat1', entries: [ state.index[0] ] },
          { slug: 'cat1', entries: [ state.index[0], state.index[1] ] }
        ],
        open: {
          cat1: false,
          cat2: false
        }
      }
    }

    actions.navigate({ commit, state, rootState }, 'down') // can also be up

    expect(commit.mock.calls.length).toBe(2)
    expect(commit.mock.calls[0][0]).toBe('categories/setCategoryOpenToggle')
    expect(commit.mock.calls[0][1]).toEqual({ slug: 'cat1' })
    expect(commit.mock.calls[1][0]).toBe('setSelected')
    expect(commit.mock.calls[1][1]).toEqual(state.index[0])
  })

  it('should select the next possible entry in an open category', () => {
    const commit = jest.fn()
    const state = {
      index: [
        { slug: 'aEntry' },
        { slug: 'bEntry' }
      ],
      selected: { slug: 'aEntry' }
    }
    const rootState = {
      search: {
        term: ''
      },
      categories: {
        populated: [
          { slug: 'cat1', entries: [ state.index[0], state.index[1] ] },
          { slug: 'cat1', entries: [ state.index[0] ] }
        ],
        open: {
          cat1: true,
          cat2: false
        }
      }
    }

    actions.navigate({ commit, state, rootState }, 'down')

    expect(commit.mock.calls.length).toBe(1)
    expect(commit.mock.calls[0][0]).toBe('setSelected')
    expect(commit.mock.calls[0][1]).toEqual(state.index[1])
  })

  it('should select the previous possible entry in an open category', () => {
    const commit = jest.fn()
    const state = {
      index: [
        { slug: 'aEntry' },
        { slug: 'bEntry' },
        { slug: 'cEntry' }
      ],
      selected: { slug: 'bEntry' }
    }
    const rootState = {
      search: {
        term: ''
      },
      categories: {
        populated: [
          { slug: 'cat1', entries: [ state.index[0], state.index[1], state.index[2] ] },
          { slug: 'cat2', entries: [ state.index[0] ] }
        ],
        open: {
          cat1: true,
          cat2: false
        }
      }
    }

    actions.navigate({ commit, state, rootState }, 'up')

    expect(commit.mock.calls.length).toBe(1)
    expect(commit.mock.calls[0][0]).toBe('setSelected')
    expect(commit.mock.calls[0][1]).toEqual(state.index[0])
  })

  it('should open the next category and select the first entry if the last entry of the previous category was selected', () => {
    const commit = jest.fn()
    const state = {
      index: [
        { slug: 'aEntry' },
        { slug: 'bEntry' },
        { slug: 'cEntry' }
      ],
      selected: { slug: 'bEntry' }
    }
    const rootState = {
      search: {
        term: ''
      },
      categories: {
        populated: [
          { slug: 'cat1', entries: [ state.index[0], state.index[1] ] },
          { slug: 'cat2', entries: [ state.index[2] ] }
        ],
        open: {
          cat1: true,
          cat2: false
        }
      }
    }

    actions.navigate({ commit, state, rootState }, 'down')

    expect(commit.mock.calls.length).toBe(2)
    expect(commit.mock.calls[0][0]).toBe('categories/setCategoryOpenToggle')
    expect(commit.mock.calls[0][1]).toEqual({ slug: 'cat2' })
    expect(commit.mock.calls[1][0]).toBe('setSelected')
    expect(commit.mock.calls[1][1]).toEqual(state.index[2])
  })

  it('should open the last entry in the previous open category on key up and first entry selected', () => {
    const commit = jest.fn()
    const state = {
      index: [
        { slug: 'aEntry' },
        { slug: 'bEntry' },
        { slug: 'cEntry' }
      ],
      selected: { slug: 'bEntry' }
    }
    const rootState = {
      search: {
        term: ''
      },
      categories: {
        populated: [
          { slug: 'cat1', entries: [ state.index[0] ] },
          { slug: 'cat2', entries: [ state.index[1], state.index[2] ] }
        ],
        open: {
          cat1: true,
          cat2: true
        }
      }
    }

    actions.navigate({ commit, state, rootState }, 'up')

    expect(commit.mock.calls.length).toBe(1)
    expect(commit.mock.calls[0][0]).toBe('setSelected')
    expect(commit.mock.calls[0][1]).toEqual(state.index[0])
  })
  */
})
