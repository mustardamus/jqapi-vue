import { mount } from 'avoriaz'
import Navigation from '~/components/Navigation'
import cleanString from '~/plugins/clean-string'

describe('Navigation Component', () => {
  const comp = mount(Navigation, {
    propsData: {
      categories: [
        {
          name: 'Category 1',
          slug: 'cat1',
          desc: 'Category 1 Desc',
          categories: []
        },
        {
          name: 'Category 2',
          slug: 'cat2',
          desc: 'Category 2 Desc',
          categories: []
        },
        {
          name: 'Category 3',
          slug: 'cat3',
          desc: 'Category 3 Desc',
          categories: []
        }
      ],
      entries: [
        {
          title: 'cEntry',
          desc: 'bEntry Desc',
          categories: [
            'cat2',
            'sub/sub/cat3'
          ]
        },
        {
          title: 'aEntry',
          desc: 'aEntry Desc',
          categories: [
            'cat1',
            'cat2',
            'cat3'
          ]
        },
        {
          title: 'bEntry',
          desc: 'bEntry Desc',
          categories: [
            'cat1',
            'sub/cat2'
          ]
        }
      ]
    }
  })

  const entriesLis = i => comp.find('.categories > li')[i].find('.entries > li')

  it('should render the categories', () => {
    expect(comp.find('.categories > li').length).toBe(3)
  })

  it('should render the entries', () => {
    expect(entriesLis(0)).toHaveLength(2)
    expect(entriesLis(1)).toHaveLength(3)
    expect(entriesLis(2)).toHaveLength(2)
  })

  it('should render the entries alphabetically', () => {
    const text = i => cleanString(entriesLis(1)[i].text())

    expect(text(0)).toBe('aEntry')
    expect(text(1)).toBe('bEntry')
    expect(text(2)).toBe('cEntry')
  })
})
