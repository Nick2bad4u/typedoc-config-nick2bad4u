import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

import config, { configFileName, packageName } from "../src/preset";

describe("typedoc-config-nick2bad4u", () => {
    it("exports strict, path-free TypeDoc defaults", async () => {
        expect.assertions(7);

        const rawConfig = JSON.parse(
            await readFile(configFileName, "utf8")
        ) as typeof config;

        expect(packageName).toBe("typedoc-config-nick2bad4u");
        expect(config).toStrictEqual(rawConfig);
        expect(config.treatWarningsAsErrors).toBe(true);
        expect(config.excludeInternal).toBe(true);
        expect(Object.hasOwn(config, "entryPoints")).toBe(false);
        expect(Object.hasOwn(config, "entryPoints")).not.toBe(true);
        expect(Object.hasOwn(config, "out")).toBe(false);
    });
});
