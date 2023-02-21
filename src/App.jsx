import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Die from './Die'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzie, setTenzie] = useState(false)

  function generateNeWDice(){
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid()
  }
}

useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0]
  const allValuesSame = dice.map(die => die === firstValue)
  if(allHeld && allValuesSame){
    setTenzie(true)
  }
},[dice])

function allNewDice() {
  const newDice = []
  for (let i = 0; i < 10; i++) {
      newDice.push(generateNeWDice())
  }
  return newDice
}

function holdDie(id){
  setDice(prevDice => (
    prevDice.map(die => (
      die.id === id ? {...die, isHeld: !die.isHeld} : die
    ))
  ))
}

function RollDice(){
  if(!tenzie){
    setDice(prevDice => (
      prevDice.map(die => (
        die.isHeld ? die : generateNeWDice()
      ))
    ))
  } else {
    setTenzie(false)
    setDice(allNewDice())
  }
}

const diceElements = dice.map(die => (
  <Die 
  key={die.id}
  isHeld={die.isHeld}
  value={die.value}
  hold={() => holdDie(die.id)}
  />
))


  return(
    <main>
      {tenzie && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
      {tenzie ? `You have won the game. Click the New Game button to start a new game.`:`Roll until all dice are the same. 
      Click each die to freeze it at its current value between rolls.`}</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <button
      className="roll-dice"
      onClick={RollDice}
      >{tenzie ? "New Game" : "Roll"}</button>
    </main>
  )
}

export default App
