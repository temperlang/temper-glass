
import {readFile, readFileSync} from 'fs';
import {exec} from 'child_process';
import {createServer} from 'http';

const maps = {
    rollup: exec('npx rollup -w -c rollup.config.js'),
    temper: exec('temper watch -b js'),
};

const fmt = (data) => {
    return html
        .replace('$version', `${n}`)
        .replace('$script', new String(data));
};

const html = String(readFileSync('out/index.html'));
let n = 0;
let all = fmt(String(readFileSync('out/index.js')));
let index = '';

const update = () => {
    readFile('out/index.js', (err, data) => {
        const str = String(data);
        if (index !== str) {
            n += 1;
            all = fmt(str);
        }
        index = str;
    });
};

setInterval(update, 1000);

createServer((req, res) => {
    if (req.url === '/index.html' || req.url === '/') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(all);
    } else if (req.url === '/version') {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end(String(n));
    }
}).listen(4984);

for (const key in maps) {
    const proc = maps[key];
    proc.stdout.on('data', (data) => {
        console.log(`${key}: ${data}`.trim());
    })
    proc.stderr.on('data', (data) => {
        console.log(`${key}: ${data}`.trim());
    })
}
