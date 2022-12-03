const fs = require('fs');
let input = fs.readFileSync('./tests/3.in.txt').toString().split("\n");

let groups = [];
for (let i = 0; i < input.length; i += 3) {
    groups.push(input.slice(i, i + 3));
}
// console.log(groups)


let sum  = 0;
for (const group of groups) {
    let code = [...group[0]].filter(x => [...group[1]].includes(x) && [...group[2]].includes(x))[0].charCodeAt(0);
    let number = (code < 91) ? code - 64 + 26 : code - 96;
    // A = 65 = 26 + 1
    // a = 97 = 1
    // console.log(number);
    sum += number;
}
console.log(sum);