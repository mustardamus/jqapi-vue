import { mount } from 'avoriaz'
import EntriesList from '~/components/EntriesList'

describe('EntriesList Component', () => {
  const $emit = jest.fn()
  const comp = mount(EntriesList, {
    globals: {
      $store: {
        state: {
          entries: {
            selected: {}
          }
        }
      },
      $emit
    },
    propsData: {
      entries: [
        { title: '.aEntry()', slug: 'aEntry', desc: 'aEntry Desc', categories: [] },
        { title: '.bEntry()', slug: 'bEntry', desc: 'bEntry Desc', categories: [] },
        { title: '.cEntry()', slug: 'cEntry', desc: 'cEntry Desc', categories: [] }
      ],
      selectedEntry: {}
    }
  })

  it('should render the entries', () => {
    expect(comp.find('li').length).toBe(3)
  })

  it('should set the current entry on click and change the route', () => {
    comp.find('li a')[0].trigger('click')

    expect($emit.mock.calls.length).toBe(1)
    expect($emit.mock.calls[0][0]).toBe('entryClick')
    expect($emit.mock.calls[0][1]).toEqual({ title: '.aEntry()', slug: 'aEntry', desc: 'aEntry Desc', categories: [] })
  })
})
