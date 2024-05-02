import GameBoard from "./Components/GameBoard"
import Log from "./Components/Log";
import Player from "./Components/Player"
import { useState } from "react"
import GameOver from "./Components/GameOver";

import {WINNING_COMBINATIONS} from './winning-combinations'
const INITAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]
const PLAYERS={
  X:"Player x",
  O:"Player o"
}
function derieveActivePlayer(gameTurns){
  let currentPlayer='X';

  if(gameTurns.length>0 && gameTurns[0].player==='X')currentPlayer='O'
  return currentPlayer;
}
function derieveWinner(gameBoard,playerNames){
  let winnerSymbol=null

  for (const comb of WINNING_COMBINATIONS){
    let firstSymbol=gameBoard[comb[0].row][comb[0].column]
    let secondSymbol=gameBoard[comb[1].row][comb[1].column]
    let thirdSymbol=gameBoard[comb[2].row][comb[2].column]

    if(firstSymbol&&firstSymbol==secondSymbol&&firstSymbol==thirdSymbol)
    winnerSymbol=playerNames[firstSymbol]
  }
  return winnerSymbol
}

function derieveGameBoard(gameTurns){
  let gameBoard=[...INITAL_GAME_BOARD.map(inner=>[...inner])];
    
  for (const turn of gameTurns){
      const {square,player}=turn;
      const {row,col}=square;
      gameBoard[row][col]=player
  }
  return gameBoard
}

function App() {

  const [gameTurns,setGameTurns]=useState([]);

  const [playerNames,setPlayerNames]=useState(PLAYERS)

  const gameBoard=derieveGameBoard(gameTurns)

  const activePlayer=derieveActivePlayer(gameTurns);

  const winner=derieveWinner(gameBoard,playerNames)

  const hasDraw=gameTurns.length==9&&!winner

  function handleSelectSquare(rowIndex,colIndex){
    setGameTurns(prevTurns=>{
      let currentPlayer=derieveActivePlayer(prevTurns)
      const updatedTurns=[
        {
        square:{row:rowIndex,col:colIndex},
        player:currentPlayer
      }, ...prevTurns]
      return updatedTurns;
    });
  }
  function handleRematch(){
    setGameTurns([])
  }
  function handlePlayerNameChange(symbol,newName){
      setPlayerNames((prevPlayers)=>{
          let newPlayers={...prevPlayers
            ,[symbol]:newName
          }
          return newPlayers;
      })
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.X} symbol="X" isActive={activePlayer==='X'} />
          <Player onChangeName={handlePlayerNameChange} initialName={PLAYERS.O} symbol="O" isActive={activePlayer==='O'} />
        </ol>
        {(winner||hasDraw) && <GameOver onReset={handleRematch} winner={winner}/>}

        {<GameBoard gameBoard={gameBoard} activePlayer={activePlayer} onSelectSquare={handleSelectSquare} />}
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
