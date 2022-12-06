const fs = require('fs');
let input = fs.readFileSync('./tests/2.in.txt').toString().split("\n");
//yes, it could be joined into one .map()
//no, I cba to do that
input = input.map(x => x.split(" "));
// input = input.map(x => {
//     let a = [];
//     for (let i = 0; i < x.length; i++) {
//         a[i] = (x[i] === "A" || x[i] === "X") ? 0 : (x[i] === "B" || x[i] === "Y") ? 1 : 2
//     }
//     return a;
// });


/*

012
RPS

XYZ
012
LDW

*/

//fuck it, I'm tired and idc, need to work on other stuff too
//maybe I'll revisit this l8tr and make it with a bitshit/multiplication or somethin
//  it could work like you have a "object/enum" of what you'll play, like the in the 1st part.
//  then you'd take the value of opponents move, do something with the number and/or the bits to get the value from the enum
//  and then it's simple.


//this is just so the code is verbose and doesn't include too much magic numbers
let scores = {
    win: 6,
    draw: 3,
    lost: 0,
    rock: 1,
    paper: 2,
    scissors: 3
}
let score = 0;
for (const round of input) {
    switch (round[0]) {
        case "A": //played rock
            switch (round[1]) {
                case "X": //lose ->  S
                    score += scores.lost + scores.scissors
                    break;
                case "Y": //draw -> R
                    score += scores.draw + scores.rock;
                    break;
                case "Z": //win -> P
                    score += scores.win + scores.paper;
                    break;
            }
            break;
        case "B": //played paper
            switch (round[1]) {
                case "X": //lose -> R
                    score += scores.lost + scores.rock;
                    break;
                case "Y": //draw -> P
                    score += scores.draw + scores.paper;
                    break;
                case "Z": //win -> S
                    score += scores.win + scores.scissors;
                    break;
            }
            break;
        case "C": //played scissors
            switch (round[1]) {
                case "X": //lose ->  P
                    score += scores.lost + scores.paper;
                    break;
                case "Y": //draw ->  S
                    score += scores.draw + scores.scissors;
                    break;
                case "Z": //win ->  R
                    score += scores.win + scores.rock;
                    break;
            }
            break;
    }
}
//hmm, now I see that hte giant switch could be optimised, for example by extracting all the "draw" statements and un-commenting the code that changes letters to numbres at the top, to use them for the score calculation

console.log(score);
