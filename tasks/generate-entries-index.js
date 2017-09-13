const { join, basename } = require('path')
const { existsSync, readdirSync, writeFileSync, readFileSync } = require('fs')
const $ = require('cheerio')

const getTitle = $el => {
  let title = $el.find('> title').text()

  if (title.length === 0) {
    title = $el.find('entry').eq(0).find('> title').text()
  }

  if (title.length === 0) {
    title = $el.find('title').eq(0).text()
  }

  return title
}

const getDesc = $el => {
  let desc = $el.find('> desc').text()

  if (desc.length === 0) {
    desc = $el.find('entry').eq(0).find('> desc').text()
  }

  if (desc.length === 0) {
    desc = $el.find('desc').eq(0).text()
  }

  return desc
}

const getCategories = $el => {
  let categories = $el.find('category').map((i, el) => {
    return $(el).attr('slug')
  }).get()

  if (categories.length === 0) {
    categories = $el.find('entry').map((i, el) => {
      return $(el).find('category').map((i, el) => {
        return $(el).attr('slug')
      }).get()
    }).get()
  }

  return categories
}

const run = () => {
  const entriesDir = join(__dirname, '../temp/docs/entries')
  const distPath = join(__dirname, '../static/docs/entries.json')
  const warnings = []

  if (!existsSync(entriesDir)) {
    throw new Error(`Entries directory does not exist at '${entriesDir}' (run 'yarn docs:pull' ?`)
  }

  const entries = readdirSync(entriesDir)
    .filter(entry => entry.includes('.xml'))
    .map(entry => {
      const entryPath = join(entriesDir, entry)
      const xml = readFileSync(entryPath, 'utf8')
      const $el = $(xml)
      const title = getTitle($el)
      const desc = getDesc($el)
      const categories = getCategories($el)
      const slug = basename(entry, '.xml')

      if (title.length === 0) {
        warnings.push(`Warn: Could not get 'title' from '${entryPath}'`)
      }

      if (desc.length === 0) {
        warnings.push(`Warn: Could not get 'desc' from '${entryPath}'`)
      }

      if (categories.length === 0) {
        warnings.push(`Warn: Could not get 'categories' from '${entryPath}'`)
      }

      console.log(`${title} (${categories.length} categories)`)

      return { title, desc, categories, slug }
    })

  writeFileSync(distPath, JSON.stringify(entries), 'utf8')
  console.warn(warnings.join('\n'))
}

run()
module.exports = run
