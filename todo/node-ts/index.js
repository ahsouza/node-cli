#!/usr/bin/env node
const
 setup = require('commander'),
 package = require('./../package.json')

setup.version(package.version);

setup
    .command('start [node_ts]')
    .description('Starting project React.js  TODO')
    .action((node_ts) => {
      console.log(node_ts);
    });

setup.parse(process.argv);