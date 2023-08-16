// const variables 



const gridContainer = document.getElementById('grid');
const blackNumbers = [15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26];
const redNumbers = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];
let playerCoins = 100;
let selectedNumber = null;
let bet;
let winningNum = null
let chosenNums = [];
// let chosenNums = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3, 15, 4, 2, 17, 6, 13, 11, 8, 10, 24, 33, 20, 31, 22, 29, 28, 35, 26];

// game board 
function initializeGameBoard() {
for (let row = 1; row <= 12; row++) {
  for (let col = 1; col <= 3; col++) {
    const num = (row - 1) * 3 + col;
    const cell = document.createElement('div');
    cell.className = 'grid-cell';
    cell.textContent = num;


    if (blackNumbers.includes(num)) {
      const blackNumber = document.createElement('div');
      blackNumber.className = 'black-number';
      cell.appendChild(blackNumber);
      const blackNumbertxt = document.createElement('span');
      blackNumbertxt.className = 'black-numbertxt';
      cell.appendChild(blackNumbertxt);
    }


    if (redNumbers.includes(num)) {
      const redNumber = document.createElement('div');
      redNumber.className = 'red-number';
      cell.appendChild(redNumber);
      const redNumbertxt = document.createElement('span');
      redNumbertxt.className = 'red-numbertxt';
      cell.appendChild(redNumbertxt);
    }
    gridContainer.appendChild(cell);
        }
    }
}
;
// event listeners 
gridContainer.addEventListener('click', function(event) {
    if (bet) {
    if(event.target.classList.contains('grid-cell')) {
        selectedNumber = Number(event.target.textContent)
        console.log('Selected Number:', selectedNumber)
        chosenNums.push(selectedNumber);
        console.log(chosenNums)
        // chosenNums.includes(selectedNumer)
        if (playerCoins >= bet) {
            console.log(`Betting ${bet} coin() on number ${selectedNumber}`)
            playerCoins += -bet;
            updatePlayerCoins();
        } else {
          alert("Insufficient coins!");
        } 
    }
}
})

document.getElementById('spinButton').addEventListener('click',spinWheel)


document.getElementById('bet1Coin').addEventListener('click', function() {
    if (bet) {
    if (playerCoins >= 1) {
        if (selectedNumber){
      playerCoins -= 1;
      updatePlayerCoins();
      console.log(`Betting 1 coin on number ${selectedNumber}`)
        } 
      
    } else {
      alert("Insufficient coins!");
    } 
    bet = null
} else {
    bet =1;
}
    
  });

  document.getElementById('bet5Coins').addEventListener('click', function() {
    console.log("5")
    if (bet) {
        if (playerCoins >= 5) {
            if (selectedNumber) {
          playerCoins -= 5;
          updatePlayerCoins();
          console.log(`Betting 5 coins on number ${selectedNumber}`)
        }
        } else {
          alert("Insufficient coins!");
        }
    bet = null;
    } else {
        bet = 5
    }
  });

  document.getElementById('bet10Coins').addEventListener('click', function() {
    console.log("10")
  if (bet) {        
      if (playerCoins >= 10) {
          if (selectedNumber){
        playerCoins -= 10;
        updatePlayerCoins();
          } 
      } else {
        alert("Insufficient coins!");
      }
      bet = null;
  } else {
      bet = 10;
  }
});

  // Function to initialize the player's coins
function initializePlayerCoins() {
    playerCoins = 100;
    updatePlayerCoins();
  }
  
  // Initial setup
  initializePlayerCoins();


  // <--------- functions ---------> 
    
  
  function updatePlayerCoins() {
      const playerCoinsContainer = document.getElementById('playerCoinsContainer')
      playerCoinsContainer.textContent = `Player's Coins: ${playerCoins}`
  }

    function calculatePayout(betAmount) {
        let payoutAmount = betAmount * 35;
        playerCoins += payoutAmount;
        updatePlayerCoins();
        console.log(`Congratulations! You won ${payoutAmount} coins!`);
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
    
    function spinWheel() {
        winningNum = Math.floor(Math.random() * 35) + 1
            console.log('Spinning Wheel... Winning Number:', winningNum)
            checkWinner()
            if(chosenNums.includes(winningNum)) {
                updatePlayerCoins()
                let payoutAmount = bet * 35;
                playerCoins += payoutAmount;
                console.log(`You won ${payoutAmount} coins!`)
                chosenNums = []
    }
}

    function initializeGame() {
        initializeGameBoard();
        initializePlayerCoins();
  }

initializeGame()