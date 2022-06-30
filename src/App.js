import { useEffect, useState } from "react";
import "./App.css";
import Row from "./Row";
import forbiddenKeys from "./forbiddenKeys";

const API_URL = "https://random-word-api.herokuapp.com/word?length=5";
function App() {
  const [word, setWord] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  useEffect(() => {
    const fetchWord = async () => {
      const res = await fetch(API_URL);
      const word = await res.json();
      setWord(word[0]);
    };

    fetchWord();
  }, []);

  useEffect(() => {
    const keyPress = (e) => {
      const pattern = /^[a-zA-Z]{1}$/;
      const isLetter = e.key.match(pattern) !== null;
      if (isLetter) {
        setCurrentGuess((prevGuess) =>
          prevGuess.length === 5 ? prevGuess : prevGuess + e.key.toLowerCase()
        );
      }

      if (e.key === "Enter") {
        if (currentGuess.length >= 5) {
          const currentIndex = guesses.findIndex((guess) => guess === null);
          const newGuesses = [...guesses];
          newGuesses[currentIndex] = currentGuess;
          setGuesses(newGuesses);
          setCurrentGuess("");
          return;
        }
        return;
      }

      if (e.key === "Backspace") {
        setCurrentGuess((prevGuess) => prevGuess.slice(0, -1));
        return;
      }
    };

    if (guesses[guesses.length - 1] !== null) {
      setIsGameOver(true);
      return;
    }

    window.addEventListener("keyup", keyPress);
    return () => window.removeEventListener("keyup", keyPress);
  }, [currentGuess, guesses]);

  return (
    <div className="App">
      {word.length > 0 ? (
        <div className="column">
          {guesses.map((guess, i) => {
            const isCurrentGuess =
              i === guesses.findIndex((val) => val === null);
            return (
              <Row
                key={i}
                guess={isCurrentGuess ? currentGuess : guess ?? ""}
                word={word}
                isFinal={!isCurrentGuess && guess !== null}
              />
            );
          })}
        </div>
      ) : null}
      {isGameOver && <div>Game is over.</div>}
      {word}
    </div>
  );
}

export default App;
