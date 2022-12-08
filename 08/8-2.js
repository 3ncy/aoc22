var fs = require("fs");
let input = fs.readFileSync("in.txt").toString().split("\n");


let bestScore = 0;

for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[0].length; x++) {

        function nrOfVisibleTrees(trees, tree) {
            let treesVisible = 0;
            for (const t of trees) {
                if (t < tree)
                    treesVisible++;
                else
                    return ++treesVisible; //uhhh, this could be redone to not be duplicite, i guess
            }
            return treesVisible;
        }

        let currentTree = input[y][x];

        let treesToLeft = input[y].slice(0, x).split("").reverse();

        let treesToRight = input[y].slice(x + 1).split("");
        
        let treesToTop = input.map(line => line.slice(x, x + 1)).slice(0, y).reverse();

        let treesToBottom = input.map(line => line.slice(x, x + 1)).slice(y + 1);

        // console.log({
        //     tree: currentTree, left: nrOfVisibleTrees(treesToLeft, currentTree),
        //     right: nrOfVisibleTrees(treesToRight, currentTree),
        //     top: nrOfVisibleTrees(treesToTop, currentTree),
        //     bot: nrOfVisibleTrees(treesToBottom, currentTree)
        // });

        let visibilityFactor = nrOfVisibleTrees(treesToLeft, currentTree) *
            nrOfVisibleTrees(treesToRight, currentTree) *
            nrOfVisibleTrees(treesToTop, currentTree) *
            nrOfVisibleTrees(treesToBottom, currentTree);

        if (visibilityFactor > bestScore) bestScore = visibilityFactor;
    }
}
console.log(bestScore);