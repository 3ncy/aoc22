const fs = require('fs');
let monkeys = fs.readFileSync('in.txt').toString().split("\n").map(l => {
    l = l.split(" ");
    let monkey = {};
    monkey.name = l[0].substring(0, l[0].length - 1);
    if (isNaN(l[1])) {  // is a computing monkey        
        monkey.m1 = l[1];
        monkey.operation = l[2];
        monkey.m2 = l[3];

        if (monkey.name == "root")
            monkey.operation = " === "

    } else { //is a constant monkey
        monkey.number = Number(l[1])
    }
    monkey.hasHumn = false;
    return monkey;
});

let equalsVal = getMonkeyValue("root");

console.log(equalsVal);
calculateFor("root", equalsVal)


function calculateFor(monkeyName, value) {
    let monkey = monkeys.find(m => m.name == monkeyName)

    console.log("calculating for " + monkeyName + " with the value " + value + " and op " + monkey.operation);

    let m1 = monkeys.find(m => m.name == monkey.m1);
    let m2 = monkeys.find(m => m.name == monkey.m2);

    if (monkeyName === "root") {
        //for this maybe I could use something like PHP does "|| die()"
        if (m1.hasHumn)
            calculateFor(monkey.m1, value);
        else
            calculateFor(monkey.m2, value);
        return;
    }

    if (monkeyName === "humn") {
        console.log("humn's value is " + value);
        return;
    }

    switch (monkey.operation) {
        case "+":
            if (m1.hasHumn)
                calculateFor(m1.name, value - m2.number)
            else
                calculateFor(m2.name, value - m1.number);
            break;
        case "-": // val = m1 - m2 => 15 = 20 - 5
            if (m1.hasHumn)
                calculateFor(m1.name, value + m2.number); // 20 = 15 + 5 => m1 = val + m2
            else
                calculateFor(m2.name, m1.number - value); // 5 = 20 - 15 => m2 = m1 - val 
            break;
        case "/": // val = m1 / m2  =>  3 = 15 / 5
            if (m1.hasHumn)
                calculateFor(m1.name, value * m2.number); // 15 = 3 * 5    =>   m1 = val * m2
            else
                calculateFor(m2.name, m1.number / value); // 5 = 15 / 3    =>   m2 = m1 / val
            break;
        case "*":
            if (m1.hasHumn)
                calculateFor(m1.name, value / m2.number);
            else
                calculateFor(m2.name, value / m1.number);
            break;
    }

}

function getMonkeyValue(monkeyName) {
    let monkey = monkeys.find(m => m.name == monkeyName)

    if (monkey.name === "humn") {
        monkey.hasHumn = true;
        return null;
    }

    if (typeof monkey.number !== "undefined") {
        return monkey.number;
    }

    let m1 = getMonkeyValue(monkey.m1);
    let m2 = getMonkeyValue(monkey.m2);

    if (monkey.name == "root") {
        //return the valid branch's value
        console.log({ m1: m1, m2: m2 })
        if (m1 === null) {
            return m2;
        } else {
            return m1;
        }
    }

    //if this branch includes the humn, return
    if (m1 === null || m2 === null) {
        monkey.hasHumn = true;
        return null;
    }

    let result = Number(eval(m1 + "" + monkey.operation + "" + m2))
    monkey.number = result;
    return result;
}
