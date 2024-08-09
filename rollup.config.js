
import { resolve, dirname, join } from 'path';
import { accessSync, F_OK } from 'fs';

const exists = (path) => {
    try {
        accessSync(path, F_OK);
        return true;
    } catch (e) {
        return false;
    }
}

const maps = [
    {
        key: '@temperlang/core',
        value: resolve('temper.out/js/temper-core/index.js'),
    },
]
const start = 'internal/index.js';

export default {
    input: start,
    output: {
        file: 'out/index.js',
    },
    plugins: [
        {
            resolveId: (importee, importer) => {
                if (start === importee) {
                    return start;
                }
                if (/^(?:\.\/|\.\.\/|\/)/.test(importee)) {
                    return join(dirname(importer), importee);
                }
                for (const {key, value} of maps) {
                    if (key === importee || (key instanceof RegExp && key.test(importee))) {
                        return join(value, importee.replace(key, ''));
                    }
                }
                return join(resolve('temper.out/js'), importee)
            },
        },
    ],
};
