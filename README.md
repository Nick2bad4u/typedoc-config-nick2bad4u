# typedoc-config-nick2bad4u

[![CI](https://github.com/Nick2bad4u/typedoc-config-nick2bad4u/actions/workflows/ci.yml/badge.svg)](https://github.com/Nick2bad4u/typedoc-config-nick2bad4u/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/typedoc-config-nick2bad4u.svg)](https://www.npmjs.com/package/typedoc-config-nick2bad4u)

Shared TypeDoc config for Nick2bad4u TypeScript projects.

## Install

```sh
npm install --save-dev typedoc-config-nick2bad4u
```

## Usage

Create `typedoc.json`:

```json
{
 "$schema": "https://typedoc.org/schema.json",
 "extends": ["typedoc-config-nick2bad4u/typedoc.json"],
 "entryPoints": ["src/index.ts"],
 "out": "docs/api"
}
```

Project-specific path options stay in the consuming project because TypeDoc resolves paths relative to the file that declares them.

## Verification

```sh
npm run release:verify
```
