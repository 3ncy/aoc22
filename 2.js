const fs = require('fs');
let input = fs.readFileSync('2.in.txt').toString().split("\n");


/*
A - R
B - P
C - S

X - R
Y - P
Z - S

(AX) -> (CZ) -> (BY) -> (AX)
  R  ->   S  ->  P   ->  R


mozna by to slo resit bres bitove vlajky???


    000
    111

    body
    001 R 1
    010 P 2
    011 S 3

    ×  R P S
     /-------
    R| × L W
    P| W × L
    S| L W ×


    00000000
    10101010

    00010000


    00000100 - 00000010 - 00001100 << 1
    00001000 - 00000100 - 00011000

    00000100 - 00000010 - 00001100 << 2
    00010000 - 00001000 - 00110000

    00000100 - 00000010 - 00001100 << 3
    00100000 - 00010000 - 01100000


    me
    oponent

    oponentMoves = {
        rock: 0b00000100,
        paper: 0b00000010,
        scissors: 0b00001100
    }
    meMoves = {
        rock: 1,
        paper: 2,
        scissors: 3
    }

    vysledek = oponent.operace << me.operace

    if  1 <= (vysledek / 16) < 2
        win
        score += me.operace + 6
    else if vysledek === 0b00001000 or 01100000
        draw
        score += me.operace + 3
    else
        lost
        score += me.operace
*/

//yes, it could be joined into one .map()
//no, I cba to do that
input = input.map(x => x.split(" "));
input = input.map(x => {
    let a = [];
    for (let i = 0; i < x.length; i++) {
        a[i] = (x[i] === "A" || x[i] === "X") ? 0 : (x[i] === "B" || x[i] === "Y") ? 1 : 2
        // if (x[i] === 'A' ||  x[i] === 'X')
        //     a[i] = 0;
        // else if (x[i] === 'B' || x[i] === 'Y')
        //     a[i] = 1;
        // else
        //     a[i] = 2;
    }
    return a;
});

let score = 0;
const oponentMoves = {
    0: 0b00000100, //rock
    1: 0b00000010, //paper
    2: 0b00001100 //scissors
}
const myMoves = {
    0: 1, //rock
    1: 2, //paper
    2: 3 //scissors
}

for (const round of input) {
    let oponent = oponentMoves[round[0]];
    let me = myMoves[round[1]];
    let vysledek = oponent << me;

    if (1 <= (vysledek / 16) && (vysledek / 16) < 2) {
        // win
        score += me + 6;
    }
    else if (vysledek === 0b00001000 || vysledek == 0b01100000) {
        //draw
        score += me + 3;
    }
    else {
        //lost
        score += me;
    }
}


console.log(score)