const fs = require('fs');
let monkeys = fs.readFileSync('in.txt').toString().split("\n").map(l => {
    l = l.split(" ");
    let monkey = {};
    monkey.name = l[0].substring(0, l[0].length - 1);
    if (isNaN(l[1])) {  // is a computing monkey
        //cczh: sllz + lgvd
        monkey.m1 = l[1];
        monkey.operation = l[2];
        monkey.m2 = l[3];
    } else { //is a constant monkey
        monkey.number = Number(l[1])
    }
    return monkey;
});

// console.log(monkeys);

// console.log("Value of drzm is " + getMonkeyValue("drzm"));
// console.log("Value of sjmn is " + getMonkeyValue("sjmn"));
// console.log("Value of lfqf is " + getMonkeyValue("lfqf"));
console.log("Value of root is " + getMonkeyValue("root"));


function getMonkeyValue(monkeyName) {
    let monkey = monkeys.find(m => m.name == monkeyName)
    
    if (typeof monkey.number !== "undefined") {
        return monkey.number;
    }

    let m1 = getMonkeyValue(monkey.m1);
    let m2 = getMonkeyValue(monkey.m2);

    return Number(eval(m1 + "" + monkey.operation + "" + m2));
}
