#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = __importDefault(require("commander"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var writeFileTree_1 = __importDefault(require("../writeFileTree"));
var child_process_1 = __importDefault(require("child_process"));
var tempDir = path_1.default.join(__dirname, '..', '..', path_1.default.sep + "template" + path_1.default.sep);
var projectRoot = process.cwd();
var appName = '';
commander_1.default.command('create <name>').description('创建项目').action(function (name, env) {
    appName = name;
    var projectPath = path_1.default.join(projectRoot, "" + path_1.default.sep + appName);
    if (!fs_1.default.existsSync(projectPath)) {
        fs_1.default.mkdirSync(projectPath);
    }
    writeFileTree_1.default.copyFilesFromDir(tempDir, projectPath);
    writeFileTree_1.default.writePkgJson({ appName: appName }, projectPath);
    child_process_1.default.execSync("npm install", {
        cwd: projectPath
    });
    if (!fs_1.default.existsSync(path_1.default.join(projectPath, "" + path_1.default.sep + 'tsconfig.json'))) {
        console.log(child_process_1.default.execSync("tsc --init", {
            cwd: projectPath,
            encoding: 'utf8'
        }));
    }
});
commander_1.default.parse(process.argv);
