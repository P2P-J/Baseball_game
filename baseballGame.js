// let comNum = [];
let isGameRunning = false;
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// 컴퓨터가 뽑는 임의의 1~9 랜덤 숫자 함수입니다
function randomNum() {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let comNumbers = [];

    for (let i = 0; i < 3; i++) {
        let getPosition = Math.floor(Math.random() * numbers.length);
        let getNumber = numbers[getPosition];

        comNumbers.push(getNumber);
        numbers.splice(getPosition, 1);
    }
    console.log("\n컴퓨터가 숫자를 뽑았습니다.");
    return comNumbers;
}

// 게임 시작 함수
function gameStart() {
    console.log("게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.");
    rl.question("", (answer) => {
        if (Number(answer) == 1) {
            randomNum();
            compareScore(randomNum(), userinput()); //compareScore : 판정함수

        } else if (Number(answer) == 9) {
            console.log("어플리케이션이 종료되었습니다!!");
            rl.close();
        } else {
            gameStart();
        }
    });
}

// 유저 입력값 받는 함수
function userinput() {
    rl.question("3자리 숫자 입력 : ", (answer) => {
        if (answer.length !== 3) {
            console.log("숫자는 3자리 숫자로 입력해주세요.");
            userinput();
        } else {
            return Number(answer);
        }
    });
}

// 컴퓨터 랜덤숫자, 유저 숫자 비교 함수
function compareScore(randomNum, userinput) {

}

// function 판정(randomNum, userinput) {
//     let strike = 0;
//     let ball = 0;

//     for  0 ,1 , 2
//     if(유저 인덱스값 [0]이랑 컴퓨터 뽑은 인덱스값[0]이랑 일치한다면)     컴 123 , 유 253
//      strike++;

//     for
//     ball++;

// }


gameStart();