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


let startNode = map.flat().find(e => e.height == 83);
let endNode = map.flat().find(e => e.height == 69);
// "normalize" the heights of start and end to the range of lowercase ascii
startNode.height = 97;
endNode.height = 122;



let startNodes = map.flat().filter(e => e.height == 97);
startNodes.push(startNode);
// console.log("There are " + startNodes.length + " possible starting possitions")
let shortestPath = Infinity;
// let i = 0;
for (let possibleStart of startNodes) {

    // console.log("finding path nr " + i++);
    let path = findPath(possibleStart, endNode);
    let pathLength = (typeof path == "undefined") ? Infinity : path.length;
    if (pathLength < shortestPath) shortestPath = pathLength;

    //cleanup
    map.forEach(r => {
        r.forEach(e => {
            e.f = 0;
            e.g = 0;
            e.h = 0;
            e.parent = null;
        });
    });
}

console.log("Shortest path is " + shortestPath);


function findPath(startNode, endNode) {
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
            let curr = current;
            let path = [];

            while (curr.parent) {
                path.push(curr);
                curr = curr.parent;
            }

            return path;
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
}
