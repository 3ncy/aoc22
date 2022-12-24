const fs = require('fs');
const { getEnvironmentData } = require('worker_threads');
let map = fs.readFileSync('in.test.txt').toString().split("\n").map((row, y) => {
    return row.split("").map((e, x) => {
        return {
            height: e.charCodeAt(0),
            f: 0, g: 0, h: 0, parent: null,
            pos: { y: y, x: x }
        }
    })
})

/*
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi

v..v<<<<
>v.vv<<^
.>vv>E^^
..v>>>^^
..>>>>>^
*/


// console.log(input.flat())
let startNode = map.flat().find(e => e.height == 83);
let endNode = map.flat().find(e => e.height == 69);
// console.log({start: startNode, end: endNode})


let object = {
    height: 26,
    f: 0, g: 0, h: 0,
    parent: null
}

let pos = { y: 0, x: 0 }; //next time maybe find the pos of "S"
let startPos = { y: 0, x: 0 };

let openList = [];
let closedList = [];

openList.push(startNode)


while (openList.length > 0) {

    //             get the item with the lowest f value
    let lowestFIndex = 0;
    for (let i = 0; i < openList.length; i++) {
        if (openList[i].f < openList[lowestFIndex].f)
            lowestFIndex = i;
    }

    let current = openList.splice(lowestFIndex, 1)[0];
    console.log(current);
    closedList.push(current);

    //              if current if final
    //TODO: 
    if (current.pos.x == endNode.pos.x && current.pos.y == endNode.pos.y) {
        console.log("eeeyyy")
        console.log(current.parent);
    }

    //              get the possible neighbour cells
    let neighbours = [];
    if (getNeighbour(1, 0)) neighbours.push(getNeighbour(1, 0)); //yea idc it's 2x, I couldve just added undefined and filtered it out ig
    if (getNeighbour(0, 1)) neighbours.push(getNeighbour(1, 1));
    if (getNeighbour(-1, 0)) neighbours.push(getNeighbour(-1, 0));
    if (getNeighbour(0, -1)) neighbours.push(getNeighbour(0, -1));
    function getNeighbour(x, y) {
        if (map[current.pos.y + y]?.[current.pos.x + x]) {
            if (map[current.pos.y + y]?.[current.pos.x + x].height + 1 <= current.height)
                return map[current.pos.y + y]?.[current.pos.x + x];
        }
    }

    for (let neighbour of neighbours) {

        let g = current.g + 1;
        let betterG = false;

        let isOnOpenList = openList.find(n => n.pos.x == neighbour.pos.x && n.pos.y == neighbour.pos.y)
        if (!isOnOpenList) {
            betterG = true;
            neighbour.h = Math.abs(endNode.pos.x - neighbour.pos.x) + Math.abs(endNode.pos.y - neighbour.pos.y);
        } else if (g < neighbour.g) { //found a better way to the neighbor
            betterG = true;
        }

        if (betterG) {
            neighbour.parent = current;
            neighbour.g = g;
            neighbour.f = neighbour.g + neighbour.h; //no need to calculate again, either we did just a moment ago or last time it was visited
        }
    }

}
