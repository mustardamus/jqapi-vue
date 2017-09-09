const { join } = require('path')
const { existsSync } = require('fs')
const { rm } = require('shelljs')

const repoDir = join(__dirname, '../temp/docs')
const distDir = join(__dirname, '../static/docs')

const cleanup = () => {
  return new Promise((resolve, reject) => {
    if (existsSync(repoDir)) {
      rm('-rf', repoDir)
    }

    if (existsSync(distDir)) {
      rm('-rf', distDir)
    }

    resolve()
  })
}

beforeAll(() => cleanup())
afterAll(() => cleanup())

describe('Get jQuery Docs Task', () => {
  it('should clone and copy the docs if repo does not exist', () => {
    expect(existsSync(repoDir)).toBe(false)
    expect(existsSync(distDir)).toBe(false)

    require('./get-jquery-docs')

    expect(existsSync(repoDir)).toBe(true)
    expect(existsSync(distDir)).toBe(true)
  })

  it('should pull and copy the docs if repo exist', () => {
    rm('-rf', distDir)

    expect(existsSync(repoDir)).toBe(true)
    expect(existsSync(distDir)).toBe(false)

    require('./get-jquery-docs')() // re-run exported function

    expect(existsSync(repoDir)).toBe(true)
    expect(existsSync(distDir)).toBe(true)
  })
})
