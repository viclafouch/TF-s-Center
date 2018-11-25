const fs = require('fs');
const path = require('path');
const AdmZip = require('adm-zip');
const emoji = require('node-emoji');
const colors = require('colors');

const directory = 'dist';
const zip = new AdmZip();

const zipFileName = `${directory}/TF-Center-${+new Date}.zip`
const messageOk = `${emoji.get('package')}  Zip file ready to be published on ${colors.blue.underline('https://chrome.google.com/u/1/webstore/devconsole')} !`
const messageNotOk = `${emoji.get('rotating_light')}  ${colors.red('An error occured while zipping files !')} ${emoji.get('rotating_light')}`

fs.existsSync(`./${directory}`) || fs.mkdirSync(`./${directory}`)

async function removeFiles(directory) {
  await fs.readdir(directory, async (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), err => {
        if (err) { throw err }
      });
    }
  });
}

async function published() {
  try {
    await removeFiles(directory);

    zip.addLocalFolder("./build/", "./");
    zip.writeZip(zipFileName);
    console.log(messageOk);
  } catch (error) {
    console.log(messageNotOk);
    console.log(`${colors.red('------------')}`)
    console.log(`${colors.red(error)}`)
    console.log(`${colors.red('------------')}`)
  }
}

published()