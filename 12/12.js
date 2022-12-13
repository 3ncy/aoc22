const fs = require('fs');
let input = fs.readFileSync('./2.in.txt').toString().split("\n");

/*
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi

v..v<<<<
>v.vv<<^
.>vv>E^^
..v>>>^^
..>>>>>^
*/

let pos = { y: 0, x: 0 };