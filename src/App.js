import './App.css';
import React, { useState, createContext, useEffect } from 'react'
import Board from './component/Board';
import Keyboard from './component/Keyboard';
import GameOver from './component/GameOver';
import { boardDefault, generateFunc } from './component/Word';
export const AppContext = createContext();

function App() {

  // Defining here just to use it in the whole Project application//
  const [board, setBoard] = useState(boardDefault);
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord,setCorrectWord] = useState("");
  const [currAttempt, setCurrAttempt] = useState({
    attempt: 0,
    letterPos: 0
  });
  const [onGameOver, setOnGameOver] = useState({
    gameOver: false,
    guessWord: false
  })

  useEffect(() => {
    generateFunc().then((words) => {
      setWordSet(words.wordSet)
      setCorrectWord(words.todaysWord)
    })
  }, [])

  
  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrAttempt({ 
      ...currAttempt, 
      letterPos: currAttempt.letterPos + 1
     })
  }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = " ";
    setBoard(newBoard);
    setCurrAttempt({
        ...currAttempt,
        letterPos: currAttempt.letterPos - 1 
      })
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrAttempt({
         attempt: currAttempt.attempt + 1,
         letterPos: 0 
       })
    }
    else {
      alert('No word found');
    }
    if (currWord === correctWord) {
      setOnGameOver({ gameOver: true, guessWord: true })
      return
    }
    if (currAttempt.attempt === 5) {
      setOnGameOver({ gameOver: true, guessWord: false })
    }
  }

  return (
    <>
      <div className="App">
        <nav>
          <h1>Wordle</h1>
        </nav>
        <AppContext.Provider value={{
          board,
          setBoard,
          currAttempt,
          setCurrAttempt,
          onSelectLetter,
          onDelete,
          onEnter,
          correctWord,
          disabledLetters,
          setDisabledLetters,
          onGameOver,
          setOnGameOver
        }}>
          <div className='game'>
             <div className='board'>
              <Board />
            </div>
            <div className='keyboard'>
              {onGameOver.gameOver ? <GameOver /> : <Keyboard />}
            </div>
          </div>
        </AppContext.Provider>
      </div>
    </>
  );
}

export default App;
