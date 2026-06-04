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
import { convertHashLinksToBangLinksInInlineTagText } from "../typedoc-plugins/hash-to-bang-links-core.mjs";
import { prefixBareMarkdownFileLinksInMarkdown } from "../typedoc-plugins/prefix-doc-links-core.mjs";

const fixtureDirectory = nodePath.join(".cache", "typedoc-config-fixture");
const typedocCliPath = nodePath.join(
    "node_modules",
    "typedoc",
    "bin",
    "typedoc"
);
const packagedTypeDocPluginPaths = [
    "./typedoc-plugins/hash-to-bang-links.mjs",
    "./typedoc-plugins/prefix-doc-links.mjs",
] as const;

describe("typedoc-config-nick2bad4u", () => {
    it("rewrites repo-style hash links to TypeDoc declaration references", () => {
        expect.assertions(5);

        expect(
            convertHashLinksToBangLinksInInlineTagText("src/preset#config")
        ).toBe("src/preset!config");
        expect(
            convertHashLinksToBangLinksInInlineTagText(
                " src/preset#config | config export"
            )
        ).toBe(" src/preset!config | config export");
        expect(
            convertHashLinksToBangLinksInInlineTagText(
                "https://example.com/page#section"
            )
        ).toBe("https://example.com/page#section");
        expect(convertHashLinksToBangLinksInInlineTagText("Class#member")).toBe(
            "Class#member"
        );
        expect(
            convertHashLinksToBangLinksInInlineTagText("node:fs#readFile")
        ).toBe("node:fs!readFile");
    });

    it("prefixes bare Markdown file links without touching external links or code", () => {
        expect.assertions(1);

        expect(
            prefixBareMarkdownFileLinksInMarkdown(
                [
                    "[API](api/index.md)",
                    "[Already relative](./api/index.md)",
                    "[Parent](../api/index.md)",
                    "[External](https://example.com/api.md)",
                    "`[Code](api/index.md)`",
                    "```",
                    "[Fenced](api/index.md)",
                    "```",
                ].join("\n")
            )
        ).toStrictEqual(
            [
                "[API](./api/index.md)",
                "[Already relative](./api/index.md)",
                "[Parent](../api/index.md)",
                "[External](https://example.com/api.md)",
                "`[Code](api/index.md)`",
                "```",
                "[Fenced](api/index.md)",
                "```",
            ].join("\n")
        );
    });

    it("exports the source TypeDoc defaults without project-local paths", async () => {
        expect.assertions(18);

        const rawConfig = JSON.parse(
            await readFile(configFileName, "utf8")
        ) as typeof config;

        expect(packageName).toBe("typedoc-config-nick2bad4u");
        expect(config).toStrictEqual(rawConfig);
        expect(Object.hasOwn(config, "blockTags")).toBe(false);
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
        expect(config.plugin).toStrictEqual(
            expect.arrayContaining([...packagedTypeDocPluginPaths])
        );
        expect(config.sanitizeComments).toBe(true);
        expect(config.theme).toBe("markdown");
        expect(config.treatValidationWarningsAsErrors).toBe(true);
        expect(config.validation?.notExported).toBe(true);
        expect(config.visibilityFilters?.private).toBe(false);
        expect(Object.hasOwn(config, "inlineTags")).toBe(false);
        expect(Object.hasOwn(config, "modifierTags")).toBe(false);
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
        expect(
            config.plugin?.filter((plugin) => plugin.startsWith("./"))
        ).toStrictEqual([...packagedTypeDocPluginPaths]);
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
