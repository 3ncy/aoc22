var fs = require("fs");
let input = fs.readFileSync("in.txt").toString().split("\n");

let cycle = 0;
let regX = 1;
let interestingSignalStrengthsSum = 0;
for (let instruction of input) {
    // if (cycle == 219 || cycle == 218) {
    //     console.log();
    // }
    instruction = instruction.split(" ");
    if (instruction[0] == "noop") {
        cycle++;
        if ((cycle - 20) % 40 == 0) {
            interestingSignalStrengthsSum += regX * cycle;
            // console.log({ c: cycle, regX: regX, inst: instruction, strenth: regX * cycle});
        }
    }
    else if (instruction[0] == "addx") {
        cycle++;
        if ((cycle - 20) % 40 == 0) {
            interestingSignalStrengthsSum += regX * cycle;
            // console.log({ c: cycle, regX: regX, inst: instruction, strenth: regX * cycle});
        }
        cycle++;
        if ((cycle - 20) % 40 == 0) {
            interestingSignalStrengthsSum += regX * cycle;
            // console.log({ c: cycle, regX: regX, inst: instruction, strenth: regX * cycle});
        }
        regX += Number(instruction[1]); //i should prolly split it at the start of the loop,
    }
}


console.log({ cycle: cycle, regX: regX, signalSum: interestingSignalStrengthsSum });

//ngl I'm kinda disgusted by what I wrote, but oh well ¯\_(ツ)_/¯