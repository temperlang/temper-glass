
import { Loader, box, ready } from 'temper-html/internal/js.js';
import 'temper-html/app.js';

const n = window.version;
setInterval(() => {
    fetch('/version')
        .then(res => res.text())
        .then(r => {
            if (Number(n) !== Number(r)) {
                location.reload();
            }
        });
}, 1000);

box.impl = new class extends Loader {
    load(s) {
        return new Function('arg', s);
    }
};
