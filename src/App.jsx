import React, { useState } from "react";
import './App.css'

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));  // Board state: an array of 9 squares, initially empty
  const [xIsNext, setXIsNext] = useState(true);  // Keeps track of whether "X" is the next player


  // All possible winning line combinations
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
  ];


  // Function to check if a winner exists
  const calculateWinner = (squares) => {
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];  // Return "X" or "O"
      }
    }
    return null;  // No winner yet
  }


   // Determine if we have a winner or whose turn is next
  const winner = calculateWinner(board);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;


  // Function to handle a square click
  const handleClick = (i) => {
    if (board[i] || winner){
       return;
    }

    const newBoard = [...board];
    newBoard[i] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);  // Switch turn
  }


  // Reset game to initial state
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  }


  return (
    <div className="game-container">
      {/* Game Title */}
      <h1>Tic Tac Toe</h1>

      {/* Status message: winner or next player */}
      <div className="status">{status}</div>

      {/* Game board: 9 squares */}
      <div className="board">
        {board.map((value, index) => (
          <button key={index} className="square" onClick={() => handleClick(index)}>
            {value}
          </button>
        ))}
      </div>

      {/* Reset game button */}
      <button className="reset-button" onClick={resetGame}>Restart Game</button>
    </div>
  );
}

export default App
