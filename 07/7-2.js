var fs = require("fs");
let input = fs.readFileSync("in.txt").toString().split("\n");

let files = { "/": {} };
let currentDir = files["/"];
let path = ["/"];
let directories = [];

for (let line of input) {
    line = line.split(" ");
    if (line[0] === "$") { // line is a command
        if (line[1] === "cd") {
            if (line[2] === "/") {
                currentDir = files["/"];
                path = ["/"];
            } else if (line[2] === "..") {
                path.pop();
                goToDir(path);
            } else {
                path.push(line[2]);
                currentDir = currentDir[line[2]]
            }
        }
    } else { // line is an output of ls
        if (!currentDir.hasOwnProperty(line[1])) {
            if (line[0] === "dir") {
                currentDir[line[1]] = {};
                if (path.length === 0) {
                    // directories[line[1]] = line[1];
                    directories.push(line[1])
                } else {

                    // directories[line[1]] = path.join('.') + "." + line[1];
                    directories.push(path.join('-') + "-" + line[1]);
                }
            } else {
                currentDir[line[1]] = Number(line[0]);
            }

        }
    }
}
console.log("files:")
console.log(files);
// console.log(path);


function goToDir(path) {
    currentDir = files;
    for (let dir of path) {
        currentDir = currentDir[dir];
    }
}


// let sum = 0;

let freeSpace = 70_000_000 - getSizeOfDir(["/"]);
let neededSpace = 30_000_000 - freeSpace;
console.log(`have free: ${freeSpace}, need additional: ${neededSpace}`);


directories.push("/");
console.log({ directories: directories });

let prevClosest = 70_000_000;

for (let dir of directories) {
    let folderSize = getSizeOfDir(dir.split('-'));

    if(neededSpace - folderSize < 0 && folderSize < prevClosest) prevClosest = folderSize;

    console.log({ dir: dir, size: folderSize });
}

console.log("We need to remove the folder with the size of: " + prevClosest);


function getSizeOfDir(path) {
    let sum = 0;
    goToDir(path);

    Object.keys(currentDir).forEach((item, index) => {
        if (typeof currentDir[item] === "number") {
            sum += currentDir[item];
        } else { //it's a directory
            //recursion
            let tempPath = JSON.parse(JSON.stringify(path));
            path.push(item);

            sum += getSizeOfDir(path)

            path = JSON.parse(JSON.stringify(tempPath));
            goToDir(path);
        }
    });

    return sum;
}



/*
let xxx = {
    'a': {
        'e': {
            'i': 584
        },
        'f': 29116,
        'g': 2557,
        'h.lst': 62596
    },
    'b.txt': 14848514,
    'c.dat': 8504156,
    'd': {
        'j': 4060174,
        'd.log': 8033020,
        'd.ext': 5626152,
        'k': 7214296
    }
}
*/
/*
[ 'a', 'd', 'a.e' ]
[ 'a' ] -> { e: { i: 584 }, f: 29116, g: 2557, 'h.lst': 62596 }
[ 'd' ] -> { j: 4060174, 'd.log': 8033020, 'd.ext': 5626152, k: 7214296 }
[ 'a', 'e' ] -> { i: 584 }
*/