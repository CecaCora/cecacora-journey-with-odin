const Game = (() => {
  let isActive = false;
  let playerOne;
  let playerTwo;
  let turn = 1;
  let board = ['', '', '', '', '', '', '', '', ''];
  let winner = '';

  return { isActive, playerOne, playerTwo, turn, board, winner };
})();

const Methods = (() => {
  const toggleIsActive = () => {
    Game.isActive = !Game.isActive;
  };

  const Player = (inputName, inputMarker) => {
    const getName = () => inputName;
    const getMarker = () => inputMarker;
    const makePlay = (cellIndex) => {
      getBoard()[cellIndex] = getMarker();
      setCell(cellIndex).innerText = getMarker();
      updateTurn();
      if (isWinner()) {
        setWinner(getName());
        console.log(getWinner());
      }
      if (isDraw()) {
        console.log('draw');
      }
    };
    const getPlays = () => {
      let plays = [];
      for (let i = 0; i < getBoard().length; i++) {
        if (getBoard()[i] === getMarker()) {
          plays.push(i);
        }
      }
      return plays;
    };
    const isWinner = () => {
      return winningCellCombinations.some((condition) => {
        return condition.every((cell) => getPlays().includes(cell));
      });
    };

    return { getName, getMarker, makePlay, getPlays, isWinner };
  };

  const getPlayerOne = () => Game.playerOne;

  const setPlayerOne = (inputName, inputMarker = 'x') => {
    Game.playerOne = Player(inputName, inputMarker);
  };

  const getPlayerTwo = () => Game.playerTwo;

  const setPlayerTwo = (inputName, inputMarker = 'o') => {
    Game.playerTwo = Player(inputName, inputMarker);
  };

  const getTurn = () => Game.turn;

  const updateTurn = () => Game.turn++;

  const winningCellCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getBoard = () => Game.board;

  const setCell = (cellIndex) => document.querySelectorAll('[data-cell]')[cellIndex];

  const isFilled = () => getBoard().every((cell) => cell !== '');

  const getWinner = () => Game.winner;

  const setWinner = (name) => (Game.winner = name);

  const isDraw = () => {
    if (isFilled() && getWinner() === '') {
      return true;
    }
  };

  const resetBoard = () => (Game.board = ['', '', '', '', '', '', '', '', '']);

  return {
    toggleIsActive,
    getPlayerOne,
    setPlayerOne,
    getPlayerTwo,
    setPlayerTwo,
    getTurn,
    updateTurn,
    getBoard,
    setCell,
    isDraw,
    resetBoard,
  };
})();

const Display = (() => {
  const registerPlayers = () => {
    Methods.setPlayerOne(document.querySelector('#p1').value);
    Methods.setPlayerTwo(document.querySelector('#p2').value);
  };

  const playButton = document.querySelector('.play');
  playButton.addEventListener('click', (e) => {
    e.preventDefault();
    registerPlayers();
    Methods.toggleIsActive();
  });

  const cells = document.querySelectorAll('[data-cell]');
  cells.forEach((cell) =>
    cell.addEventListener(
      'click',
      (e) => {
        if (Methods.getTurn() % 2 === 0) {
          Methods.getPlayerTwo().makePlay(parseInt(e.target.dataset.cell));
        } else {
          Methods.getPlayerOne().makePlay(parseInt(e.target.dataset.cell));
        }
      },
      { once: true }
    )
  );
})();
