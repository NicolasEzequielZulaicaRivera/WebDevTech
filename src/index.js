import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){//'function component' . no state, only render . simplified notation
  return (
      <button
        className={"square "+props.className} 
        onClick={props.onClick}
      >
        {props.value}
      </button>
    );
}

class Board extends React.Component {
  
  renderSquare(i, winningSquare) {
    return (
      <Square 
        key={i}
        value={this.props.squares[i]} 
        onClick={()=>this.props.onClick(i)}
        className={ winningSquare?"winningSquare":"" }
      />
    );
  }

  render() {

    return (
      <div>
      {
        [...Array(3)].map( (x,i)=>{
          return(
            <div className="board-row" key={i}>
            {
              [...Array(3)].map( (y,j)=>{
                return(
                  this.renderSquare(
                    3*i+j,
                    this.props.winningSquares.includes(3*i+j)
                  )
                ) 
              })
            }
            </div>
          ) 
        })
      }
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
      reversedMovesOl: false,
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
    const winnerInfo = calculateWinner(current.squares);
    const winner = winnerInfo? winnerInfo.winner:null;

    const historyButtons = history.map(
      (step, moveNumber) => {
        const description = moveNumber?
          'Go to move #'+moveNumber+" "+getRowCols(step.clickedSquare) :
          'Start Game';
        return(
          <li key={moveNumber}>
            <button 
              onClick={ ()=>{this.jumpTo(moveNumber)} }
              className = { ( (moveNumber===this.state.moveNumber)? "selectedMove":"" ) }
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
            winningSquares={ (winnerInfo? winnerInfo.winningSquares: [])+" "}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <button 
            onClick={ ()=>{ 
              this.state.reversedMovesOl = !this.state.reversedMovesOl;//FIXME- direct state mutation
              this.forceUpdate();
            }}
          >
            Toggle order
          </button>
          <ol className={this.state.reversedMovesOl?"reversedOl":""} >
            {historyButtons}
          </ol>
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
      return {winner: squares[a],winningSquares: lines[i],};
    }
  }
  if( !squares.includes(null) ){
    return {winner: "Tie", winningSquares: Array(9).fill().map((x,i)=>i), }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
