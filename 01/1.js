const fs = require('fs');
let input = fs.readFileSync('./1.in.txt').toString();

let elves = input.split("\n\n");

for (let i = 0; i < elves.length; i++) {
    elves[i] = elves[i].split('\n');
    elves[i] = elves[i].reduce((partial, current) => partial + Number(current), 0);
}

console.log(elves);
console.log(Math.max(...elves));