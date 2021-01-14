const Gameboard = (() => {
  let boardState = ['', '', '', '', '', '', '', '', ''];
  const getCellIndex = (cell) => {
    return parseInt(cell.target.dataset.cell);
  };
  const getBoardState = () => {
    return boardState;
  };
  const setBoardState = (playerToken, index) => {
    boardState[index] = playerToken;
    document.querySelectorAll(`[data-cell]`)[index].innerText = playerToken;
  };
  const resetBoard = () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
  };
  return {
    getCellIndex,
    getBoardState,
    setBoardState,
    resetBoard,
  };
})();

const Player = (inputName, inputToken) => {
  const name = () => inputName;
  const token = () => inputToken;
  const play = (cell) => {
    let cellIndex = Gameboard.getCellIndex(cell);
    Gameboard.setBoardState(token(), cellIndex);
    if (Game.checkWin(allPlays(Gameboard.getBoardState()))) {
      Game.end();
    } else {
      Game.turn++;
      console.log(Game.turn);
    }
  };
  const allPlays = (boardState) => {
    let plays = [];
    for (let i = 0; i < boardState.length; i++) {
      if (boardState[i] === token()) {
        plays.push(i);
      }
    }
    return plays;
  };

  return { name, token, play, allPlays };
};

const Setup = (() => {
  const cells = document.querySelectorAll('.gameboard div');
  cells.forEach((cell) =>
    cell.addEventListener(
      'click',
      (e) => {
        if (Game.turn % 2 === 0) {
          Game.playerTwo.play(e);
        } else {
          Game.playerOne.play(e);
        }
      },
      {
        once: true,
      }
    )
  );
})();

const Game = (() => {
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

  let playerOne = Player('Ceca', 'x');
  let playerTwo = Player('CPU', 'o');

  let turn = 1;

  const checkWin = (playerPlays) => {
    return winningCellCombinations.some((condition) => {
      return condition.every((cell) => playerPlays.includes(cell));
    });
  };
  const checkDraw = () => {
    if (Gameboard.getBoardState().every((cell) => cell !== '')) {
    }
  };
  const declareGame = () => {
    // todo
  };
  const end = () => {
    console.log(turn);
    console.log('END');
  };

  return { turn, playerOne, playerTwo, checkWin, end };
})();
