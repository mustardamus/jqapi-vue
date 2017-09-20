import { state, mutations, actions } from '~/store/search'

describe('Search Store', () => {
  it('should export needed stuff', () => {
    expect(state).toBeTruthy()
    expect(mutations).toBeTruthy()
    expect(actions).toBeTruthy()
  })

  it('should call the mutations on the search action', () => {
    const commit = jest.fn()
    const rootState = { entries: { index: [] } }

    actions.search.call(this, { commit, rootState }, 'searchterm')
    expect(commit.mock.calls.length).toBe(2)
    expect(commit.mock.calls[0][0]).toBe('setTerm')
    expect(commit.mock.calls[0][1]).toBe('searchterm')
    expect(commit.mock.calls[1][0]).toBe('setIndex')
    expect(commit.mock.calls[1][1]).toEqual(rootState.entries.index)
  })

  it('should update the state on setTerm mutation', () => {
    const state = { term: '' }

    mutations.setTerm(state, 'searchterm')
    expect(state.term).toBe('searchterm')
  })

  it('should fuzzy find entries and set the state on setIndex mutation', () => {
    const state = { term: '', index: [] }
    const entries = [
      { title: '.ajax()' },
      { title: '.hasClass()' },
      { title: '.css()' }
    ]

    state.term = 'aja'
    mutations.setIndex(state, entries)

    expect(state.index.length).toBe(1)
    expect(state.index[0].search.target).toBe('.ajax()')
    expect(state.index[0].titleHTML).toBe('.<b>aja</b>x()')

    state.term = 'ss'
    mutations.setIndex(state, entries)

    expect(state.index.length).toBe(2)
    expect(state.index[0].search.target).toBe('.css()')
    expect(state.index[1].search.target).toBe('.hasClass()')
  })
})
