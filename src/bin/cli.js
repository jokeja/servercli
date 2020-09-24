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
var chalk_1 = __importDefault(require("chalk"));
var pkg = require('../../package');
var tempDir = path_1.default.join(__dirname, '..', '..', path_1.default.sep + "template" + path_1.default.sep);
var projectRoot = process.cwd();
var appName = '';
commander_1.default.version(pkg.name + " " + pkg.version);
commander_1.default.command('create <name>').option('--port [port]', "specify port (default: " + 8888 + ")").description('创建项目').action(function (name, cmd) {
    appName = name;
    var projectPath = path_1.default.join(projectRoot, "" + path_1.default.sep + appName);
    if (!fs_1.default.existsSync(projectPath)) {
        fs_1.default.mkdirSync(projectPath);
    }
    writeFileTree_1.default.copyFilesFromDir(tempDir, projectPath);
    writeFileTree_1.default.writePkgJson({ appName: appName, port: cmd.port }, projectPath);
    console.log('初始化成功 请运行 npm install 安装依赖');
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
commander_1.default.on('--help', function () {
    console.log();
    console.log("  Run " + chalk_1.default.cyan(pkg.name + " <command> --help") + " for detailed usage of given command.");
    console.log();
});
commander_1.default.parse(process.argv);
