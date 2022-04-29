import React, { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { Dices, Roll } from './components'
import Confetti from 'react-confetti'
import './App.css'

const App = () => {

  const singleDie = () => Math.round(Math.random() * 6)

  const newDicesValue = () => (Array(10).fill().map(
    () => ({
      value: singleDie(),
      isHeld: false,
      key: nanoid()
    })
  ))

  const [dicesValue, setDicesValue] = useState(newDicesValue());

  const [rollCounter, setRollCounter] = useState(0);
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dicesValue.every(diceValue => diceValue.isHeld);
    const firstValue = dicesValue[0].value;
    const allSameValue = dicesValue.every(diceValue => diceValue.value === firstValue);

    if (allHeld && allSameValue) {
      
      setTenzies(true);
      const maxScore = localStorage.getItem('tenziesMaxScore');

      if (maxScore === null || rollCounter < maxScore) {
        alert('New high score!');
        localStorage.setItem('tenziesMaxScore', rollCounter);
      }
      else {
        alert(`Previous high score is ${maxScore}`);
      }
    }


  }, [dicesValue])

  const rollNewDice = () => {

    if (tenzies === true) {
      setDicesValue(newDicesValue());
      setTenzies(false);
      setRollCounter(0);
    }
    else {
      setRollCounter(prev => prev + 1);
      setDicesValue((prevDices) =>
        prevDices.map((item) => (
          item.isHeld ?
            item :
            { ...item, value: singleDie() }
        ))
      )
    }
  }

  const holdDice = (key) => {

    setDicesValue((prev) =>
      prev.map((item) => ({
        ...item,
        isHeld: item.key === key ? !item.isHeld : item.isHeld
      })
      ))
  }


  return (
    <div className='app--body'>
      {tenzies && <Confetti />}
      <div className='app--container'>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <Dices dicesValue={dicesValue} handleClick={holdDice} />
        <Roll handleClick={rollNewDice} haveWon={tenzies} rollCounter={rollCounter}/>
      </div>
    </div>
  )
}

export default App