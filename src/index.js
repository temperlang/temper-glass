
import { Loader, box, ready } from '../temper.out/js/temper-html/inter.js';
import '../temper.out/js/temper-html/app.js';

box.impl = new class extends Loader {
    load(s) {
        return new Function('arg', s);
    }
};

ready();

