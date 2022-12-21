const fs = require("fs");
let file = fs.readFileSync("in.txt").toString().split("\n").map((x, i) => { return { id: i, value: Number(x) } });

let originalLength = file.length;

for (let i = 0; i < originalLength; i++) {
    let index = file.findIndex(x => x.id == i);
    let element = file.splice(index, 1)[0];

    // console.log({ pos: index + element.value, val: element.value })

    let position = index + element.value;
    if (index + element.value < 0) {
        position = position % originalLength + originalLength - 1;
    } else if (index + element.value >= originalLength) {
        position = position % originalLength + 1;
    }
    if (position == 0) position = originalLength - 1;

    file.splice(position, 0, element);

    // console.log(file);

}

let zeroPos = file.findIndex(x => x.value == 0)

// 1000 2000 3000

console.log(file[(zeroPos + 1000) % originalLength].value)
console.log(file[(zeroPos + 2000) % originalLength].value)
console.log(file[(zeroPos + 3000) % originalLength].value)

console.log(file[(zeroPos + 1000) % originalLength].value + file[(zeroPos + 2000) % originalLength].value + file[(zeroPos + 3000) % originalLength].value)

