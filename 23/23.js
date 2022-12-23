const util = require('util');
const fs = require('fs');
let input = fs.readFileSync('in3.test.txt').toString().split("\n");

let checkDirections = {
    "N": [{ x: -1, y: -1 }, { x: 0, y: -1 }, { x: 1, y: -1 }],
    "S": [{ x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }],
    "W": [{ x: -1, y: -1 }, { x: -1, y: 0 }, { x: -1, y: 1 }],
    "E": [{ x: 1, y: -1 }, { x: 1, y: 0 }, { x: 1, y: 1 }]
};
let moveDirections = {
    "N": { x: 0, y: -1 },
    "S": { x: 0, y: 1 },
    "W": { x: -1, y: 0 },
    "E": { x: 1, y: 0 }
};
let directions = ["N", "S", "W", "E"];

let elf = {
    // directions: ["N", "S", "W", "E"],
    /*
    N S W E 
       N        S       W       E 
    [0, -1], [0, 1], [-1, 0], [1, 0]

                N                          S                        W                          E 
             [0, -1]                    [0, 1]                   [-1, 0]                    [1, 0]
    [-1, -1] [0, -1] [1, -1]    [-1, 1] [0, 1] [1, 1]   [-1, -1] [-1, 0] [-1, 1]    [1, -1] [1, 0] [1, 1]

    */
    proposedPos: null, //the direction this elf wants to go
    cycle: 0
}
class Elf {
    cycle = 0;
    proposedPos = null;

    [util.inspect.custom](depth, opts) {
        return "'#'";
    }

    toString() {
        return "#";
    }
}
// Elf.prototype.toString = function () { return "#" };
// return;
let map = {}; //yes, ik, not []
let y = 0;
for (let line of input) {

    map["" + y] = []

    for (let x = 0; x < line.length; x++) {
        if (line[x] == ".")
            map[y][x] = ".";
        else
            map[y][x] = new Elf();
    }

    y++;
}

// console.log(map);


let proposedPositions = []
for (let cycle = 1; cycle <= 10; cycle++) {
    //run through all the elves
    //  check if they can move
    //  add their desired pos to array

    //run through them all once more :(
    //  increment their cycle variable, work only w those where elf.cycle < cycle
    //  check if they want to move
    //  check their desired pos agains the array, if it's there >1x, don't move

    //finally recycle direction
    //and proposedPos




    Object.keys(map).forEach(y => { //outer loop for Y
        // for (let x = 0; x < map[y].length; x++) {
        for (let x of map[y].keys()) {
            y = Number(y);
            x = Number(x);


            let elf = map[y][x];
            if (elf === ".") continue; //if the elf isn't an elf :P

            // console.log("checking elf at [%s,%s]", x, y);


            // if (noElvesAround) { //if he doesn't have to move, he won't
            if (checkForElveAbsenceInDir("N") && checkForElveAbsenceInDir("S") && checkForElveAbsenceInDir("W") && checkForElveAbsenceInDir("E")) {
                // console.log("no elves are around this one, it will stay")
                elf.proposedPos = null;
                continue;
            }

            //check for positions around
            for (let dir of directions) {
                let elvesNotInDirection = checkForElveAbsenceInDir(dir);
                // console.log(`checked positions are: [${x + checkDirections[dir][0].x},${y + checkDirections[dir][0].y}]; [${x + checkDirections[dir][1].x},${y + checkDirections[dir][1].y}]; [${x + checkDirections[dir][2].x},${y + checkDirections[dir][2].y}]`)

                // console.log(`there are ${elvesNotInDirection ? "no " : ""}elves in the ${dir}, ${elvesNotInDirection ? "moving to " + dir : ""}`);
                if (elvesNotInDirection) {
                    elf.proposedPos = { x: x + moveDirections[dir].x, y: y + moveDirections[dir].y };
                    proposedPositions.push(elf.proposedPos);
                    break;
                }

            }

            function checkForElveAbsenceInDir(dir) {
                return typeof map[y + checkDirections[dir][0].y]?.[x + checkDirections[dir][0].x] !== "object" &&
                    typeof map[y + checkDirections[dir][1].y]?.[x + checkDirections[dir][1].x] !== "object" &&
                    typeof map[y + checkDirections[dir][2].y]?.[x + checkDirections[dir][2].x] !== "object";
            }
        }
    });




    //now we loop again - the moving half of the round
    Object.keys(map).forEach(y => { //outer loop for Y
        // for (let x = 0; x < map[y].length; x++) {
        for (let x of map[y].keys()) {
            y = Number(y);
            x = Number(x);
            let elf = map[y][x];
            if (elf === ".") continue;


            if (cycle == 2) {
                console.log();
            }

            if (elf.cycle >= cycle) continue; //this elf has already moved this round
            elf.cycle++;

            if (elf.proposedPos == null) continue;

            if (proposedPositions.filter(p => p.x === elf.proposedPos.x && p.y === elf.proposedPos.y).length > 1) {
                //more elves want to move to this same spot
                continue;
            }

            if (map[elf.proposedPos.y] == undefined) {
                // map["" + elf.proposedPos.y] = [];
                map["" + elf.proposedPos.y] = Array(map[y].length).fill('.');
            }

            //here should be some check if elf.proposedPos == null, then don't move it. shouldn't matter anyway
            map[y][x] = ".";
            map[elf.proposedPos.y][elf.proposedPos.x] = elf;
        }
    });

    //change the directions
    directions.push(directions.shift());

    console.log("------------------------- status after cycle " + cycle + " ----------------------------");
    console.log(proposedPositions);
    console.log(map);
    // console.log(JSON.stringify(map).replaceAll('],"', '],\n"'));
    logMap();
    console.log(directions)


    proposedPositions = [];
}
console.log();

function logMap() {
    for (let row of Object.values(map)) {
        let r = "";
        for (let col of Object.values(row)) {
            r += col;
        }
        console.log(r);
    }
}



//and now to figure the rectangle:
//find a smallest rectangle that can fit all the elves
//then count the number of empty tiles inside.


//extend shorter rows
let maxLength = 0;
Object.values(map).forEach(r => {
    if (Object.keys(r).length > maxLength) maxLength = Object.keys(r).length;
    console.log(Object.keys(r))
});
console.log(maxLength);

Object.values(map).forEach(r => {
    r.length
});