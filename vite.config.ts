import { defineConfig } from "vitest/config";

const isCiEnvironment = process.env["CI"] === "true";
const configuredMaxWorkers =
    process.env["MAX_THREADS"] ?? (isCiEnvironment ? "1" : "8");
const parsedMaxWorkers = Number.parseInt(configuredMaxWorkers, 10);
const maxWorkerCount =
    Number.isFinite(parsedMaxWorkers) && parsedMaxWorkers > 0
        ? parsedMaxWorkers
        : 1;
const shouldEnableHangingProcessReporter = [
    "1",
    "on",
    "true",
    "yes",
].includes(
    (process.env["VITEST_HANGING_PROCESS_REPORTER"] ?? "false").toLowerCase()
);

const config: ReturnType<typeof defineConfig> = defineConfig({
    cacheDir: "./.cache/vitest",
    test: {
        coverage: {
            include: ["src/**/*.ts"],
            provider: "v8",
            reporter: [
                "text",
                "json",
                "lcov",
                "html",
            ],
            reportsDirectory: "./coverage",
            thresholds: {
                branches: 100,
                functions: 100,
                lines: 100,
                statements: 100,
            },
        },
        environment: "node",
        exclude: [
            "**/.cache/**",
            "**/coverage/**",
            "**/dist/**",
            "**/node_modules/**",
        ],
        fileParallelism: !isCiEnvironment,
        globals: false,
        include: ["test/**/*.{test,spec}.ts"],
        maxWorkers: maxWorkerCount,
        name: "typedoc-config-nick2bad4u",
        reporters: shouldEnableHangingProcessReporter
            ? ["default", "hanging-process"]
            : ["default"],
        restoreMocks: true,
        slowTestThreshold: 300,
        typecheck: {
            checker: "tsc",
            enabled: true,
            tsconfig: "./tsconfig.vitest-typecheck.json",
        },
    },
});

export default config;
