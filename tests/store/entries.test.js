import { state, mutations, actions } from '~/store/entries'

describe('Entries Store', () => {
  it('should export needed stuff', () => {
    expect(state).toBeTruthy()
    expect(mutations).toBeTruthy()
    expect(actions).toBeTruthy()
  })

  it('should send a request on load action', () => {
    const commit = jest.fn()
    const context = {
      $axios: {
        get (url) {
          return new Promise(resolve => resolve({ data: url }))
        }
      }
    }

    return actions.load.call(context, { commit }).then(res => {
      expect(commit.mock.calls.length).toBe(1)
      expect(commit.mock.calls[0][0]).toBe('setEntries')
      expect(commit.mock.calls[0][1]).toBe('/docs/entries.json')
    })
  })

  it('should update the state', () => {
    const state = { index: [] }

    mutations.setEntries(state, ['success'])
    expect(state.index).toEqual(['success'])
  })
})
