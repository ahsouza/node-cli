#!/usr/bin/env node
const
 setup = require('commander'),
 package = require('./../package.json')

setup.version(package.version);

setup
    .command('start [react]')
    .description('Starting project React.js  TODO')
    .action((react) => {
      console.log(react);
    });

setup.parse(process.argv);