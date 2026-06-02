import typedocOptions from "../typedoc.json" with { type: "json" };

/** TypeDoc option defaults exported by this package. */
export type TypeDocConfig = typeof typedocOptions;

/** Published package name for this shared TypeDoc config. */
export const packageName = "typedoc-config-nick2bad4u" as const;

/** Packaged TypeDoc JSON config filename. */
export const configFileName = "typedoc.json" as const;

/** Default TypeDoc options for Nick2bad4u TypeScript projects. */
export const config: TypeDocConfig = typedocOptions;

export default config;
