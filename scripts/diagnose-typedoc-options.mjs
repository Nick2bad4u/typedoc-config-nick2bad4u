/**
 * Diagnose TypeDoc schema options that are not set in this shared config.
 *
 * This intentionally does not mutate typedoc.json. It is a review aid for
 * deciding whether newly surfaced TypeDoc options belong in the shared package
 * or should remain in consuming projects.
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const schemaPath = fileURLToPath(
    new URL(
        "../node_modules/typedoc/typedoc-config.schema.json",
        import.meta.url
    )
);
const typedocConfigPath = fileURLToPath(
    new URL("../typedoc.json", import.meta.url)
);

/**
 * Options that should usually stay in the consuming repo because they describe
 * project structure, output location, hosting, branding, or documented-package
 * exceptions.
 */
const projectLocalOptions = new Set([
    "basePath",
    "cname",
    "compilerOptions",
    "customCss",
    "customFooterHtml",
    "customJs",
    "displayBasePath",
    "entryPoints",
    "entryPointStrategy",
    "extends",
    "favicon",
    "gitRemote",
    "gitRevision",
    "hostedBaseUrl",
    "html",
    "intentionallyNotDocumented",
    "intentionallyNotExported",
    "json",
    "locales",
    "markdownItLoader",
    "name",
    "navigationLinks",
    "options",
    "out",
    "outputs",
    "packageOptions",
    "packagesRequiringDocumentation",
    "projectDocuments",
    "sidebarLinks",
    "sourceLinkTemplate",
    "titleLink",
    "tsconfig",
    "watch",
]);

/**
 * Options that can reasonably belong in a shared config if the repo family has
 * an agreed convention for them.
 */
const sharedConfigCandidateOptions = new Set([
    "categoryOrder",
    "excludeCategories",
    "excludeNotDocumentedKinds",
    "excludeTags",
    "groupOrder",
    "ignoredHighlightLanguages",
    "navigationLeaves",
    "notRenderedTags",
    "preservedTypeAnnotationTags",
    "requiredToBeDocumented",
    "router",
    "sluggerConfiguration",
    "sourceLinkExternal",
    "typePrintWidth",
]);

/**
 * Options intentionally left to TypeDoc defaults unless there is a concrete
 * output problem to solve.
 */
const defaultBackedOptions = new Set([
    "blockTags",
    "githubPages",
    "hideGenerator",
    "includeHierarchySummary",
    "inlineTags",
    "modifierTags",
    "pretty",
    "searchCategoryBoosts",
    "searchGroupBoosts",
    "searchInComments",
    "searchInDocuments",
]);

/**
 * @typedef {{
 *     default?: unknown;
 *     description?: string;
 *     type?: string;
 * }} TypeDocSchemaProperty
 *
 * @typedef {{
 *     properties?: Record<string, TypeDocSchemaProperty>;
 * }} TypeDocConfigSchema
 *
 * @typedef {{
 *     default: unknown;
 *     description: string;
 *     option: string;
 * }} DiagnosticOption
 *
 * @typedef {{
 *     defaultBacked: DiagnosticOption[];
 *     projectLocal: DiagnosticOption[];
 *     sharedCandidates: DiagnosticOption[];
 *     uncategorized: DiagnosticOption[];
 * }} DiagnosticResult
 */

/**
 * Sort by option name for stable diagnostics.
 *
 * @param {DiagnosticOption} left
 * @param {DiagnosticOption} right
 *
 * @returns {number}
 */
const compareOptionName = (left, right) =>
    left.option.localeCompare(right.option);

/**
 * Parse JSON as an unknown value so callers must validate the shape.
 *
 * @param {string} content
 *
 * @returns {unknown}
 */
const parseJson = (content) => /** @type {unknown} */ (JSON.parse(content));

/**
 * Read a JSON file and return the parsed value.
 *
 * @param {string} path
 *
 * @returns {Promise<unknown>}
 */
const readJsonFile = async (path) => {
    // eslint-disable-next-line security/detect-non-literal-fs-filename -- Paths are repo-local constants.
    const content = await readFile(path, "utf8");
    return parseJson(content);
};

/**
 * Parse and validate the installed TypeDoc schema shape.
 *
 * @param {unknown} schema
 *
 * @returns {Record<string, TypeDocSchemaProperty>}
 */
