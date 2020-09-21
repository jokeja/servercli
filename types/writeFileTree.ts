
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
    devDependencies: {
      "@types/node": "^14.10.3"
    },
    "scripts": {
      "start": "node ./src/server"
    },
  }
  fs.writeFileSync(path.join(dirpath, `${path.sep}package.json`), JSON.stringify(pkg, null, 2))
}
interface Package {
  appName: string
}
export default { copyFilesFromDir, writePkgJson }