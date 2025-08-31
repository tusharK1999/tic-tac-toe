import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))  // Board state: an array of 9 squares, initially empty
  const [xIsNext, setXIsNext] = useState(true)  // Keeps track of whether "X" is the next player
  const [aiMode, setAiMode] = useState(false) // Toggle AI mode


  // All possible winning line combinations
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
    [0, 4, 8], [2, 4, 6]              // diagonals
  ]


  // Function to check winner
  const calculateWinner = (squares) => {
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]  // Return "X" or "O"
      }
    }
    return null  // No winner yet
  }


  // Determine if we have a winner or whose turn is next
  const winner = calculateWinner(board)
  const status = winner
    ? `Winner: ${winner}`
    : board.every(square => square !== null)
      ? "It's a Draw!"
      : `Next player: ${xIsNext ? "X" : "O"}`


  // Helper: Find best move for AI
  const findBestMove = (squares) => {
    // Try to win
    for (const [a, b, c] of lines) {
      if (squares[a] === "O" && squares[b] === "O" && !squares[c]) return c
      if (squares[a] === "O" && squares[c] === "O" && !squares[b]) return b
      if (squares[b] === "O" && squares[c] === "O" && !squares[a]) return a
    }

    // Try to block X
    for (const [a, b, c] of lines) {
      if (squares[a] === "X" && squares[b] === "X" && !squares[c]) return c
      if (squares[a] === "X" && squares[c] === "X" && !squares[b]) return b
      if (squares[b] === "X" && squares[c] === "X" && !squares[a]) return a
    }

    // Take center if free
    if (!squares[4]) return 4

    // Otherwise random empty
    const emptySquares = squares.map((val, idx) => val === null ? idx : null).filter(v => v !== null)
    return emptySquares[Math.floor(Math.random() * emptySquares.length)]
  }


  // AI makes move when it's O's turn
  useEffect(() => {
    if (aiMode && !xIsNext && !winner) {
      const timeout = setTimeout(() => {
        const bestMove = findBestMove([...board])

        if (bestMove !== undefined) {
          const newBoard = [...board]
          newBoard[bestMove] = "O"

          setBoard(newBoard)
          setXIsNext(true)
        }
      }, 500) // ⏳ delay of 500ms

      return () => clearTimeout(timeout) // cleanup in case user resets game
    }
  }, [board, xIsNext, aiMode, winner])


  // Function to handle a square click
  const handleClick = (i) => {
    if (board[i] || winner) {
      return
    }

    const newBoard = [...board]
    newBoard[i] = xIsNext ? "X" : "O"

    setBoard(newBoard)
    setXIsNext(!xIsNext)  // Switch turn
  }


  // Reset game to initial state
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
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

      <div className="buttons">
        <button className="reset-button" onClick={resetGame}>Restart Game</button>
        <button
          className="ai-button"
          onClick={() => {
            setAiMode(!aiMode)
            resetGame()
          }}
        >
          {aiMode ? "Play vs Friend" : "Play vs AI"}
        </button>
      </div>
    </div>
  )
}

export default App
