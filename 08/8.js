var fs = require("fs");
let input = fs.readFileSync("in.txt").toString().split("\n");


let visibleTrees = 0;
for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {
        if (y == 0 || x == 0 || y == input.length - 1 || x == input[y].length - 1) {
            visibleTrees++; //all trees on the edge are visible
            continue;
        }

        function areTreesSmaller(trees, tree) {
            if (trees.every(x => x < tree)) {
                visibleTrees++;
                return true;
            }
            return false;
        }

        if (areTreesSmaller(input[y].slice(0, x).split(""), input[y][x])) continue; //left

        if (areTreesSmaller(input[y].slice(x + 1).split(""), input[y][x])) continue; //righ

        if (areTreesSmaller(input.map(line => line.slice(x, x + 1)).slice(0, y), input[y][x])) continue; //up

        // console.log(input.map(line => line.slice(x, x + 1)).slice(y + 1));
        if (areTreesSmaller(input.map(line => line.slice(x, x + 1)).slice(y + 1), input[y][x])) continue; //down

    }
}
console.log(visibleTrees);