import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import pkg from "./package.json";

function matchSubmodules(externals) {
    return externals.map((e) => new RegExp(`^${e}(?:[/\\\\]|$)`));
}

const externals = matchSubmodules([
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {}),
]);

export default {
    input: "src/index.ts",
    output: [
        {
            file: pkg.main,
            format: "cjs",
            sourcemap: true,
            plugins: [],
        },
        {
            file: pkg.browser,
            format: "es",
            sourcemap: true,
            plugins: [terser({})],
        },
    ],
    external: externals,
    plugins: [typescript()],
};
