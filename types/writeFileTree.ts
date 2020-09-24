
import fs from 'fs'
import path from 'path'
function copyFilesFromDir (dirPath: string, toPath: string) {
  let files = fs.readdirSync(dirPath, { withFileTypes: true })
  files.forEach(dirent => {
    console.log(dirent)
    let src = path.join(dirPath, `${path.sep}` + dirent.name)
    let dest = path.join(toPath, `${path.sep}` + dirent.name)
    if (dirent.isDirectory()) {
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest)
      }
      copyFilesFromDir(src, dest)
    } else {
      fs.copyFileSync(src, dest)
    }
  })
}
// package.json
function writePkgJson (options: Package, dirpath: string) {
  let pkg = {
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
      "pro": `node ./src/server --mode production --port ${options.port || 8888}`,
      "dev": `node ./src/server --port ${options.port || 8888}`
    },
  }
  fs.writeFileSync(path.join(dirpath, `${path.sep}package.json`), JSON.stringify(pkg, null, 2))
}
interface Package {
  appName: string,
  port: Number
}
export default { copyFilesFromDir, writePkgJson }