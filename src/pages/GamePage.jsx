import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";

function GamePage() {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [firstTry, setFirstTry] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120); 

  const navigate = useNavigate();
  const location = useLocation();
  const selectedTheme = location.state?.selectedTheme;
  const username = location.state?.username;

  useEffect(() => {
    if (selectedTheme) {
      const themeURL = `/data/${selectedTheme}`;
      fetch(themeURL)
        .then((response) => response.json())
        .then((data) => {
          setWords(data.words);
          setCurrentWord(
            data.words[Math.floor(Math.random() * data.words.length)].trim()
          );
        })
        .catch((error) => {
          console.error("Error loading JSON file:", error);
        });
    }
  }, [selectedTheme]);

  useEffect(() => {
    let timerId;
    if (isTimerActive) {
      timerId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerId);
            setIsTimerActive(false);
            setIsGameActive(false);
            alert(`Great round ${username} Your total score is ${score}`);
            return 120;
          }
          return prevTime - 1;
        });
      }, 1000); 
    }

    return () => clearInterval(timerId);
  }, [isTimerActive, score]);

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (input === "") {
      setCurrentScore(0);
      setFirstTry(true);
      return;
    }

    if (!isGameActive) {
      setIsGameActive(true);
      setIsTimerActive(true);
    }

    let newScore = 0;
    let incorrectPoints = 0;

    for (let i = 0; i < input.length; i++) {
      if (i < currentWord.length) {
        if (input[i] === currentWord[i]) {
          newScore++;
        } else {
          incorrectPoints = Math.min(incorrectPoints + 1, 5);
          setFirstTry(false);
        }
      } else {
        incorrectPoints = Math.min(incorrectPoints + 1, 5);
      }
    }

    setCurrentScore(Math.max(newScore - incorrectPoints, 0));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (userInput === currentWord) {
        let bonusPoints = firstTry ? 50 : 0;
        setScore((prevScore) => prevScore + currentScore + bonusPoints);
        setConsecutiveCorrect((prev) => prev + 1);

        if (consecutiveCorrect >= 2) {
          setScore((prevScore) => prevScore + 100);
          setConsecutiveCorrect(0);
        }

        const newWord = words[Math.floor(Math.random() * words.length)];
        setCurrentWord(newWord);
        setUserInput("");
        setCurrentScore(0);
        setFirstTry(true);
      } else {
        setConsecutiveCorrect(0);
      }
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const restartGame = () => {
    window.location.reload();
  };

  return (
    <div>
      <h2>Game Page</h2>
      <p>Current Word: {currentWord}</p>
      <p>Score: {score}</p>
      <p>
        Time Remaining: {Math.floor(timeRemaining / 60)}:
        {(timeRemaining % 60).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </p>
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type the word here"
      />
      <PrimaryButton label="Back" onClick={goBack} />
      <PrimaryButton label="Restart" onClick={restartGame} />
    </div>
  );
}

export default GamePage;
