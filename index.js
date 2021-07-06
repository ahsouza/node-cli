#!/usr/bin/env node

const setup = require('commander'),
 { join } = require('path'),
 fs = require('fs'),
 inquirer = require('inquirer'),
 package = require('./package.json'),
 projectsPath = join(__dirname, 'projects.json'),
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
  .command('start [project]')
  .description('Start new project with tecnologies JS')
  .option('-s, --status [status]', 'Status project JS')
  .action(async (project, options) => {
    let answers;
    if (!project) {
      answers = await inquirer.prompt([
        {
          type: 'checkbox',
          name: 'project',
          checked: true,
          message: 'Creating project with which front-end technology?',
          choices: ['Angular.js +8', 'Vue.js 2+', 'React.js'],
          validate: value => value ? true : 'It is necessary to choose a technology'
        }
      ]);
      nameProject = await inquirer.prompt([
        {
          type: 'input',
          name: 'name_project',
          message: 'What is project name?',
        }
      ])
    }
    const data = getJson(projectsPath);
    let g_vue = 'npm install --save-dev @vue/cli',
     g_angular = 'npm install --save-dev @angular/cli@latest',
     g_react = 'npm install create-react-app',
     start_react = `npx create-react-app ${nameProject.name_project}`,
     start_angular = `npx ng new ${nameProject.name_project}`,
     start_vue = `npx @vue/cli create --default ${nameProject.name_project}`;
    
    if (answers.project == 'Angular.js +8') {
      exec(g_angular, {
        cwd: __dirname
      }, (err, stdout, stderr) => {
        console.log(stdout);
        if (err) console.log(err);
        else console.log(`${chalk.green(`Angular packages has been installed`)}`)
        exec(start_angular, {
         cwd: __dirname
        }, (err, stdout, stderr) => {
          console.log(stdout);
          if (err) console.log(err);
          else console.log(`${chalk.green(`Successfully generated project!`)}`)
        });
      });
    }

    if (answers.project == 'Vue.js 2+') {
      exec(g_vue, {
        cwd: __dirname
      }, (err, stdout, stderr) => {
        console.log(stdout);
        if (err) console.log(err);
        else console.log(`${chalk.green(`Vue packages has been installed`)}`)
        exec(start_vue, {
         cwd: __dirname
        }, (err, stdout, stderr) => {
          console.log(stdout);
          if (err) console.log(err);
          else console.log(`${chalk.green(`Successfully generated project!`)}`)
        })
      })
    }

    if (answers.project == 'React.js') {
      exec(g_react, {
        cwd: __dirname
      }, (err, stdout, stderr) => {
        console.log(stdout);
        if (err) console.log(err);
        else console.log(`${chalk.green(`React packages has been installed`)}`)
        exec(start_react, {
         cwd: __dirname
        }, (err, stdout, stderr) => {
          console.log(stdout);
          if (err) console.log(err);
          else console.log(`${chalk.green(`Successfully generated project!`)}`)
        })
      })
    }

    data.push({
      app: project || answers.project,
      done: (options.status === 'true') || false
    });
    saveJson(projectsPath, data);
    console.log(`${chalk.green(`Create project in ${answers.project} with success!`)}`)
  })
 
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

    if (answers.database === 'MySQL') {
      exec('node databases/index.js databases')

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