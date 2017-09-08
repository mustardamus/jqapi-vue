#!/usr/bin/env node

const { join } = require('path')
const { spawn } = require('child_process')

const bin = join(__dirname, '../../node_modules/.bin/eslint')
const opt = '--ext .js,.vue --ignore-path .gitignore .'.split(' ')
const lint = spawn(bin, opt, { stdio: ['inherit', 'inherit', 'inherit'] })

lint.on('close', code => process.exit(code))
