#!/usr/bin/env node

const setup = require('commander'),
 { join } = require('path'),
 fs = require('fs'),
 inquirer = require('inquirer'),
 package = require('./package.json'),
 projectsPath = join(__dirname, 'projects.json')

const getJson = (path) => {
  const data = fs.existsSync(path) ? fs.readFileSync(path) : [];
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];      
  }
};
const saveJson = (path, data) => fs.writeFileSync(path, JSON.stringify(data, null, '\t'));

setup.version(package.version);

  setup
  .command('start [project]')
  .description('Start new project with tecnologies JS')
  .action(async (project) => {
    let answers;
    if (!project) {
      answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'project',
          message: 'Create project with which technology?',
          choices: ['Angular.js +8', 'Vue.js 2+', 'React.js']
        }
      ]);

    }
    const data = getJson(projectsPath);
    data.push({
      title: project || answers.project,
      done: false
    });
    saveJson(projectsPath, data);
  });


setup.parse(process.argv);