const getSchemaProperties = (schema) => {
    const properties =
        typeof schema === "object" && schema !== null && !Array.isArray(schema)
            ? /** @type {TypeDocConfigSchema} */ (schema).properties
            : undefined;

    if (
        typeof schema !== "object" ||
        schema === null ||
        Array.isArray(schema) ||
        typeof properties !== "object"
    ) {
        throw new TypeError(
            "Expected TypeDoc config schema to contain an object `properties` map."
        );
    }

    return /** @type {Record<string, TypeDocSchemaProperty>} */ (properties);
};

/**
 * Parse and validate the local TypeDoc config shape.
 *
 * @param {unknown} config
 *
 * @returns {Record<string, unknown>}
 */
const getTypeDocConfig = (config) => {
    if (
        typeof config !== "object" ||
        config === null ||
        Array.isArray(config)
    ) {
        throw new TypeError("Expected typedoc.json to contain a JSON object.");
    }

    return /** @type {Record<string, unknown>} */ (config);
};

/**
 * Convert a schema property entry into a compact diagnostic object.
 *
 * @param {string} option
 * @param {TypeDocSchemaProperty} property
 *
 * @returns {DiagnosticOption}
 */
const toDiagnosticOption = (option, property) => ({
    default: Object.hasOwn(property, "default") ? property.default : undefined,
    description: property.description ?? "",
    option,
});

/**
 * Classify unset TypeDoc schema options by whether they are plausible shared
 * config candidates.
 *
 * @param {Record<string, TypeDocSchemaProperty>} schemaProperties
 * @param {Record<string, unknown>} config
 *
 * @returns {DiagnosticResult}
 */
const buildDiagnosticResult = (schemaProperties, config) => {
    /** @type {DiagnosticResult} */
    const result = {
        defaultBacked: [],
        projectLocal: [],
        sharedCandidates: [],
        uncategorized: [],
    };
    const configuredOptions = new Set(Object.keys(config));

    for (const [option, property] of Object.entries(schemaProperties)) {
        if (configuredOptions.has(option)) {
            continue;
        }

        const diagnosticOption = toDiagnosticOption(option, property);

        if (sharedConfigCandidateOptions.has(option)) {
            result.sharedCandidates.push(diagnosticOption);
        } else if (projectLocalOptions.has(option)) {
            result.projectLocal.push(diagnosticOption);
        } else if (defaultBackedOptions.has(option)) {
            result.defaultBacked.push(diagnosticOption);
        } else {
            result.uncategorized.push(diagnosticOption);
        }
    }

    result.defaultBacked.sort(compareOptionName);
    result.projectLocal.sort(compareOptionName);
    result.sharedCandidates.sort(compareOptionName);
    result.uncategorized.sort(compareOptionName);

    return result;
};

/**
 * Print one section of diagnostics.
 *
 * @param {string} title
 * @param {readonly DiagnosticOption[]} options
 *
 * @returns {void}
 */
const printSection = (title, options) => {
    // eslint-disable-next-line no-console -- Diagnostic CLI output.
    console.log(`\n${title} (${options.length})`);

    if (options.length === 0) {
        // eslint-disable-next-line no-console -- Diagnostic CLI output.
        console.log("  None");
        return;
    }

    for (const option of options) {
        // eslint-disable-next-line no-console -- Diagnostic CLI output.
        console.log(`  - ${option.option}: ${option.description}`);
    }
};

const main = async () => {
    const schemaProperties = getSchemaProperties(
        await readJsonFile(schemaPath)
    );
    const config = getTypeDocConfig(await readJsonFile(typedocConfigPath));
    const diagnostics = buildDiagnosticResult(schemaProperties, config);

    // eslint-disable-next-line no-console -- Diagnostic CLI output.
    console.log("TypeDoc shared-config option diagnostics");
    printSection(
        "Unset shared-config candidates",
        diagnostics.sharedCandidates
    );
    printSection("Unset project-local options", diagnostics.projectLocal);
    printSection(
        "Unset options best left at TypeDoc defaults",
        diagnostics.defaultBacked
    );
    printSection("Unset uncategorized options", diagnostics.uncategorized);
};

try {
    await main();
} catch (error) {
    // eslint-disable-next-line no-console -- Diagnostic CLI failure output.
    console.error("Failed to diagnose TypeDoc options:", error);
    process.exitCode = 1;
}
