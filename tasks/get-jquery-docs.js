const { join } = require('path')
const { existsSync } = require('fs')
const { which, exit, mkdir, cd, exec, rm, cp } = require('shelljs')

if (!which('git')) {
  console.error(`Error: the 'git' command must be installed (https://www.atlassian.com/git/tutorials/install-git)`)
  exit(1)
}

const run = () => {
  const gitUrl = 'https://github.com/jquery/api.jquery.com.git'
  const repoDir = join(__dirname, '../temp/docs')
  const distDir = join(__dirname, '../static/docs')
  let command = 'git pull'

  if (!existsSync(repoDir)) {
    command = `git clone ${gitUrl} ${repoDir}`
    mkdir('-p', repoDir)
  }

  cd(repoDir)

  if (exec(command).code !== 0) {
    console.error(`Error: Command '${command}' failed`)
    exit(1)
  }

  if (existsSync(distDir)) {
    rm('-rf', distDir)
  }

  mkdir('-p', distDir)
  cp('-r', join(repoDir, 'entries'), distDir)
  cp('-r', join(repoDir, 'includes'), distDir)
  cp('-r', join(repoDir, 'resources'), join(distDir, '..'))
  cp(join(repoDir, 'categories.xml'), distDir)
  cp(join(repoDir, 'LICENSE.txt'), distDir)
}

run()
module.exports = run
