import { mount } from 'avoriaz'
import Sidebar from '~/components/Sidebar'

describe('Sidebar Component', () => {
  const dispatch = jest.fn()
  const opts = {
    globals: {
      $store: {
        state: {
          categories: { index: [] },
          entries: { index: [] },
          search: { term: '' }
        },
        dispatch
      }
    },
    computed: {
      hasSearchTerm: () => true
    }
  }
  const comp = mount(Sidebar, opts)

  test('it should have a search input', () => {
    expect(comp.contains('#search input')).toBe(true)
  })

  test('it should hide the navigation if a search term is present', () => {
    opts.globals.$store.state.search.term = 'term'
    comp.vm.onSearchData('term')
    comp.update()

    expect(dispatch.mock.calls.length).toBe(1)
    expect(dispatch.mock.calls[0][0]).toBe('search/term')
    expect(dispatch.mock.calls[0][1]).toBe('term')
    expect(comp.find('#navigation')[0].hasClass('is-hidden')).toBe(true)
  })
})
