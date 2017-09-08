const { join } = require('path')
const { symlinkSync, existsSync } = require('fs')

const from = join(__dirname, 'pre-commit.js')
const to = join(__dirname, '../../.git/hooks/pre-commit')

if (!existsSync(to)) {
  symlinkSync(from, to)
  console.log('Created pre-commit:', from, '->', to)
}
