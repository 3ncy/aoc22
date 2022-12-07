var fs = require("fs");
const { json } = require("stream/consumers");
let input = fs.readFileSync("in.test.txt").toString().split("\n");

let files = {};
let currentDir = files;
let path = [];
let directories = [];

for (let line of input) {
    line = line.split(" ");
    if (line[0] === "$") { // is a command
        if (line[1] === "cd") {
            if (line[2] === "/") {
                currentDir = files;
                path = [];
            } else if (line[2] === "..") {
                path.pop();
                goTo(path);
            } else {
                path.push(line[2]);
                currentDir = currentDir[line[2]]
            }
        }
    } else { // is output of ls
        if (!currentDir.hasOwnProperty(line[1])) {
            if (line[0] === "dir") {
                currentDir[line[1]] = {};
                // directories[line[1]] = structuredClone(path); //TODO: this could be substituted by a .join('.') and then by .split('.'), the question is, which one is more performant

                if (path.length === 0) {
                    // directories[line[1]] = line[1];
                    directories.push(line[1])
                } else {

                    // directories[line[1]] = path.join('.') + "." + line[1];
                    directories.push(path.join('/') + "/" + line[1]);
                }
            } else {
                currentDir[line[1]] = Number(line[0]);
            }

        }
    }
}

console.log(files);
// console.log(path);


function goTo(path) {
    currentDir = files;
    for (let dir of path) {
        currentDir = currentDir[dir];
    }
}


let sum = 0;
//it may be required in the 2nd part to identify which folders are small or sth
// let smallDirSizes = [];
console.log(directories);
for (let dir of directories) {
    //for each directory

    console.log(dir.split('/'));
    // goTo(dir.split('/'));
    //run thorugh all files + dirs in there
    let folderSize = foo(dir.split('/'));
    if (folderSize <= 100000) {
        sum += folderSize;
    }
}
console.log(sum);



function foo(path) {
    let sum = 0;
    goTo(path);
    console.log({ current: currentDir });


    Object.keys(currentDir).forEach((item, index) => {
        if (typeof currentDir[item] === "number") {
            sum += currentDir[item];
        } else { //it's a directory
            //recursion

            let tempPath = JSON.parse(JSON.stringify(path));
            path.push(item);
            // path.shift();
            sum += foo(path)
            path = JSON.parse(JSON.stringify(tempPath));
            goTo(path);
        }
    });

    return sum;
}




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

/*
[ 'a', 'd', 'a.e' ]
[ 'a' ] -> { e: { i: 584 }, f: 29116, g: 2557, 'h.lst': 62596 }
[ 'd' ] -> { j: 4060174, 'd.log': 8033020, 'd.ext': 5626152, k: 7214296 }
[ 'a', 'e' ] -> { i: 584 }
*/