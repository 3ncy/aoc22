const fs = require('fs');
let input = fs.readFileSync('./tests/4.in.txt').toString().split("\n").map(x =>
    x.split(',').map(x => x.split('-'))
);


let count = 0;
for (const pair of input) {
    if (isInRange(pair[0][0], pair[1][0], pair[1][1]) || isInRange(pair[0][1], pair[1][0], pair[1][1]) ||
        isInRange(pair[1][0], pair[0][0], pair[0][1]) || isInRange(pair[1][1], pair[0][0], pair[0][1])) {

        count++;
    }
}

console.log(count);

function isInRange(x, a, b) {
    return ((x - a) * (x - b) <= 0);
}
