var fs = require("fs");
let input = fs.readFileSync("in.txt").toString().split("\n");

let crt = "";

let cycle = 0;
let regX = 1;
for (let instruction of input) {
    instruction = instruction.split(" ");
    if (instruction[0] == "noop") {
        drawCRT();
        cycle++;
    }
    else if (instruction[0] == "addx") {
        drawCRT();
        cycle++;

        drawCRT();
        regX += Number(instruction[1]);
        cycle++;
    }

    function drawCRT() {
        // 0 - 39    
        let crtPos = cycle % 40;
        if (crtPos == 0) crt += "\n";
        
        if (crtPos >= regX -1 && crtPos <= regX+1){
            crt += "#";
        } else {
            crt += ".";
        }
    }
}
console.log(crt);