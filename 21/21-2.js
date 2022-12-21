const fs = require('fs');
let monkeys = fs.readFileSync('in.test.txt').toString().split("\n").map(l => {
    l = l.split(" ");
    let monkey = {};
    monkey.name = l[0].substring(0, l[0].length - 1);
    if (isNaN(l[1])) {  // is a computing monkey        
        monkey.m1 = l[1];
        // monkey.operation = l[2];
        switch (l[2]) { //micro optimalization, likely useless, but I gotta try
            case "+":
                monkey.operation = 0;
                break;
            case "-":
                monkey.operation = 1;
                break;
            case "*":
                monkey.operation = 2;
                break;
            case "/":
                monkey.operation = 3;
                break;
        }
        monkey.m2 = l[3];

        if (monkey.name == "root")
            monkey.operation = " === "
    } else { //is a constant monkey
        monkey.number = Number(l[1])
    }
    return monkey;
});

// console.log(monkeys);
//process.argv
let humn = 0;
while (true) {
    if (humn % 200 == 0) console.log(humn)
    monkeys.find(x => x.name == "humn").number = humn;
    if (getMonkeyValue("root") === true) {
        console.log("humn number is: " + humn);
        break;
    } else {
        humn++;
    }
}



// console.log("Value of drzm is " + getMonkeyValue("drzm"));
// console.log("Value of sjmn is " + getMonkeyValue("sjmn"));
// console.log("Value of lfqf is " + getMonkeyValue("lfqf"));
// console.log("Value of root is " + getMonkeyValue("root"));


function getMonkeyValue(monkeyName) {
    let monkey = monkeys.find(m => m.name == monkeyName)

    if (typeof monkey.number !== "undefined") {
        return monkey.number;
    }

    let m1 = getMonkeyValue(monkey.m1);
    let m2 = getMonkeyValue(monkey.m2);

    if (monkey.name == "root") {
        return m1 === m2;
    }

    switch (monkey.operation) {
        case 0:
            return m1 + m2; //idk, the conversion maybe isn't neccessary, but I ain't trust js
            break;
        case 1:
            return m1 - m2;
            break;
        case 2:
            return m1 * m2;
            break;
        case 3:
            return m1 / m2;
            break;
    }

    // return Number(eval(m1 + "" + monkey.operation + "" + m2));
}
