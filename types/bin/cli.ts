#!/usr/bin/env node
import commander from 'commander'
import fs from 'fs'
import path from 'path'
import writeFile from '../writeFileTree'
import childProcess from 'child_process'

let tempDir = path.join(__dirname, '..', '..', `${path.sep}template${path.sep}`)


let projectRoot = process.cwd()
let appName: string = ''
commander.command('create <name>').description('创建项目').action(function (name, env) {
  appName = name
  let projectPath = path.join(projectRoot, `${path.sep}` + appName)
  if (!fs.existsSync(projectPath)) {
    fs.mkdirSync(projectPath)
  }
  writeFile.copyFilesFromDir(tempDir, projectPath)
  writeFile.writePkgJson({ appName }, projectPath)
  childProcess.execSync(`npm install`, {
    cwd: projectPath
  })
  if (!fs.existsSync(path.join(projectPath, `${path.sep}` + 'tsconfig.json'))) {
    console.log(childProcess.execSync(`tsc --init`, {
      cwd: projectPath,
      encoding: 'utf8'
    }))
  }
})
commander.parse(process.argv)


