import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){//'function component' . no state, only render . simplified notation
  return (
      <button
        className="square" 
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  
  renderSquare(i) {
    return (
      <Square 
        value={this.props.squares[i]} 
        onClick={()=>this.props.onClick(i)}
      />
    );
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      history: [
        { squares:Array(9).fill(null), clickedSquare: null },
      ],
      xIsNext: true,
      moveNumber: 0,
    }
  }
  handleClick(i){
    const history = this.state.history.slice(
        0,this.state.moveNumber +1
      );
    const current = history[history.length - 1];
    const squares = current.squares.slice();//shallow copy. Data change without mutation is preferable (keep previous states, detect change).
    
    if( calculateWinner(squares) || squares[i]){
      return;
    }


    squares[i] = this.state.xIsNext?'X':'O';//this doesnt alter the state as strings are passed by value on shallow-copy (so are ints and bools)
    this.setState( 
      {
        history: history.concat([
          {squares: squares, clickedSquare: i,},
        ]),
        moveNumber: history.length,
        xIsNext: !this.state.xIsNext,
      } 
    );//not a huge fan of refreshing the whole board -> shouldComponentUpdate tackles my worries for components on more complex setups
  }
  jumpTo(moveNumber){
    this.setState({
      moveNumber: moveNumber,
      xIsNext: (moveNumber%2)===0,
    })
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.moveNumber];
    const winner = calculateWinner(current.squares);

    const historyButtons = history.map(
      (step, moveNumber) => {
        const description = moveNumber?
          'Go to move #'+moveNumber+" "+getRowCols(step.clickedSquare) :
          'Start Game';
        return(
          <li key={moveNumber}>
            <button 
              onClick={ ()=>{this.jumpTo(moveNumber)} }
            >
              {description}
            </button>
          </li>
        );
      }
    );

    let status;
    if(winner){
      status = 'Winner: '+ winner;
    } else {
      status = 'Next player: '+(this.state.xIsNext?'X':'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick = {(i)=>this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{historyButtons}</ol>
        </div>
      </div>
    );
  }
}

function getRowCols(i){
  const row = Math.floor(i/3);
  const col= i%3;
  return "("+row+","+col+")"
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

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
