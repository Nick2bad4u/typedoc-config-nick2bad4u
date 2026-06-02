import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

import config, { configFileName, packageName } from "../src/preset";

describe("typedoc-config-nick2bad4u", () => {
    it("exports the source TypeDoc defaults without project-local paths", async () => {
        expect.assertions(14);

        const rawConfig = JSON.parse(
            await readFile(configFileName, "utf8")
        ) as typeof config;

        expect(packageName).toBe("typedoc-config-nick2bad4u");
        expect(config).toStrictEqual(rawConfig);
        expect(config.blockTags).toContain("@defaultValue");
        expect(config.blockTags).toContain("@preventExpand");
        expect(config.externalSymbolLinkMappings?.["type-fest"]).toBeTypeOf(
            "object"
        );
        expect(config.plugin).toContain("typedoc-plugin-markdown");
        expect(config.plugin).toContain("typedoc-plugin-dt-links");
        expect(config.theme).toBe("markdown");
        expect(config.visibilityFilters?.private).toBe(false);
        expect(Object.hasOwn(config, "entryPoints")).toBe(false);
        expect(Object.hasOwn(config, "out")).toBe(false);
        expect(Object.hasOwn(config, "json")).toBe(false);
        expect(Object.hasOwn(config, "tsconfig")).toBe(false);
        expect(config.plugin?.some((plugin) => plugin.startsWith("./"))).toBe(
            false
        );
    });
});
