#!/usr/bin/env node

const setup = require('commander'),
 { join } = require('path'),
 fs = require('fs'),
 inquirer = require('inquirer'),
 package = require('../package.json'),
 projectsPath = join(__dirname, 'databases.json'),
 chalk = require('chalk'),
 exec = require('child_process').exec;

const getJson = (path) => {
  const data = fs.existsSync(path) ? fs.readFileSync(path) : []
  try {
    return JSON.parse(data)
  } catch (e) {
    return []
  }
}
const saveJson = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, '\t'));

setup.version(package.version);

  setup
  .command('install [database]')
  .description('Connect with database server')
  .option('-s, --status [status]', 'Status Database')
  .action(async (database, options) => {
    let answers;
    if (!database) {
      answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'database',
          checked: true,
          message: 'Create project with which database?',
          choices: ['MySQL', 'MariaDB', 'MongoDB', 'Firebase', 'PostgreSQL', 'DynamoDB', 'Oracle DB'],
          validate: value => value ? true : 'It is necessary to choose a database'
        }
      ])
    }

     
    const data = getJson(projectsPath);
    data.push({
      database: database || answers.database,
      done: (options.status === 'true') || false
    });
    saveJson(projectsPath, data);
    console.log(`${chalk.green(`Create project in ${answers.database} with success!`)}`)
  })

setup.parse(process.argv);