// console.log("hi")
// const fs = require('fs')
// async function showdir(path) {
//     const dir = await fs.promises.opendir(path);
//     for await (const direct of dir) {
//         console.log(direct.name)
//     }
// }
// showdir('C:/Users')


const fs = require("fs")
const chalk = require("chalk")
const path = require('path')

const targetDir = 'c:/users'

fs.readdir(targetDir, async(err, files) => {
    if (err)
        console.log(err);

    const statPromises = files.map(filename => {
        return lstat(path.join(targetDir, filename));
    })
    const allStats = await Promise.all(statPromises);
    for (let stat of allStats) {
        const index = allStats.indexOf(stat);
        if (stat.isFile())
            console.log(chalk.bold.redBright(files[index]))
        else
            console.log(chalk.yellowBright(files[index]))
    }
});


const lstat = targetPath => {
    return new Promise((resolve, reject) => {
        fs.lstat(targetPath, (err, stats) => {
            if (err)
                reject(err);
            resolve(stats);
        })
    })
}