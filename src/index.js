import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Square = ({ onClick, value }) => (
  <div className="square" onClick={onClick}>
    {value}
  </div>
)

class Board extends Component {
  constructor() {
    super()
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null
    }
  }
  handleClick = (i) => {
    const squares = this.state.squares.slice()
    if(calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({ 
      squares,
      xIsNext: !this.state.xIsNext,
      winner: calculateWinner(squares)
    })
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]} 
        onClick={() => this.handleClick(i)}
      />
    )
  }
  render() {
    const { winner } = this.state
    const status = winner ?
      "Winner is: " + winner :
      "Current player: " + (this.state.xIsNext ? 'X' : 'O')

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}{this.renderSquare(1)}{this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}{this.renderSquare(4)}{this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}{this.renderSquare(7)}{this.renderSquare(8)}
        </div>
      </div>
    )
  }
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

class Game extends Component {
  constructor() {
    super()
    this.state = {
      hello: 'there'
    }
  }
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{ /* status */ }</div>
          <ol>{ /* TODO */ }</ol>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)