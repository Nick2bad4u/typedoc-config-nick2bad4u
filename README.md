# typedoc-config-nick2bad4u

[![npm license.](https://flat.badgen.net/npm/license/typedoc-config-nick2bad4u?color=purple)](https://github.com/Nick2bad4u/typedoc-config-nick2bad4u/blob/main/LICENSE) [![npm total downloads.](https://flat.badgen.net/npm/dt/typedoc-config-nick2bad4u?color=pink)](https://www.npmjs.com/package/typedoc-config-nick2bad4u) [![latest GitHub release.](https://flat.badgen.net/github/release/Nick2bad4u/typedoc-config-nick2bad4u?color=cyan)](https://github.com/Nick2bad4u/typedoc-config-nick2bad4u/releases) [![GitHub stars.](https://flat.badgen.net/github/stars/Nick2bad4u/typedoc-config-nick2bad4u?color=yellow)](https://github.com/Nick2bad4u/typedoc-config-nick2bad4u/stargazers) [![GitHub forks.](https://flat.badgen.net/github/forks/Nick2bad4u/typedoc-config-nick2bad4u?color=green)](https://github.com/Nick2bad4u/typedoc-config-nick2bad4u/forks) [![GitHub open issues.](https://flat.badgen.net/github/open-issues/Nick2bad4u/typedoc-config-nick2bad4u?color=red)](https://github.com/Nick2bad4u/typedoc-config-nick2bad4u/issues) [![codecov.](https://flat.badgen.net/codecov/github/Nick2bad4u/typedoc-config-nick2bad4u?color=blue)](https://codecov.io/gh/Nick2bad4u/typedoc-config-nick2bad4u)

Shared TypeDoc defaults for Nick2bad4u TypeScript packages.

This package publishes a plain TypeDoc JSON config that consumers extend with TypeDoc's native `extends` option. It does not wrap TypeDoc, add a custom CLI, or own project-local paths such as entry points, output directories, or `tsconfig` files.

## Install

```sh
npm install --save-dev typedoc typedoc-config-nick2bad4u
```

TypeDoc is a peer dependency. The markdown and linking plugins used by the preset are installed through this package.

## Usage

Create `typedoc.json` in the consuming project:

```json
{
 "$schema": "https://typedoc.org/schema.json",
 "extends": ["typedoc-config-nick2bad4u/typedoc.json"],
 "entryPoints": ["src/index.ts"],
 "out": "docs/api",
 "tsconfig": "tsconfig.json"
}
```

Add a script:

```json
{
 "scripts": {
  "docs:api": "typedoc --options typedoc.json"
 }
}
```

Then run:

```sh
npm run docs:api
```

## Defaults

The preset is tuned for publishable TypeScript package API documentation:

- Emits markdown documentation with `typedoc-plugin-markdown`.
- Loads plugins for MDN links, DefinitelyTyped links, external package links, missing exports, default export renaming, comment text cleanup, remark integration, Docusaurus output support, and documentation coverage.
- Treats TypeDoc validation warnings as errors so broken links and invalid paths fail the docs build.
- Sanitizes comments before markdown output.
- Keeps package-specific entry points, output paths, JSON output paths, and `tsconfig` paths out of the shared config.
- Provides external symbol mappings for common TypeScript, Node.js, React, Vite, Vitest, Zod, PostCSS, Testing Library, and `type-fest` APIs.

## Project Options

Keep these options in each consuming project:

- `entryPoints`
- `out`
- `json`
- `tsconfig`
- `name`
- `includeVersion`
- `gitRemote`
- `gitRevision`

Use `entryPointStrategy` only when the project needs non-default discovery behavior. TypeDoc's default `resolve` strategy is usually the right choice for package entry points.

## Importing

The package also exports the parsed config for typed helper code:

```ts
import typedocConfig from "typedoc-config-nick2bad4u";

export default typedocConfig;
```

Most projects should prefer `extends` in `typedoc.json` because that is the TypeDoc-native shared-config path.

## Verification

Run the full release gate before publishing:

```sh
npm run release:verify
```

The gate builds the package, runs ESLint, TypeScript checks, Vitest, Prettier, package metadata checks, YAML linting, secret scanning, `publint`, Are The Types Wrong, and an npm pack dry run.
