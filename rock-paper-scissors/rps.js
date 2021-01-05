let playerScore = 0;
let computerScore = 0;
let playerSelection;
let computerSelection;

const options = ['rock', 'paper', 'scissors'];

function computerPlay() {
  return options[Math.floor(Math.random() * 3)];
}

function playerPlay() {
  playerSelection = this.textContent.toLowerCase();
  game();
}

const selections = document.querySelectorAll('.selection');

selections.forEach((selection) => {
  selection.addEventListener('click', playerPlay);
});

const scoreboard = document.querySelector('.scoreboard');
const gameMessage = document.createElement('p');
gameMessage.style.whiteSpace = 'pre-line';
const scoreMessage = document.createElement('p');
scoreMessage.style.whiteSpace = 'pre-line';
const winnerMessage = document.createElement('p');

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    gameMessage.textContent = `Both players picked ${playerSelection}!\nIt's a draw!\nOn to the next round!`;
    scoreboard.appendChild(gameMessage);
  } else if (
    (playerSelection === 'rock' && computerSelection === 'scissors') ||
    (playerSelection === 'paper' && computerSelection === 'rock') ||
    (playerSelection === 'scissors' && computerSelection === 'paper')
  ) {
    playerScore++;
    gameMessage.textContent = `You played ${playerSelection} and Computer played ${computerSelection}!\nYou win!\nAwesome! You got this!`;
    scoreboard.appendChild(gameMessage);
  } else {
    computerScore++;
    gameMessage.textContent = `You played ${playerSelection} and Computer played ${computerSelection}!\nYou lose...\nBetter luck next time!`;
    scoreboard.appendChild(gameMessage);
  }
}

function game() {
  winnerMessage.textContent = '';
  computerSelection = computerPlay();
  playRound(playerSelection, computerSelection);
  scoreMessage.textContent = `Game Score:\nPlayer: ${playerScore}\nComputer: ${computerScore}`;
  scoreboard.appendChild(scoreMessage);

  if (playerScore === 5 || computerScore === 5) {
    if (playerScore > computerScore) {
      winnerMessage.textContent = 'Congratulations! You have defeated the Computer!';
      scoreboard.appendChild(winnerMessage);
    } else {
      winnerMessage.textContent = 'What a shame, you lost!';
      scoreboard.appendChild(winnerMessage);
    }
    playerScore = 0;
    computerScore = 0;
  }
}
