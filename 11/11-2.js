var fs = require("fs");
let input = fs.readFileSync("in.test.txt").toString().split("\n");

// loading monkeys
let monkeys = [];
for (let i = 1; i < input.length; i += 7) {
    let monkey = {
        items: input[i].split(':')[1].split(", ").map(Number),
        equation: input[i + 1].split('=')[1],
        divisibleBy: Number(input[i + 2].split(' ').at(-1)),
        ifTrue: Number(input[i + 3].split(' ').at(-1)),
        ifFalse: Number(input[i + 4].split(' ').at(-1)),
        inspectedTimes: 0
    }
    monkeys.push(monkey);
}

// console.log(monkeys);

for (let round = 1; round <= 10000; round++) {
    for (let monkey of monkeys) {
        let originalItemsCount = monkey.items.length;
        for (let i = 0; i < originalItemsCount; i++) { //run through all the monkey's items
            let old = monkey.items.shift();

            old = eval(monkey.equation);
            // old = Math.floor(old / 3);
            if (old % monkey.divisibleBy === 0) {
                monkeys[monkey.ifTrue].items.push(old);
            } else {
                monkeys[monkey.ifFalse].items.push(old);
            }

            monkey.inspectedTimes++;
        }
    }
    if (round === 1 || round === 20 || round % 1000 === 0)
        console.log(monkeys.map(m => m.inspectedTimes).join(", "));

}

console.log(monkeys.map(m => m.inspectedTimes).join(", "));
// console.log(monkeys)


monkeys.sort((a, b) => a.inspectedTimes - b.inspectedTimes)
console.log(monkeys.at(-2).inspectedTimes * monkeys.at(-1).inspectedTimes);
