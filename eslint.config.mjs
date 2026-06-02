import nickTwoBadFourU from "eslint-config-nick2bad4u";

/** @type {import("eslint").Linter.Config[]} */
const config = [
    ...nickTwoBadFourU.configs.all,
    {
        files: ["src/preset.ts"],
        rules: {
            "canonical/no-re-export": "off",
            "import-x/extensions": "off",
        },
    },
];

export default config;
