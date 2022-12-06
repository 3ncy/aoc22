const fs = require('fs');
let input = fs.readFileSync('./in.txt').toString();


let code = [];
for (let i = 0; i < input.length; i++) {
    let char = input[i];
    if (code.includes(char)) {
        // console.log("includes " + char + " at " + code.indexOf(char));
        code.splice(0, code.indexOf(char) + 1);
    }
    code.push(char);
    // console.log(code);
    if(code.length === 14){
        console.log(i+1);
        return;
    }
}