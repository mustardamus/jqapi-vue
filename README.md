# jQAPI - Alternative jQuery API Browser

## Prerequisite

We are using [Yarn](https://yarnpkg.com) for dependencies management and
running tasks.


## Installation

```bash
yarn
```


## Linting

To lint each `*.js` and `*.vue` file, run the `lint` task:

```bash
yarn lint
```

### Linting before committing

After the installation of dependencies is done, the `postinstall` task will
create a symlink for the `pre-commit` Git hook:

```
./tasks/git/pre-commit.js -> ./.git/hooks/pre-commit
```

That way the `lint` task is run everytime when you try to commit code. If the
linting fails, the committing fails.


## Testing

Test files have the same name as the file that needs to be tested, for example
`./pages/index.vue` would have the test file `./pages/index.test.js`.

Run all tests with:

```bash
yarn test
```

To watch all test files for changes, and re-running the tests, do:

```bash
yarn test:watch
```


## TODO

- Add Jest with Vue config
