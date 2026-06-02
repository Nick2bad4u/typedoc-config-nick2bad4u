import nickTwoBadFourU from "eslint-config-nick2bad4u";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.all,
    {
        files: ["index.cjs"],
        rules: {
            "module-interop/no-cjs-exports": "off",
            "unicorn/prefer-module": "off",
        },
    },
];

export default config;
