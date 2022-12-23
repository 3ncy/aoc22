const fs = require('fs');
let input = fs.readFileSync('in.test.txt').toString().split("\n");
let instructions = input.pop();
input.pop(); //remove the empty line dividing instructions and the map
let map = [];

for (let r = 0; r < input.length; r++) { // r as in a row
    map[r] = [];
    for (let c = 0; c < input[r].length; c++) { // c as in a collumn
        map[r][c] = input[r][c];
        // if(input[r][c] == " ")
        // map[r][c] == "X"
    }
}


let pos = { x: map[0].findIndex(x => x === "."), y: 0 }; //leftmost open tile in the top row

let instructionPos = 0;
let distance = null;
let direction = 0;  // 0 right; 1 down; 2 left; 3 up
while (true) {
    if (instructions[instructionPos] == "L") { // -1
        if (direction === 0) direction = 3
        else direction -= 1;
        instructionPos++;
        continue;
    } else if (instructions[instructionPos] == "R") { // +1
        if (direction === 3) direction = 0
        else direction += 1;
        instructionPos++;
        continue;
    }

    if (isNaN(instructions[instructionPos + 1])) {
        //this letter si the last digit of the number
        distance += "" + instructions[instructionPos];



        // do something

        while (true) {//moviment

            //check if there is a wall
            //-  if no, walk
            //-  if yes, don't walk

            if (!isNextStepWall()) {

            }


            function isNextStepWall() {
                /*
                0 right; 1 down; 2 left; 3 up
                y:x

                x 2 0 -> 1 -1 -> -1 1
                y 1 3 -> -1 1

                */



                let targetPos = {
                    x: pos.x + (direction % 2 == 0) ? (direction - 1) * -1 : 0,
                    y: pos.y + (direction % 2 == 1) ? direction - 2 : 0
                }
                console.log({targetPos: targetPos})
            }
        }











        //reset the distance variable
        distance = null;
        instructionPos++;
        continue;
    } else {

        distance += "" + instructions[instructionPos];
        instructionPos++;
        continue;
    }


}

console.log();