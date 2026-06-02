# AGENTS.md instructions for typedoc-config-nick2bad4u

- Keep this repository as a small, publishable shared configuration package.
- Use native configuration mechanisms for the target tool. Do not wrap the tool in a custom CLI unless the tool has no supported shared-config path.
- Prefer TypeScript for typed package helpers and tests, but keep raw config files exportable when the target tool consumes files directly.
- Run `npm run release:verify` before claiming the package is ready.
- Do not weaken lint, typecheck, package, secret scanning, or Codecov workflow gates to make verification pass.
