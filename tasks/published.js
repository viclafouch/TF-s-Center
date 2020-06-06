const fs = require('fs')
const path = require('path')
const AdmZip = require('adm-zip')

const directory = 'dist'
const zip = new AdmZip()

const zipFileName = `${directory}/TF-Center-${+new Date()}.zip`
const messageOk = `Zip file ready to be published on https://chrome.google.com/u/1/webstore/devconsole !`

fs.existsSync(`./${directory}`) || fs.mkdirSync(`./${directory}`)

async function removeFiles(directory) {
  await fs.readdir(directory, async (err, files) => {
    if (err) throw err
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) {
          throw err
        }
      })
    }
  })
}

async function published() {
  try {
    await removeFiles(directory)

    if (!fs.existsSync('./build'))
      throw new Error('Build directory does not exist, please run npm build.')

    zip.addLocalFolder('./build/', '')
    zip.writeZip(zipFileName)
    console.log(messageOk)
  } catch (error) {
    console.error(error)
  }
}

published()
