import { useState } from 'react'
import './App.css'
import Board from './logic/Board'
import { BOARD_SIZE } from './logic/constants'
import Position from './logic/Position'
import confetti  from "canvas-confetti"
import { Square } from './components/Square'
import { EVENTS } from './logic/constants'

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage 
    ? JSON.parse(boardFromStorage) 
    : new Board()
  })


  function updateBoard(index) {
    let position = new Position();
    position.transformFromIndex(index);
  
    // Clonando board
    const newBoard = board.clone();
  
    // Espera a que shoot se complete
    console.log(position.getX()+ " " + position.getY())
    const result = newBoard.shoot(position);
    setBoard(newBoard);

    console.log(result)
    if (result === EVENTS.sunk) {
      confetti();
    }
  }


  // Inicializar un array para almacenar los elementos JSX
  let squares = []

  for (let row = 0; row < BOARD_SIZE.X; row++) {
    for (let col = 0; col < BOARD_SIZE.Y; col++) {
      let position = new Position(row, col)
      let symbol = board.getSymbol(position)
      let index = position.transformToIndex()
      squares.push(<Square key={index} index={index} children={symbol} updateBoard={updateBoard}/>)
    }
  }

  console.log(board.toString())

  return (
    <main className="board">
      <h1>BattleShip</h1>
      <section className="game">
          {squares} {/* Renderizar el array de elementos JSX */}
      </section>
    </main>
  )
}

export default App
