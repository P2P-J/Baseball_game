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

let gameId = 0; // 전체 게임 돌아가는 횟수 시작부터 끝까지
let count = 0; // 시도 횟수
let gameRecord = [];
let gameHistory = [];

// 5. 게임 동작 함수
async function playGame() {
  gameId++;
  console.log(gameId + " 번째 게임 ");
  const comRandomNum = randomNum();

  const gameStart = new Date();
  const gameStartTime =
    gameStart.getFullYear() +
    "." +
    (gameStart.getMonth() + 1) +
    "." +
    gameStart.getDate() +
    " " +
    gameStart.getHours() +
    "시 " +
    gameStart.getMinutes() +
    "분 " +
    gameStart.getSeconds() +
    "초";

  while (true) {
    count++;
    console.log(`--- ${count}번째 시도 ---`);

    const userInputNum = await userInput();
    const resultScore = compareScore(comRandomNum, userInputNum);

    gameHistory.push("3자리 숫자 입력 : " + userInputNum);
    gameHistory.push(printResult(resultScore));

    if (printResult(resultScore) == "3 스트라이크 : 정답입니다!!") {
      console.log(printResult(resultScore) + "\n");
      break;
    } else {
      console.log(printResult(resultScore) + "\n");
      continue;
    }
  }

  const gameEnd = new Date();
  const gameEndTime =
    gameEnd.getFullYear() +
    "." +
    (gameEnd.getMonth() + 1) +
    "." +
    gameEnd.getDate() +
    " " +
    gameEnd.getHours() +
    "시 " +
    gameEnd.getMinutes() +
    "분 " +
    gameEnd.getSeconds() +
    "초";

  gameRecord.push({
    gameNumber: gameId,
    startTime: gameStartTime,
    endTime: gameEndTime,
    counts: count,
    history: gameHistory,
  });

  console.log("3개의 숫자를 모두 맞히셨습니다.");
  console.log("-------게임 종료-------\n");
  count = 0;
  gameHistory = [];
}

//6. 기록 보는 함수
function printRecord() {
  if (gameRecord.length == 0) {
    console.log("저장된 게임 기록이 없습니다!");
  } else {
    console.log("게임 기록");
    for (let i = 0; i < gameRecord.length; i++) {
      console.log(
        `[${gameRecord[i].gameNumber}] / 시작시간 : ${gameRecord[i].startTime} / 종료시간 : ${gameRecord[i].endTime} /  횟수 : ${gameRecord[i].counts}`
      );
    }
  }

  console.log("확인할 게임 번호를 입력하세요 (종료하려면 0을 입력): ");
  rl.on("line", (answer) => {
    if (Number(answer) == 0) {
      console.log("기록보기를 종료합니다!");
      rl.removeAllListeners("line");
      gameStart();
    }
    for (let i = 0; i < gameRecord.length; i++) {
      if (gameRecord[i].gameNumber == Number(answer)) {
        console.log(`${answer}번 게임 결과`);
        for (let j = 0; j < gameRecord[i].history.length; j++) {
          console.log(gameRecord[i].history[j]);
        }
        console.log("3개의 숫자를 모두 맞히셨습니다.");
        console.log("-------게임 종료-------\n");

        console.log("\n확인할 게임 번호를 입력하세요 (종료하려면 0을 입력): ");
      }
    }
  });
}

// fin. 게임 시작 함수
function gameStart() {
  console.log(
    "게임을 새로 시작하려면 1, 기록을 보려면 2, 종료하려면 9를 입력하세요."
  );
  rl.question("", async (answer) => {
    if (Number(answer) == 1) {
      await playGame();
      gameStart();
    } else if (Number(answer) == 9) {
      console.log("\n어플리케이션이 종료되었습니다!!");
      gameId = 0;
      rl.close();
    } else if (Number(answer) == 2) {
      printRecord();
    } else {
      gameStart();
    }
  });
}

gameStart();

// 정철님 새로 알게된 점.
// 콜백 함수가 while 안에 들어갈시 break가 안먹음.
// async await, Promiss에 대해 자세히 알게 됨.  = 동기, 비동기 함수에 대해서도 잘 알게됨.
// push로 객체 넣는 것을 처음 알게 됨.
// readline을 사용할 경우 rl.question은 한번 입력 받고 끝나기 때문에 
// 함수 내부에서 자동으로 입력이 종료됐을때 리스너도 같이 해제를 시킴
// 하지만 rl.on의 경우 입력을 여러번 받는 대신 개발자가 입력받기를 종료했을 시 리스너를 해제시켜줘야함
// 입력이 종료되는 시점에 rl.removeAllListeners("line"); 코드를 추가하여 리스너 등록을 해제해줘야
// rl.on의 입력값에 따른 출력값이 중복으로 출력되는 것을 방지할 수 있음

// 보근님 새로 알게된 점.
// 콜백 함수가 while 안에 들어갈시 break가 안먹음.
// async await, Promiss에 대해 자세히 알게 됨.  = 동기, 비동기 함수에 대해서도 잘 알게됨.
// map함수에 대해서 좀 더 자세히 알게 됨.