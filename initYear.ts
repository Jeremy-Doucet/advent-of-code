import chalk from 'chalk';
import { exists, existsSync, mkdirSync, readFileSync, rmSync, writeFile, writeFileSync } from 'fs';
import { compile } from 'handlebars';

const readmeTemplate = compile(readFileSync('./_template_files/readme.md').toString())
const indexTemplate = compile(readFileSync('./_template_files/index.ts').toString())
const packageJsonTemplate = compile(readFileSync('./_template_files/package.json').toString())
const indexTestTemplate = compile(readFileSync('./_template_files/index.test.ts').toString())

const year = process.argv.slice(2)[0]
if (!year) {
  console.log(chalk.red('Please provide a year'))
  process.exit(1)
}

function run() {
  if (!existsSync(`./${year}`)) {
    mkdirSync(`./${year}`)
  }

  [...Array(25).keys()].forEach((num) => {
    const day = (num + 1).toString().padStart(2, '0');
    if (!existsSync(`./${year}/day_${day}`)) {
      mkdirSync(`./${year}/day_${day}`)
    }

    // Create README
    if (!existsSync(`./${year}/day_${day}/README.md`)) {
      const readme = readmeTemplate({ day })
      writeFileSync(`./${year}/day_${day}/README.md`, readme)
    }

    // Create input.txt
    if (!existsSync(`./${year}/day_${day}/input.txt`)) {
      const inputTxt = readFileSync(`./_template_files/input.txt`).toString()
      writeFileSync(`./${year}/day_${day}/input.txt`, inputTxt)
    }

    // Create input.txt
    if (!existsSync(`./${year}/day_${day}/input.test.txt`)) {
      const inputTxt = readFileSync(`./_template_files/input.txt`).toString()
      writeFileSync(`./${year}/day_${day}/input.test.txt`, inputTxt)
    }

    // Create index.ts
    if (!existsSync(`./${year}/day_${day}/index.ts`)) {
      const index = indexTemplate({ })
      writeFileSync(`./${year}/day_${day}/index.ts`, index)
    }

    // Create package.json
    if (!existsSync(`./${year}/day_${day}/package.json`)) {
      const packageJson = packageJsonTemplate({ day, year })
      writeFileSync(`./${year}/day_${day}/package.json`, packageJson)
    }

    // Create tsconfig.json
    if (!existsSync(`./${year}/day_${day}/tsconfig.json`)) {
      const tsconfig = readFileSync('./_template_files/tsconfig.json').toString()
      writeFileSync(`./${year}/day_${day}/tsconfig.json`, tsconfig)
    }

    // Create jest.config.js 
    if (!existsSync(`./${year}/day_${day}/jest.config.js`)) {
      const jestConfig = readFileSync('./_template_files/jest.config.js').toString()
      writeFileSync(`./${year}/day_${day}/jest.config.js`, jestConfig)
    }

    // Create index.test.ts
    if (!existsSync(`./${year}/day_${day}/index.test.ts`)) {
      const indexTest = indexTestTemplate({ day })
      writeFileSync(`./${year}/day_${day}/index.test.ts`, indexTest)
    }

    console.log(num)
  })
}

run()