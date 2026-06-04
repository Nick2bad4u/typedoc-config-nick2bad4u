import { execFileSync } from "node:child_process";
import {
    mkdir,
    readdir,
    readFile,
    rm,
    symlink,
    writeFile,
} from "node:fs/promises";
import * as nodePath from "node:path";
import { describe, expect, it } from "vitest";

import config, { configFileName, packageName } from "../src/preset";

const fixtureDirectory = nodePath.join(".cache", "typedoc-config-fixture");
const typedocCliPath = nodePath.join(
    "node_modules",
    "typedoc",
    "bin",
    "typedoc"
);

describe("typedoc-config-nick2bad4u", () => {
    it("exports the source TypeDoc defaults without project-local paths", async () => {
        expect.assertions(17);

        const rawConfig = JSON.parse(
            await readFile(configFileName, "utf8")
        ) as typeof config;

        expect(packageName).toBe("typedoc-config-nick2bad4u");
        expect(config).toStrictEqual(rawConfig);
        expect(config.blockTags).toContain("@defaultValue");
        expect(config.blockTags).toContain("@preventExpand");
        expect(config.cascadedModifierTags).toStrictEqual([
            "@alpha",
            "@beta",
            "@experimental",
        ]);
        expect(config.externalSymbolLinkMappings?.["type-fest"]).toBeTypeOf(
            "object"
        );
        expect(config.plugin).toContain("typedoc-plugin-markdown");
        expect(config.plugin).toContain("typedoc-plugin-dt-links");
        expect(config.sanitizeComments).toBe(true);
        expect(config.theme).toBe("markdown");
        expect(config.treatValidationWarningsAsErrors).toBe(true);
        expect(config.validation?.notExported).toBe(true);
        expect(config.visibilityFilters?.private).toBe(false);
        expect(new Set(config.modifierTags).size).toBe(
            config.modifierTags?.length
        );
        expect(config.replaceText?.replacements).toStrictEqual([
            {
                pattern: String.raw`\bTODO:`,
                replace: "**TODO:**",
            },
            {
                pattern: String.raw`\bFIXME:`,
                replace: "**FIXME:**",
            },
        ]);
        expect(
            [
                "entryPoints",
                "entryPointStrategy",
                "gitRemote",
                "gitRevision",
                "json",
                "out",
                "tsconfig",
            ].filter((optionName) => Object.hasOwn(config, optionName))
        ).toStrictEqual([]);
        expect(config.plugin?.some((plugin) => plugin.startsWith("./"))).toBe(
            false
        );
    });

    it("can be consumed by TypeDoc through the packaged JSON export", async () => {
        expect.assertions(3);

        await rm(fixtureDirectory, {
            force: true,
            recursive: true,
        });
        await mkdir(nodePath.join(fixtureDirectory, "src"), {
            recursive: true,
        });
        await mkdir(nodePath.join(fixtureDirectory, "node_modules"), {
            recursive: true,
        });
        await symlink(
            process.cwd(),
            nodePath.join(fixtureDirectory, "node_modules", packageName),
            "junction"
        );

        try {
            await Promise.all([
                writeFile(
                    nodePath.join(fixtureDirectory, "package.json"),
                    `${JSON.stringify(
                        {
                            name: "typedoc-config-fixture",
                            version: "1.0.0",
                        },
                        null,
                        4
                    )}\n`
                ),
                writeFile(
                    nodePath.join(fixtureDirectory, "src", "index.ts"),
                    [
                        "/** Adds two numbers. */",
                        "export function add(left: number, right: number): number {",
                        "    return left + right;",
                        "}",
                        "",
                    ].join("\n")
                ),
                writeFile(
                    nodePath.join(fixtureDirectory, "tsconfig.json"),
                    `${JSON.stringify(
                        {
                            compilerOptions: {
                                module: "ESNext",
                                moduleResolution: "bundler",
                                skipLibCheck: true,
                                strict: true,
                                target: "ES2024",
                            },
                            include: ["src/**/*.ts"],
                        },
                        null,
                        4
                    )}\n`
                ),
                writeFile(
                    nodePath.join(fixtureDirectory, "typedoc.json"),
                    `${JSON.stringify(
                        {
                            $schema: "https://typedoc.org/schema.json",
                            entryPoints: ["src/index.ts"],
                            extends: ["typedoc-config-nick2bad4u/typedoc.json"],
                            out: "api",
                            tsconfig: "tsconfig.json",
                        },
                        null,
                        4
                    )}\n`
                ),
            ]);

            const output = execFileSync(
                process.execPath,
                [
                    typedocCliPath,
                    "--options",
                    nodePath.join(fixtureDirectory, "typedoc.json"),
                ],
                {
                    encoding: "utf8",
                }
            );
            const generatedFiles = await readdir(
                nodePath.join(fixtureDirectory, "api")
            );
            const indexMarkdown = await readFile(
                nodePath.join(fixtureDirectory, "api", "index.md"),
                "utf8"
            );

            expect(output).toContain("markdown generated");
            expect(generatedFiles).toContain("index.md");
            expect(indexMarkdown).toContain("add");
        } finally {
            await rm(fixtureDirectory, {
                force: true,
                recursive: true,
            });
        }
    });
});
