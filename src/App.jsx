import { useState } from 'react';
import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import { WINNING_COMBINATIONS } from './winning-compinations.js';
import Gameover from './components/GameOver.jsx';

const PLAYERS = {
  'X': 'Player-X',
  'O': 'Player-O'
};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}
function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}
function deriveWinner(gameBoard) {
  let winner;

  for (const compination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[compination[0].row][compination[0].column];
    const secondSquareSymbol = gameBoard[compination[1].row][compination[1].column];
    const thirdSquareSymbol = gameBoard[compination[2].row][compination[2].column];
    

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = firstSquareSymbol;
    }
  }

  return winner;
}
function deriveDraw(gameBoard, winner) {
  let draw = false;
  if (!winner && gameBoard[0].indexOf(null) === -1 && gameBoard[1].indexOf(null) === -1 && gameBoard[2].indexOf(null) === -1) {
    draw = true;
  }
  return draw;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playersName, setPlayersName] = useState(PLAYERS);

  const currentPlayer = deriveActivePlayer(gameTurns);
  let gameBoard = deriveGameBoard(gameTurns);
  let winner = deriveWinner(gameBoard);
  let draw = deriveDraw(gameBoard, winner);

  function handleResetGame() {
    setGameTurns([]);
  }
  function handleSelectSquare(rowIndex, cellIndex) {
    setGameTurns(prevTerns => {
      const currentPlayer = deriveActivePlayer(prevTerns);
      const updatedTurns = [
        {
          square: { row: rowIndex, col: cellIndex },
          player: currentPlayer
        },
        ...prevTerns
      ];
      return updatedTurns;
    });
  }
  function handlePlayerNameChange(symbol, newName) {
    setPlayersName(prevNames => ({
      ...prevNames,
      [symbol]: newName
    })
    )
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initalName={PLAYERS['X']} symbol="X" isActive={currentPlayer === 'X'} onChangeName={handlePlayerNameChange} />
          <Player initalName={PLAYERS['O']} symbol="O" isActive={currentPlayer === 'O'} onChangeName={handlePlayerNameChange} />
        </ol>
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
      {(winner || draw) && <Gameover winner={playersName[winner]} onRestart={handleResetGame} />}

    </main>
  )
}

export default App;
