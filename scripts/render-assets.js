'use strict';
const fs = require('fs');
const upath = require('upath');
const sh = require('shelljs');

module.exports = function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');

    sh.cp('-R', sourcePath, destPath)

    // SEO files must be served from the site root, not /assets/.
    const distRoot = upath.resolve(upath.dirname(__filename), '../dist');
    ['robots.txt', 'sitemap.xml'].forEach(function (name) {
        const from = upath.join(distRoot, 'assets', name);
        const to = upath.join(distRoot, name);
        if (fs.existsSync(from)) {
            sh.mv(from, to);
        }
    });
};