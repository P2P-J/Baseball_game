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
function userinput() {
  return new Promise((resolve) => {
    rl.question("3자리 숫자 입력 : ", (answer) => {
      if (answer.length !== 3) {
        console.log("숫자는 3자리 숫자로 입력해주세요.");
        resolve(userinput());
      } else {
        resolve(Number(answer));
      }
    });
  });
}
//3.  컴퓨터 랜덤숫자, 유저 숫자 비교 함수
function compareScore(randomNum, userinput) {
  const userNum = String(userinput).split("").map(Number);
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
  return result;
}
// 게임 시작 함수
function gameStart() {
  console.log("게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.");
  rl.question("", async (answer) => {
    if (Number(answer) == 1) {
      const comRandomNum = randomNum();
      const userInputNum = await userinput();
      console.log(compareScore(comRandomNum, userInputNum));
    } else if (Number(answer) == 9) {
      console.log("어플리케이션이 종료되었습니다!!");
      rl.close();
    } else {
      gameStart();
    }
  });
}
gameStart();
