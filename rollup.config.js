
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
    input: 'src/index.js',
    output: {
        dir: 'out/chunks',
    },
    plugins: [
        nodeResolve({
            main: true,
            jsnext: true,
            browser: true,
            preferBuiltins: true
        }),
    ],
};
