"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
function copyFilesFromDir(dirPath, toPath) {
    var files = fs_1.default.readdirSync(dirPath, { withFileTypes: true });
    files.forEach(function (dirent) {
        console.log(dirent);
        var src = path_1.default.join(dirPath, "" + path_1.default.sep + dirent.name);
        var dest = path_1.default.join(toPath, "" + path_1.default.sep + dirent.name);
        if (dirent.isDirectory()) {
            if (!fs_1.default.existsSync(dest)) {
                fs_1.default.mkdirSync(dest);
            }
            copyFilesFromDir(src, dest);
        }
        else {
            fs_1.default.copyFileSync(src, dest);
        }
    });
}
// package.json
function writePkgJson(options, dirpath) {
    var pkg = {
        name: options.appName,
        version: "0.1.0",
        private: true,
        dependencies: {
            "minimist": "^1.2.0"
        },
        devDependencies: {
            "@types/node": "^14.10.3"
        },
        "scripts": {
            "start": "node ./src/server --port " + (options.port || 8888)
        },
    };
    fs_1.default.writeFileSync(path_1.default.join(dirpath, path_1.default.sep + "package.json"), JSON.stringify(pkg, null, 2));
}
exports.default = { copyFilesFromDir: copyFilesFromDir, writePkgJson: writePkgJson };
