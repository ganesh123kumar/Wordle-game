import React, { useContext } from 'react'
import { AppContext } from '../App'

const GameOver = () => {
    const{ onGameOver, currAttempt,correctWord } = useContext(AppContext);
  return (
    <>
    <div className='gameOver'>
        <h3>{onGameOver.guessWord ? "You correctly guessed the word" : "You failed"}</h3>
        <h1>Correct Word : {correctWord}</h1>
        {onGameOver.guessWord && (<h3>You have taken {currAttempt.attempt} attempt</h3>)}
    </div>
    <div>
      <button 
         onClick={()=> window.location.reload() }
         className='newgame'
      >
         New Game
      </button>
    </div>
    </>
  )
}

export default GameOver
