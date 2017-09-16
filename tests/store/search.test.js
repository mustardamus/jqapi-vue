import { state, mutations, actions } from '~/store/search'

describe('Search Store', () => {
  it('should export needed stuff', () => {
    expect(state).toBeTruthy()
    expect(mutations).toBeTruthy()
    expect(actions).toBeTruthy()
  })

  it('should call the mutation on the term action', () => {
    const commit = jest.fn()

    actions.term.call(this, { commit }, 'searchterm')
    expect(commit.mock.calls.length).toBe(1)
    expect(commit.mock.calls[0][0]).toBe('setTerm')
    expect(commit.mock.calls[0][1]).toBe('searchterm')
  })

  it('should update the state on setTerm mutation', () => {
    const state = { term: '' }

    mutations.setTerm(state, 'searchterm')
    expect(state.term).toBe('searchterm')
  })
})
