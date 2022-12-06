const fs = require('fs');
let input = fs.readFileSync('./tests/5.in.txt').toString().split("\n");
let instructions = input.splice(input.indexOf('') + 1);
input.pop();//remove the spliting lines between the cargo and instructions 
input.pop();
let stacks = [];


for (let i = 0; i < Math.ceil(input[0].length / 4); i++) { //the division might be broken for some inputs, idk
    stacks[i] = [];
}

// console.log(input);
// console.log(instructions);
// console.log(stacks);

/*
  x →
y ••••[D]•••• 
↓ [N]•[C]••••
  [Z]•[M]•[P]

*/

//these loops actually read the input from top to bottom
for (let x = 1; x < input[0].length; x += 4) {
    for (let y = 0; y < input.length; y++) {
        if (input[y][x] == " ") continue;
        stacks[Math.floor(x / 4)].push(input[y][x]);
    }
}

console.log({ stacks: stacks })


// move 1 from 1 to 2

for (let instruction of instructions) {
    instruction = instruction.split(' '); //1, 3, 5
    for (let i = 0; i < instruction[1]; i++) {
        stacks[instruction[5] - 1].unshift(stacks[instruction[3] - 1].shift());
    }
}

console.log({ stacks: stacks })

let output = "";
for (const stack of stacks) {
    output += stack[0] == undefined ? "" : stack[0];
}
console.log(output);
