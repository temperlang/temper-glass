
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { autoReload } from "rollup-plugin-auto-reload"

export default {
    input: 'internal/index.js',
    output: {
        file: 'out/index.js',
    },
    plugins: [
        nodeResolve({
            main: true,
            jsnext: true,
            browser: true,
            preferBuiltins: true
        }),
        autoReload({
            
        }),
    ],
};
