const { join } = require('path')
const { existsSync, writeFileSync, readFileSync } = require('fs')
const { rm, mkdir } = require('shelljs')

const entriesDir = join(__dirname, '../../temp/docs/entries')
const distDir = join(__dirname, '../../static/docs')
const entriesIndexPath = join(distDir, 'entries.json')

const entryFixture1 = `<?xml version="1.0"?>
  <entry>
    <title>.entry1()</title>
    <desc>Entry 1 Desc</desc>
    <category slug="cat1"/>
    <category slug="cat3"/>
  </entry>
`

const entryFixture2 = `<?xml version="1.0"?>
  <entries>
    <desc>Entry 2 - Parent Desc</desc>
    <entry>
      <title>.entry2(1)</title>
      <desc>Entry 2 - Sub 1</desc>
      <category slug="cat1"/>
      <category slug="cat2"/>
    </entry>
    <entry>
      <title>.entry2(2)</title>
      <desc>Entry 2 - Sub 2</desc>
      <category slug="cat3"/>
    </entry>
  </entries>
`

beforeAll(() => {
  if (existsSync(entriesDir)) {
    rm('-rf', entriesDir)
  }

  if (existsSync(distDir)) {
    rm('-rf', distDir)
  }

  mkdir('-p', entriesDir)
  mkdir('-p', distDir)

  writeFileSync(join(entriesDir, `entry1.xml`), entryFixture1, 'utf8')
  writeFileSync(join(entriesDir, `entry2.xml`), entryFixture2, 'utf8')
})

afterAll(() => {
  rm('-rf', entriesDir)
  rm('-rf', distDir)
})

describe('Generate Entries Index', () => {
  it('should generate the entries index from the entries files', () => {
    require('~/tasks/generate-entries-index')

    expect(existsSync(entriesIndexPath)).toBe(true)

    const content = readFileSync(entriesIndexPath, 'utf8')
    const json = JSON.parse(content)

    expect(json.length).toBe(2)
    expect(json[0].title).toBe('.entry1()')
    expect(json[0].desc).toBe('Entry 1 Desc')
    expect(json[0].categories).toEqual(['cat1', 'cat3'])
    expect(json[1].title).toBe('.entry2(1)')
    expect(json[1].desc).toBe('Entry 2 - Parent Desc')
    expect(json[1].categories).toEqual(['cat1', 'cat2', 'cat3'])
  })
})
