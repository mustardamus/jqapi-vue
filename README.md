# jQAPI - Alternative jQuery API Browser

## Prerequisite

We are using [Yarn](https://yarnpkg.com) for dependencies management and
running tasks.


## Installation

```bash
yarn
```

## Tasks

### `yarn dev`

This starts the development server at [localhost:9999](http://localhost:9999).

### `yarn docs`

This command will clone/pull the official jQuery documentation from
[jquery/api.jquery.com](https://github.com/jquery/api.jquery.com) to
`./temp/docs`.

After the documentation is successfully updated, the needed directories/files
are copied to `./static/docs`.

### `yarn lint`

To lint each `*.js` and `*.vue` file.

#### Linting before committing

After the installation of dependencies is done, the `postinstall` task will
create a symlink for the `pre-commit` Git hook:

```
./tasks/git/pre-commit.js -> ./.git/hooks/pre-commit
```

That way the `lint` task is run everytime when you try to commit code. If the
linting fails, the committing fails.

### `yarn test`

Run all `*.test.js` files. Test files have the same name as the file that needs
to be tested, for example `./pages/index.vue` would have the test file
`./pages/index.test.js`.

### `yarn test:watch`

To watch all test files for changes, and re-running the tests.
