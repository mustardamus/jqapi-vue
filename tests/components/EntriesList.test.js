import { mount } from 'avoriaz'
import EntriesList from '~/components/EntriesList'

describe('EntriesList Component', () => {
  const commit = jest.fn()
  const push = jest.fn()
  const comp = mount(EntriesList, {
    globals: {
      $store: {
        state: {
          entries: {
            selected: {}
          }
        },
        commit
      },
      $router: { push }
    },
    computed: {
      selectedEntry: () => ({ slug: 'bEntry' })
    },
    propsData: {
      entries: [
        { title: '.aEntry()', slug: 'aEntry', desc: 'aEntry Desc', categories: [] },
        { title: '.bEntry()', slug: 'bEntry', desc: 'bEntry Desc', categories: [] },
        { title: '.cEntry()', slug: 'cEntry', desc: 'cEntry Desc', categories: [] }
      ]
    }
  })

  it('should render the entries', () => {
    expect(comp.find('li').length).toBe(3)
    expect(comp.find('li.is-active .entry-title')[0].text()).toBe('.bEntry()')
  })

  it('should set the current entry on click and change the route', () => {
    comp.find('li a')[0].trigger('click')

    expect(commit.mock.calls.length).toBe(1)
    expect(commit.mock.calls[0][0]).toBe('entries/setSelected')
    expect(commit.mock.calls[0][1]).toEqual({ title: '.aEntry()', slug: 'aEntry', desc: 'aEntry Desc', categories: [] })
    expect(push.mock.calls.length).toBe(1)
    expect(push.mock.calls[0][0]).toBe('/aEntry')
  })
})
