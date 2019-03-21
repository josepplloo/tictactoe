import React from 'react';
import Board from './Board.js';
  
export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        column: 0,
      }],
      xIsNext: true,
      stepNumber: 0,
      sort: true,
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X': 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares,
          column: i,
        }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,  
    });
  }

  toggleSort() {
    this.setState({
      sort: !this.state.sort,
    })
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const order = this.state.sort;

    const moves = history.map((step, move) => {
      const [col, row] = calculateLocation(history[move].column);
      const desc = move ?
        'Go to move #' + move +': '+ col +', ' + row :
        'Go to game start';
      return (
        <li key={move} className={move === history.length - 1 ? "selected": "unselected" }>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
    
    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <button onClick={() => this.toggleSort()}>Sort</button>
          <ol className={order? "ascending": "descending"}>{ moves }</ol>
        </div>
      </div>
    );
  }
}

function calculateLocation(move) {
  return [(move % 3) +1, Math.trunc(move /3) +1 ];
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}