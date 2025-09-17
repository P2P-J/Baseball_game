// let comNum = [];
let isGameRunning = false;
const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
//1.  컴퓨터가 뽑는 임의의 1~9 랜덤 숫자 함수입니다
function randomNum() {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let comNumbers = [];
    for (let i = 0; i < 3; i++) {
        let getPosition = Math.floor(Math.random() * numbers.length);
        let getNumber = numbers[getPosition];
        comNumbers.push(getNumber);
        numbers.splice(getPosition, 1);
    }
    console.log("\n컴퓨터가 숫자를 뽑았습니다." + comNumbers);
    return comNumbers;
}
//2.  유저 입력값 받는 함수
function userInput() {
    return new Promise((resolve) => {
        rl.question("3자리 숫자 입력 : ", (answer) => {
            if (answer.length !== 3) {
                console.log("숫자는 3자리 숫자로 입력해주세요.\n");
                resolve(userInput());
            } else {
                resolve(Number(answer));
            }
        });
    });
}
//3.  컴퓨터 랜덤숫자, 유저 숫자 비교 함수
function compareScore(randomNum, userInput) {
    const userNum = String(userInput).split("").map(Number);
    console.log(randomNum, userNum);
    let strike = 0;
    let ball = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (userNum[i] == randomNum[j] && i == j) {
                strike++;
            } else if (userNum[i] == randomNum[j]) {
                ball++;
            }
        }
    }
    let result = [strike, ball];
    return result; // 결과 문구 return
}

//4. 결과 문구 출력 함수든, 로직
function printResult(result) {
    const strike = result[0];
    const ball = result[1];
    
    if (strike == 0 && ball == 0) {
        return "Nothing";
    } else if (strike == 3) {
        const allStrike = "3 스트라이크 : 정답입니다!!";
        return allStrike;
    } else {
        const message = strike + " 스트라이크 " + ball + " 볼";
        return message;
    }
}

// 5. 게임 동작 함수
async function playGame() {
    let count = 0; // 시도 횟수
    const comRandomNum = randomNum();

    while (true) {
        count++;
        console.log(`--- ${count}번째 시도 ---`);

        const userInputNum = await userInput();
        const resultScore = compareScore(comRandomNum, userInputNum);

        if (printResult(resultScore) == "3스트라이크 : 정답입니다!!") {
            console.log(printResult(resultScore)+ "\n");
            break;
        } else {
            console.log(printResult(resultScore)+ "\n");
            continue;
        }
    }

    console.log("3개의 숫자를 모두 맞히셨습니다.");
    console.log("-------게임 종료-------\n");
}

// fin. 게임 시작 함수
function gameStart() {
    console.log("게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.");
    rl.question("", async (answer) => {
        if (Number(answer) == 1) {
            await playGame();
            gameStart();
        } else if (Number(answer) == 9) {
            console.log("\n어플리케이션이 종료되었습니다!!");
            rl.close();
        } else {
            gameStart();
        }
    });
}

gameStart();