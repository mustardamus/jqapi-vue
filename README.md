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

### `yarn docs:pull`

This command will clone/pull the official jQuery documentation from
[jquery/api.jquery.com](https://github.com/jquery/api.jquery.com) to
`./temp/docs`.

After the documentation is successfully updated, the needed directories/files
are copied to `./static/docs`.

### `yarn docs:entries`

This command will read the `title`, `desc` and `categories` field from each
`*.xml` file in `./temp/docs/entries` and will write a index of all entries with
these fields to `./static/docs/entries.json`.

### `yarn docs`

Will run `docs:pull` and `docs:entries` in series.

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


## TODO

### Navigation

- navigate via up and down key when no search term is present - it should open
  closed categories and flip through their entries
- loading indicator for initial load and searching
- generate full populated categories (utilities is missing, for example)
- hide "Uncategorized"
- scroll to selected entrie on keyboard navigation
- align entries with the arrow of the parent category

### Content

- scroll to top on new page
- get the parent title, name and description, use from first entry if there are
  multiple
- show each signature and parameters, return values for each entry, and in which
  version they were added
- show short and main description for each entry
- generate signatures navigation, jump to signature if clicked
- highlight syntax in description
- show link to original docs

### Examples

- load js/css/html in an editor (monaco?) and dynamically generate output in an
  iframe on change
- show description of example

### Index Page

- Basically the same as it is now

### Misc

- Sometimes a page (_slug) is 404
- Sometimes the navigation is not loaded properly
- Change the title/description on page change
