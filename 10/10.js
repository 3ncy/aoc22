var fs = require("fs");
let input = fs.readFileSync("in.txt").toString().split("\n");

let cycle = 0;
let regX = 1;
let interestingSignalStrengthsSum = 0;
for (let instruction of input) {
    instruction = instruction.split(" ");
    if (instruction[0] == "noop") {
        cycle++;
        checkForInterestingSignal();
    }
    else if (instruction[0] == "addx") {
        cycle++;
        checkForInterestingSignal();
        cycle++;
        checkForInterestingSignal();
        regX += Number(instruction[1]);
    }
}

console.log({ cycle: cycle, regX: regX, signalSum: interestingSignalStrengthsSum });

function checkForInterestingSignal(){
    if ((cycle - 20) % 40 == 0) {
        interestingSignalStrengthsSum += regX * cycle;
        // console.log({ c: cycle, regX: regX, inst: instruction, strenth: regX * cycle});
    }
}


//ngl I'm kinda disgusted by what I wrote, but oh well ¯\_(ツ)_/¯