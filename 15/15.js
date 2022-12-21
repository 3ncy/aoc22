const fs = require('fs');
let pairs = fs.readFileSync('./in.test.txt').toString().split("\n")
    .map(x => {
        let a = x.split("=");
        return { sensor: [parseInt(a[1]), parseInt(a[2])], beacon: [parseInt(a[3]), parseInt(a[4])] }
    });

console.log(pairs);

let map = [];

//fill in the map
for (let pair of pairs) {

}