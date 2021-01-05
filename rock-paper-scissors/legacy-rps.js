const options = ['rock', 'paper', 'scissors'];

let playerScore = 0;
let computerScore = 0;

function computerPlay() {
  selection = options[Math.floor(Math.random() * 3)];
  return selection;
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    console.log(`Both players picked ${playerSelection}!`);
    console.log("It's a draw! On to the next round!");
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    playerScore++;
    console.log(`You played ${playerSelection} and Computer played ${computerSelection}!`);
    console.log('You win! Congratulations! On to the next round!');
  } else {
    computerScore++;
    console.log(`You played ${playerSelection} and Computer played ${computerSelection}!`);
    console.log('You lost... Better luck next round!');
  }
}

function game() {
  let playerSelection;
  let computerSelection;

  while (playerScore < 5 && computerScore < 5) {
    playerSelection = prompt('Pick rock, paper or scissors!').toLowerCase();
    computerSelection = computerPlay();
    playRound(playerSelection, computerSelection);
    console.log('Current Score:');
    console.log(`Player: ${playerScore}`);
    console.log(`Computer: ${computerScore}`);
  }

  if (playerScore > computerScore) {
    console.log('Congratulations! You have defeated the Computer!');
  } else {
    console.log('What a shame, you lost!');
  }
}
