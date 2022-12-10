var fs = require("fs");
let input = fs.readFileSync("in.test.txt").toString().split("\n");

let head = { x: 0, y: 0 };
let tail = { x: 0, y: 0 };
let tailPositions = [];
// console.log({ head: head, tail: tail })

for (let instruction of input) {
    let moves = Number(instruction.split(" ")[1]);
    let direction = { x: 0, y: 0 };
    switch (instruction.split(" ")[0]) {
        case "U":
            direction = { x: 0, y: 1 };
            break;
        case "D":
            direction = { x: 0, y: -1 };
            break;
        case "L":
            direction = { x: -1, y: 0 };
            break;
        case "R":
            direction = { x: 1, y: 0 };
            break;
    }

    console.log({ direction: direction, m: moves })

    for (let i = 0; i < moves; i++) {
        //move the head
        head.x += direction.x;
        head.y += direction.y;

        //handle tail physics
        if (Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y <= 1)) {
            //nothing, the tail is near enough the head
        } else if (head.x == tail.x || head.y == tail.y) { //on the same row/column
            tail.x += direction.x;
            tail.y += direction.y;
        } else { //diagonal
            tail.x += clamp(head.x - tail.x, -1, 1);
            tail.y += clamp(head.y - tail.y, -1, 1);
            function clamp(a, min, max) {
                return Math.min(Math.max(a, min), max);
            }
        }

        /*
        .....    .....    .....
        .....    ..H..    ..H..
        ..H.. -> ..... -> ..T..
        .T...    .T...    .....
        .....    .....    .....
        
        3 4 - 2 2 = 1 2 => 1 1
        
        
        .....    .....    .....
        ..T..    ..T..    .....
        .H... -> ..... -> .T...
        .....    .H...    .H...
        .....    .....    .....
        
        2 2 - 3 4 = -1 -2 => -1 -1 
        
        */



        console.log({ head: head, tail: tail })

        if (!tailPositions.some(p => p.x == tail.x && p.y == tail.y))
            tailPositions.push({ x: tail.x, y: tail.y });
        // or I could add them anyway and then filter the distinct ones later
    }
}


// console.log(tailPositions);
console.log(tailPositions.length);


let arr = Array(6).fill(Array(6).fill("."))
console.log(arr);
console.log(tailPositions)
for(const pos of tailPositions){
    console.log(pos);
    arr[pos.x][pos.y] = "#";
}
console.log(arr);
