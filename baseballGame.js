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
  console.log("컴퓨터가 숫자를 뽑았습니다.");
  return comNumbers;
}

function userinput() {
    
}

// function 판정() {
//     let strike = 0;
//     let ball = 0;

//     for  0 ,1 , 2
//     if(유저 인덱스값 [0]이랑 컴퓨터 뽑은 인덱스값[0]이랑 일치한다면)     컴 123 , 유 253
//      strike++;

//     for
//     ball++;

// }

function gameStart() {
  console.log(
    "게임을 시작하시겠습니까? : 1번을 눌러주세요 || 게임을 종료하시겠습니까? : 9번을 눌러주세요"
  );
  rl.question("", (answer) => {
    if (Number(answer) == 1) {
      randomNum();
      userinput();
      판정();
    } else if (Number(answer) == 9) {
      console.log("어플리케이션이 종료되었습니다!!");
      rl.close();
    } else {
      gameStart();
    }
  });
}
gameStart();


test push