const fs = require('fs');
let input = fs.readFileSync('./in.test.txt').toString()
    .split("\n").map(x => x.split(" -> ").map(x => x.split(',').map(x => Number(x))));

let map = [];


//figure out the smallest X (the rest is prolly useless, idk yet) to offset the array by it - so I don't have to create a 550 x 50 array
let sortedByX = input.flat().sort((a, b) => a[0] < b[0] ? -1 : 1);
let rawMinX = sortedByX[0][0];
let rawMaxX = sortedByX.at(-1)[0];
let sortedByY = input.flat().sort((a, b) => a[1] < b[1] ? -1 : 1);
let minY = sortedByY[0][1];
let maxY = sortedByY.at(-1)[1];
let minX = rawMinX - rawMinX;
let maxX = rawMaxX - rawMinX;
console.log({ minX: rawMinX, maxX: rawMaxX, minY: minY, maxY: maxY, n_minX: minX, n_maxX: maxX, width: rawMaxX - rawMinX + 1 });

// prefill the map with column arrays
map[maxY] = [];
map.fill([]);

/*

  4     5  5
  9     0  0
  4     0  3
0 ......+...
1 ..........
2 ..........
3 ..........
4 ....#...##
5 ....#...#.
6 ..###...#.
7 ........#.
8 ........#.
9 #########.

*/


console.log(input)
for (let path of input) {
    for (let node of path) {
        //node[0] -> x
        //node[1] -> y
        // console.log(node);
        map[node[1]][node[0] - rawMinX] = "#";
        console.log(`inserting at pos: ${node[1]}, ${node[0] - rawMinX}`)
    }
}

for(let i = 0; i < map.length; i++){
    for(let j = 0; j < map[0].length; j++){
        if(map[i][j] === undefined) map[i][j] = "."
    }
}

// console.log(map)
console.log(map.length);