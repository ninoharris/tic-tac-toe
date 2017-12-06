import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Square = ({ onClick, value }) => (
  <div className="square" onClick={onClick}>
    {value}
  </div>
)

class Board extends Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]} 
        onClick={() => this.props.onClick(i)}
      />
    )
  }
  render() {
    return (
      <div>
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
      history: [{
        squares: new Array(9).fill(null)
      }],
      xIsNext: true,
    }
  }
  handleClick = (i) => {
    const { history, winner } = this.state
    const current  = history[history.length - 1]
    const squares = current["squares"].slice()
    if (winner || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState((prevState) => {
      return {
        history: [...history, {
          squares: squares,
        }],
        xIsNext: !prevState.xIsNext,
        winner: calculateWinner(squares)
      }
    })
  }
  render() {
    const { winner, xIsNext, history } = this.state

    const status = winner ?
      "Winner is: " + winner :
      "Current player: " + (xIsNext ? 'X' : 'O')

    const moves = history.map((stepsTaken, moveNum) => {
      const text = moveNum > 0 ?
        "Go to move #" + moveNum :
        "Go to game start"
      
      return (
        <li key={moveNum}>
          <button onClick={() => this.goTo(moveNum)}>{text}</button>
        </li>
      )
    })
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            onClick={this.handleClick} 
            squares={this.state.history.slice(-1)[0]['squares']}
            xIsNext={this.state.xIsNext}
            winner={this.state.winner}
             />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)