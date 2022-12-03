const fs = require('fs');
let input = fs.readFileSync('./tests/3.in.txt').toString().split("\n").map(x => {
    let a = [];
    a[0] = x.slice(0, x.length / 2);
    a[1] = x.slice(x.length / 2);
    return a;
});


let sum = 0;
for (const rucksack of input) {
    let code = [...rucksack[0]].filter(x => [...rucksack[1]].includes(x))[0].charCodeAt(0)
    let number = (code < 91) ? code - 64 + 26 : code - 96;
    // A = 65 = 26 + 1
    // a = 97 = 1
    // console.log(number);
    sum += number;
}
console.log(sum)
