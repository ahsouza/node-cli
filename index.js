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
  .command('start [angular]')
  .description('Start new project using Angular.js')
  .action(async (project) => {
    let answers;
    if (!project) {
      answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'project',
          message: 'Qual é o seu to-do?'
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

  setup
  .command('start [react]')
  .description('Start new project using React.js')
  .action(async (project) => {
    let answers;
    if (!project) {
      answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'project',
          message: 'Qual é o seu to-do?'
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

  setup
  .command('start [vue]')
  .description('Start new project using Vue.js')
  .action(async (project) => {
    let answers;
    if (!project) {
      answers = await inquirer.prompt([
        {
          type: 'input',
          name: 'project',
          message: 'Qual é o seu to-do?'
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