# `libs`

This folder must only contain external dependencies.
An external dependency is one whose source code isn't contained in the monorepo: a symlink, a submodule, etc.
Submodule libs are to be declared in the [`/.gitmodules`](../.gitmodules) file in the root of the monorepo.

## Read-only

Because source code of a lib isn't git-tracked, the lib must be treated as read-only by convention (i.e., even if updating a submodule is technically possible).
The most up-to-date version of a dependency must be verified at design time (i.e., during development).

## Naming conventions

Each lib has an explicit scope (i.e., organization name, user name) and a repository name.
Each lib also has an implicit maintainer, which may or may not match the scope.
Scopes contain repositories, repositories do not contain scopes nor other repositories.

Each lib must be available in the file system under a name that matches the following pattern:

```
/libs/@<scope>/<repository-name>
```

… and have an `import` alias of:

```
@@libs/@<scope>/<repository-name>
```

### Examples

#### GitHub repository

For GitHub repositories, the `<scope>` is the name of the organization or the user.
Thus, a repository at https://github.com/expressjs/express is initialized as a lib at:

```
/libs/@expressjs/express
```

… and referred to in the code as:

```ts
import { … } from '@@libs/@expressjs/express'
```

#### Scoped npm package

For scoped npm packages, the `<scope>` repeats the organization name but with the resulting prefix of only one `@` character.
Thus, an npm package at https://www.npmjs.com/package/@angular/cli is initialized as a lib at:

```
/libs/@angular/cli
```

… and referred to in the code as:

```ts
import { … } from '@@libs/@angular/cli'
```

#### Global-scoped npm package

_See [**No known scope**](#no-known-scope)._

### Conflict resolution

#### No known scope

If the scope isn't known, infer it from the maintainer's name.
Once a scope is inferred for a specific maintainer, it must be reused in similar situations, rather than re-inferred again differently.

##### Do not use host platform as a scope

Do not use host platform as a scope. E.g.:
- if the NestJS team hosts a repository on GitHub, the scope should be `nestjs`;
- if the GitHub team publishes an npm package, the scope should be `github`;
- if the npm team issues a plugin for NestJS ecosystem, the scope should be `npm`.

#### Multiple-level scope

If a lib has more than one level of scoping (e.g., `/<scope>/<child-scope>/<grand-child-scope>/<repository>`), choose one that best reflects the maintainer.
If only specifying a maintainer isn't enough, introduce one level of a nested scope.
Nesting a scope must be used as the last resort, only if it isn't possible to consistently use the root scope alone.
Introducing two or more nested scopes is strictly forbidden.

##### Monorepo libs

A monorepo is still only one repository, not a collection of repositories.
If there is a dire need (and means) of only using certain modules of a monorepo, the monorepo must be placed in the `libs` folder at:

```
/libs/@<scope>/<monorepo-name>
```

… and (assuming that the inner module of the monorepo exists at `/libs/@<scope>/<monorepo-name>/path/to/<module>`) aliased for `import` statements as:

```ts
import { … } from '@@libs/@<scope>/<module>'
```

#### Same scope, same repository name

##### Same maintainer

Avoid adding the same lib twice.
If two independent versions of the same lib are required:
- if they are mutually-exclusive (i.e., sometimes one version is needed, sometimes the other), consider defining the lib as a git submodule, and switching between its branches;
- if they are completely independent, consider adding an identifying suffix (postfix) to the repository name (e.g., `@@libs/@<scope>/repo-v2`, `@@libs/@<scope>/repo#prerelease`);
  - do not use iterable postfix (e.g., `@@libs/@<scope>/repo-1`, `@@libs/@<scope>/repo-2`) to avoid confusion.

##### Different maintainers

It is possible that two different maintainers have (different) repositories with the same name under their respective (different) scopes that also have the same name.
Such cases should be treated the same as [**No known scope**](#no-known-scope) situations.

#### Same scope, different repository names

##### Same maintainer

No conflict to resolve, both libs are placed in the same scope-folder.

##### Different maintainers

If two repositories have matching scopes but different maintainers, there is no guarantee that the scope represents the same entity (this is especially true if the scope uses an ambiguous term, like `@ci/*` or `@app/*`).
Such cases should be treated the same as [**No known scope**](#no-known-scope) situations.

#### Different scopes

Libs that have different scopes are placed in different scope-folders, regardless of their maintainer or repository name.
