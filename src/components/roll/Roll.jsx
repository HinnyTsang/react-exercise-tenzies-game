import React from 'react'
import './Roll.css'

const Roll = ({ handleClick, haveWon, rollCounter }) => {
    return (
        <div className='container'>
            {haveWon && <p>Your Score is {rollCounter}!</p>}
            <div className='button' onClick={handleClick}>
                <h1>{haveWon ? "New Game" : `Roll (${rollCounter})`}</h1>
            </div>
        </div>
    )
}

export default Roll