// Variables
const blackNumbers = [
  15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26,
];
const redNumbers = [
  32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3,
];
const redLabel = document.getElementById("redLabel");
const blackLabel = document.getElementById("blackLabel");
const gridContainer = document.getElementById("grid");
const clearButton = document.getElementById("clearButton");
let redBetAmount = 0;
let blackBetAmount = 0;
let playerCoins = 100;
let selectedNumber = null;
let bet = 0;
let winningNum = 0;
let chosenNums = [];
let numberBets = {}


// Event listeners

document.getElementById("spinButton").addEventListener("click", spinWheel);
document.getElementById("bet1Coin").addEventListener("click", () => setBet(1));
console.log("bet1Coin clicked");
document.getElementById("bet5Coins").addEventListener("click", () => setBet(5));
document
  .getElementById("bet10Coins")
  .addEventListener("click", () => setBet(10));
redLabel.addEventListener("click", () => {
  redLabel.classList.add("selected");
  blackLabel.classList.remove("selected");
});
blackLabel.addEventListener("click", () => {
  blackLabel.classList.add("selected");
  redLabel.classList.remove("selected");
});
redLabel.addEventListener("click", handleGridClick);
blackLabel.addEventListener("click", handleGridClick);
gridContainer.addEventListener("click", handleGridClick);
clearButton.addEventListener("click", () => {
  clearBet();
});

// Initialization
initializePlayerCoins();
initializeGameBoard();

// Functions
function handleGridClick(event) {
  if ((bet && event.target.classList.contains("grid-cell")) || (bet && event.target.classList.contains("selected"))) {
    selectedNumber = Number(event.target.childNodes[0].data);
    chosenNums.push(selectedNumber);
    if (playerCoins >= bet) {
      playerCoins -= bet;
      updatePlayerCoins();
      createChip(event.target, bet);

      if (!numberBets[selectedNumber]) {
        numberBets[selectedNumber] = 0;
      }
      numberBets[selectedNumber] += bet;
    
      if (redLabel.classList.contains("selected")) {
        redBetAmount += bet;
      } else if (blackLabel.classList.contains("selected")) {
        blackBetAmount += bet;
      }
    } else {
      alert("Insufficient coins!");
    }
  }
}

function spinWheel() {
  winningNum = Math.floor(Math.random() * 1) + 1;
  console.log(winningNum);
  document.getElementById("winMessage").textContent = ""
  document.getElementById("houseWinMessage").textContent = ""

  if (numberBets[winningNum]) {
    playerCoins += numberBets[winningNum] * 35;
    numberBets[winningNum] = 0;
  }

  if (redNumbers.includes(winningNum) && redBetAmount > 0) {
    playerCoins += redBetAmount * 2;
  } else if (blackNumbers.includes(winningNum) && blackBetAmount > 0)
    playerCoins += blackBetAmount * 2;
  redLabel.classList.remove("selected");
  blackLabel.classList.remove("selected");
  if (chosenNums.includes(winningNum)) {
    updatePlayerCoins();
    document.getElementById("winMessage").textContent = `You won ${bet * 35} coins!`;
    chosenNums = [];
    bet = 0;
  } else { document.getElementById("houseWinMessage").textContent ="The house wins!"
}
  updatePlayerCoins();
}

function initializeGameBoard() {
  for (let row = 1; row <= 12; row++) {
    for (let col = 1; col <= 3; col++) {
      const num = (row - 1) * 3 + col;
      const cell = document.createElement("div");
      cell.className = "grid-cell";
      cell.textContent = num;

      if (blackNumbers.includes(num)) {
        const blackNumber = document.createElement("div");
        blackNumber.className = "black-number";
        cell.appendChild(blackNumber);
        const blackNumbertxt = document.createElement("span");
        blackNumbertxt.className = "black-numbertxt";
        cell.appendChild(blackNumbertxt);
      }

      if (redNumbers.includes(num)) {
        const redNumber = document.createElement("div");
        redNumber.className = "red-number";
        cell.appendChild(redNumber);
        const redNumbertxt = document.createElement("span");
        redNumbertxt.className = "red-numbertxt";
        cell.appendChild(redNumbertxt);
      }

      gridContainer.appendChild(cell);
    }
  }
}

function initializePlayerCoins() {
  playerCoins = 100;
  updatePlayerCoins();
}

function updatePlayerCoins() {
  const playerCoinsContainer = document.getElementById("playerCoinsContainer");
  playerCoinsContainer.textContent = `Player's Coins: ${playerCoins}`;
}

function setBet(amount) {
  bet = amount;
}

function createChip(target, amount) {
  const chip = document.createElement("div");
  chip.className = "chip";
  chip.textContent = amount;
  target.appendChild(chip);
}

function checkWinner() {
  if (selectedNumber) {
    if (chosenNums.includes(winningNum)) {
      calculatePayout(bet);
    } else {
      console.log("The house wins!");
    }
  } else {
    console.log("Select a number before spinning the wheel.");
  }
}

function clearBet() {

  console.log(numberBets);

  for (let number in numberBets) {
    playerCoins += numberBets[number];
    numberBets[number] = 0;
  }

  console.log(playerCoins);
  
  playerCoins += redBetAmount
  redBetAmount = 0;
  console.log(playerCoins);
  
  playerCoins += blackBetAmount
  blackBetAmount = 0;
  console.log(playerCoins);

  numberBets = {};
  chosenNums = [];

  const chips = document.querySelectorAll(".chip");
  chips.forEach((chip) => chip.remove());

  updatePlayerCoins()
}



