import cleanString from '~/plugins/clean-string'

describe('clean-string Helper', () => {
  it('should clean and trim a string', () => {
    const str = '  <![CDATA[success]]> <![CDATA[success]]>   '

    expect(cleanString(str)).toBe('success success')
  })
})
