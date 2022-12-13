const fs = require('fs');
let input = fs.readFileSync('./in.txt')
    .toString()
    .split("\n").filter(x => x.length > 0).map(x => eval(x));


//add the divider packets
input.push([[6]]);
input.push([[2]]);


input.sort(checkPackets)
// console.log(input);
console.log((indexOf(input, [[2]]) + 1) * (indexOf(input, [[6]]) + 1));

function indexOf(array, item) {
    for (let i = 0; i < array.length; i++) {
        if (JSON.stringify(array[i]) == JSON.stringify(item)) return i; //I'm sorry for what have I done (actually not really, lol)
    }
    return -1;
}


function checkPackets(leftPacket, rightPacket) {
    let i = 0
    for (; i < leftPacket.length; i++) {
        let left = leftPacket[i]
        let right = rightPacket[i]


        if (right === undefined) {
            return 1;
        }

        if (typeof left === "number" && typeof right === "number") {
            if (left < right) {
                return -1;
            }
            else if (left > right) {
                return 1
            }
            else {
                continue;
            }
        } else if (typeof left === "object" && typeof right === "object") {
            let statusOfNestedArray = checkPackets(left, right);
            if (statusOfNestedArray == null) {
                continue;
            } else {
                return statusOfNestedArray;
            }
        } else {
            if (typeof left === "number") {
                let statusOfNestedArray = checkPackets([left], right);
                if (statusOfNestedArray == null) {
                    continue;
                } else {
                    return statusOfNestedArray;
                }
            } else {
                let statusOfNestedArray = checkPackets(left, [right]);
                if (statusOfNestedArray == null) {
                    continue;
                } else {
                    return statusOfNestedArray;
                }
            }
        }
    }

    if (rightPacket.length > i) {
        return -1;
    } else {
        return null; //this list didn't determine the correct order of the packets
    }

}
