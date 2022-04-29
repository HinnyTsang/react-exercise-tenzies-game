import React from 'react'
import Dice from '../dice/Dice'
import './Dices.css'

const Dices = ({ dicesValue, handleClick }) => {


  const dices_array = dicesValue.map(
    ({ value, isHeld, key }) => {
      return (
        <Dice
          key={key}
          id={key}
          value={value}
          isHeld={isHeld}
          handleClick={handleClick}
        />)
    }
  )

  return (
    <div className='dices--container'>
      {dices_array}
    </div>
  )
}

export default Dices