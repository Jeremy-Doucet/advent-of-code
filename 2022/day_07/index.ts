import { readFileSync } from "fs";
import { chain, find, sumBy } from "lodash";

const input = readFileSync("./input.txt", "utf-8");

type File = {
  name: string;
  size: number;
}

class System {
  root: FileDirectory
  constructor(instructions: string[]) {
    this.root = new FileDirectory('/');
    this.followInstructions(instructions);
  }

  listAllDirs() {
    this.root.list();
  }

  followInstructions(instructions: string[]) {
    let currentDirectory: FileDirectory | undefined = this.root;

    instructions.forEach(instruction => {
      const [mainInstruction, ...subInstructions] = instruction.split('\n').filter(a => a)

      // CD
      if (mainInstruction.startsWith('cd')) {
        if (mainInstruction.endsWith('..')) {
          currentDirectory = currentDirectory?.parent;
        }
        else {
          const childDirectory = find(currentDirectory?.children, { name: mainInstruction.replace('cd ', '') })
          if (childDirectory) {
            currentDirectory = childDirectory;
          }
          else {
            const newDirectory = new FileDirectory(mainInstruction.replace('cd ', ''), currentDirectory);
            currentDirectory?.children.push(newDirectory);
            currentDirectory = newDirectory;
          }
        }
      }

      // LS
      if (mainInstruction.startsWith('ls')) {
        subInstructions.forEach(subInstruction => {
          const [size_or_dir, name, ..._rest] = subInstruction.split(' ')
          if (parseInt(size_or_dir)) {
            currentDirectory?.addFile({
              name,
              size: parseInt(size_or_dir)
            })
          } else {
            currentDirectory?.children?.push(new FileDirectory(name, currentDirectory))
          }
        })
      }
    })
  }

  getDirectories(size?: number) {
    const directories: FileDirectory[] = []
    const crawl = (directory: FileDirectory) => {
      if (!size || directory.size <= size) {  
        directories.push(directory)
      }
      directory.children.forEach(crawl)
    }
    crawl(this.root)
    return directories
  }
}

class FileDirectory {
  files: File[]
  children: FileDirectory[]
  parent?: FileDirectory
  name: string
  size: number

  constructor(name: string, parent?: FileDirectory) {
    this.files = []
    this.children = []
    this.name = name
    this.parent = parent;
    this.size = 0;
  }

  addFile(file: File) {
    this.files.push(file)
    this.updateSize(file.size)
  }

  list() {
    console.log(`Directory: ${this.name} - ${this.size}`)
    this.files.forEach(file => console.log(`${file.name} - ${file.size}`))
    this.children.forEach(child => child.list())
  }

  updateSize(size: number) {
    this.size += size
    if (this.parent) {
      this.parent.updateSize(size)
    }
  }
}

export function part1(data: string) {
  const system = new System(data.split('$ ').slice(1))
  return sumBy(system.getDirectories(100000), 'size')
}
console.log(`Part 1: ${part1(input)}`);

export function part2(data: string) {
  const TOTAL_DISK_SPACE = 70000000;
  const NEEDED_SPACE = 30000000;
  const system = new System(data.split('$ ').slice(1))

  const SPACE_NEEDED_TO_FREE = NEEDED_SPACE - (TOTAL_DISK_SPACE - system.root.size);
  return chain(system.getDirectories())
    .orderBy('size', 'desc')
    .filter(directory => directory.size > SPACE_NEEDED_TO_FREE)
    .last()
    .value()
    .size
}
console.log(`Part 2: ${part2(input)}`);

// Private functions