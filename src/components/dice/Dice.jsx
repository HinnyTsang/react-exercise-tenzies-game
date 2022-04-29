import React from 'react'
import './Dice.css'


const Dice = (props) => {

  const { isHeld, value, id, handleClick } = props


  const dots = Array(value).fill(0).map((val, idx) => <div className={`dot d${idx}`}/>);

  return (
    <div
      className={isHeld ? `dice held` : `dice`}
      onClick={(e) => handleClick(id)}
    >
      <div className={`dots n${value}`}>{dots}</div>
    </div>
  )
}

export default Dice