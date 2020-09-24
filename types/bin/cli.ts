#!/usr/bin/env node
import commander from 'commander'
import fs from 'fs'
import path from 'path'
import writeFile from '../writeFileTree'
import childProcess from 'child_process'
import chalk from 'chalk'
const pkg = require('../../package')
let tempDir = path.join(__dirname, '..', '..', `${path.sep}template${path.sep}`)


let projectRoot = process.cwd()
let appName: string = ''

commander.version(`${pkg.name} ${pkg.version}`)

commander.command('create <name>').option('--port [port]', `specify port (default: ${8888})`).description('创建项目').action(function (name: any, cmd: any) {
  appName = name
  let projectPath = path.join(projectRoot, `${path.sep}` + appName)
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath)
  }
  writeFile.copyFilesFromDir(tempDir, projectPath)
  writeFile.writePkgJson({ appName, port: cmd.port }, projectPath)
  console.log('初始化成功 请运行 npm install 安装依赖')
  console.log('')
  console.log('npm run start 启动项目')
  // childProcess.execSync(`npm install`, {
  //   cwd: projectPath
  // })
  // if (!fs.existsSync(path.join(projectPath, `${path.sep}` + 'tsconfig.json'))) {
  //   console.log(childProcess.execSync(`tsc --init`, {
  //     cwd: projectPath,
  //     encoding: 'utf8'
  //   }))
  // }

})

commander.on('--help', () => {
  console.log()
  console.log(`  Run ${chalk.cyan(`${pkg.name} <command> --help`)} for detailed usage of given command.`)
  console.log()
})

commander.parse(process.argv)


