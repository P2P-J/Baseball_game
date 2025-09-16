let comNUm = [];
let isGameRunning = false;

// 컴퓨터가 뽑는 임의의 1~9 랜덤 숫자
function randomNum() {
    let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let comNumbers = [];

    for (let i=0; i<3; i++) {
        let getPosition = Math.floor(Math.random() * numbers.length);
        let getNumber = numbers[getPosition];

        comNumbers.push(getNumber);
        numbers.splice(getPosition, 1);
    }
    console.log("컴퓨터가 숫자를 뽑았습니다." );
    return comNumbers;
}
