#!/usr/bin/env node
const
 setup = require('commander'),
 package = require('./../package.json')

setup.version(package.version);

setup
    .command('start todo [vue]')
    .description('Starting project Vue.js 2+  TODO')
    .action((vue) => {
      console.log(vue);
    });

setup.parse(process.argv);