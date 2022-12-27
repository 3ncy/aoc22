const fs = require('fs');
// const util = require('util');
let map = fs.readFileSync('in.txt').toString().split("\n").map((row, y) => {
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


let startNode = map.flat().find(e => e.height == 83);
let endNode = map.flat().find(e => e.height == 69);
// console.log({start: startNode, end: endNode})
startNode.height = 97;
endNode.height = 122;


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
    // console.log("curr: " + util.inspect(current, false, null, true));

    closedList.push(current);
    // console.log({ c: String.fromCharCode(current.height), open: openList.length, closed: closedList.length })

    //              if current is final
    if (current.pos.x == endNode.pos.x && current.pos.y == endNode.pos.y) {
        console.log("eeeyyy")
        let curr = current;
        let path = [];

        while (curr.parent) {
            path.push(curr);
            curr = curr.parent;
            if (path.length > 150000) { console.log("wtf"); return; }
        }

        console.log(path.length);
        return;
    }

    //              get the possible neighbour cells
    let neighbours = [];
    if (getNeighbour(1, 0)) neighbours.push(getNeighbour(1, 0)); //yea idc it's 2x, I couldve just added undefined and filtered it out ig
    if (getNeighbour(0, 1)) neighbours.push(getNeighbour(0, 1));
    if (getNeighbour(-1, 0)) neighbours.push(getNeighbour(-1, 0));
    if (getNeighbour(0, -1)) neighbours.push(getNeighbour(0, -1));
    function getNeighbour(x, y) {
        if (map[current.pos.y + y]?.[current.pos.x + x]) {
            // console.log("neigh at %d %d is in borders has heigh %d, max posibble is %d", current.pos.y + y, current.pos.x + x, map[current.pos.y + y]?.[current.pos.x + x].height, current.height + 1);

            if (map[current.pos.y + y]?.[current.pos.x + x].height <= current.height + 1) {
                return map[current.pos.y + y]?.[current.pos.x + x];
            }
        }
    }

    for (let neighbour of neighbours) {
        // console.log("neigh: " + util.inspect(neighbour, false, null, true));
        if (closedList.find(n => n.pos.x == neighbour.pos.x && n.pos.y == neighbour.pos.y)) continue;

        let g = current.g + 1;
        let betterG = false;

        let isOnOpenList = openList.find(n => n.pos.x == neighbour.pos.x && n.pos.y == neighbour.pos.y);
        if (!isOnOpenList) {
            betterG = true;
            neighbour.h = Math.abs(endNode.pos.x - neighbour.pos.x) + Math.abs(endNode.pos.y - neighbour.pos.y);
            openList.push(neighbour);
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
