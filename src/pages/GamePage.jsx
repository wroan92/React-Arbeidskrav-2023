import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import GameEndModal from "../components/Modal";

function GamePage() {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState("");
  const [userInput, setUserInput] = useState("");
  const [score, setScore] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [firstTry, setFirstTry] = useState(true);
  const [isGameActive, setIsGameActive] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // currentScore blir brukt til og vise score i modalen, men alikevel får jeg en warning som sier at den ikke blir brukt.
  // Siden jeg ikke har funnet en annen måte å få scoren til å vises i modalen på, så har jeg valgt å ikke fjerne den.
  const [currentScore, setCurrentScore] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();
  const selectedTheme = location.state?.selectedTheme;
  const username = location.state?.username;

  // uses the selected theme on landingpage to fetch the correct json file, and sets the current word to a random word from the json file
  useEffect(() => {
    if (selectedTheme) {
      const themeURL = `/data/${selectedTheme}`;
      fetch(themeURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Failed to fetch with status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setWords(data.words);
          setCurrentWord(
            data.words[Math.floor(Math.random() * data.words.length)].trim()
          );
        })
        .catch((error) => {
          console.error("Error loading JSON file:", error);
          alert(`Error loading data from the JSON file: ${error.message}`);
        });
    }
  }, [selectedTheme]);

  //  When the timer is active, it decrements the time remaining every second.
  // If the time runs out, it stops the timer, ends the game, and opens a modal.
  useEffect(() => {
    let timerId;
    if (isTimerActive) {
      timerId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            setIsTimerActive(false);
            setIsGameActive(false);
            setIsModalOpen(true);
            clearInterval(timerId);
            return 10;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [isTimerActive]);

  // When the game ends and the score is greater than 0, it saves the score to local storage, it also ensures that only the top 5 scores are stored.
  useEffect(() => {
    if (!isGameActive && score > 0) {
      const storedScoreBoard =
        JSON.parse(localStorage.getItem("scoreBoard")) || [];
      const newScoreBoard = [...storedScoreBoard, { username, score }];
      newScoreBoard.sort((a, b) => b.score - a.score);
      if (newScoreBoard.length > 5) newScoreBoard.length = 5;
      localStorage.setItem("scoreBoard", JSON.stringify(newScoreBoard));
    }
  }, [isGameActive, score, username]);

  // * Kildehenvisning *
  // https://www.youtube.com/watch?v=We3YDTzNXEk
  // https://javascript.plainenglish.io/a-beginners-guide-to-the-levenshtein-distance-algorithm-part-2-how-to-code-a-matrix-in-javascript-5ab308eefcf0
  // Etter og ha slitt lenge med og løse den delen av poenglogikken som gikk på hvis brukeren skrev en feil bokstav i ordet så ble de resterende bokstavene
  // feil siden de havnet på feil plass i inputfeltet, etter mye leiting fant jeg denne metoden med levenshteinDistance. Denne metoden tar inn to strenger og
  // returnerer et tall som er hvor mange bokstaver som er forskjellige mellom de to strengene. Dette tallet bruker jeg til og regne ut hvor mange poeng brukeren
  // skal få for ordet. Hvis brukeren skriver feil bokstav i ordet så vil levenshteinDistance returnere et tall som er større enn 0, og da vil brukeren ikke få
  // poeng for ordet. Hvis brukeren skriver riktig bokstav i ordet så vil levenshteinDistance returnere 0, og da vil brukeren få poeng for ordet.
  function levenshteinDistance(str1, str2) {
    const len1 = str1.length;
    const len2 = str2.length;
    const dp = Array(len1 + 1)
      .fill(null)
      .map(() => Array(len2 + 1).fill(0));

    for (let i = 0; i <= len1; i++) {
      for (let j = 0; j <= len2; j++) {
        if (i === 0) {
          dp[i][j] = j;
        } else if (j === 0) {
          dp[i][j] = i;
        } else if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
        }
      }
    }

    return dp[len1][len2];
  }

  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    if (input === "") {
      setFirstTry(true);
      return;
    }

    if (!isGameActive) {
      setIsGameActive(true);
      setIsTimerActive(true);
    }

    let newScore = 0;

    for (let i = 0; i < input.length; i++) {
      if (i < currentWord.length) {
        if (input[i] === currentWord[i]) {
          newScore++;
        } else {
          setFirstTry(false);
        }
      }
    }

    setCurrentScore(newScore);
  };

  // Checks if the user has pressed the spacebar, if so it checks if the user has written the correct word.
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      e.preventDefault(); // Prevents the default spacebar action

      const editDistance = levenshteinDistance(userInput, currentWord);
      const correctCount = currentWord.length - editDistance;

      // Checks if the user input matches the current word
      if (userInput === currentWord) {
        let bonusPoints = firstTry ? 50 : 0;

        setScore((prevScore) => prevScore + correctCount + bonusPoints);

        // Handle consecutive correct answers for bonus points
        setConsecutiveCorrect((prev) => prev + 1);
        if (consecutiveCorrect + 1 >= 2) {
          setScore((prevScore) => prevScore + 100);
          setConsecutiveCorrect(0);
        }
      } else {
        setScore((prevScore) => prevScore + correctCount);
        setConsecutiveCorrect(0);
      }
      // Sets a new random word
      const newWord = words[Math.floor(Math.random() * words.length)];
      setCurrentWord(newWord);
      setUserInput("");
      setFirstTry(true);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  const restartGame = () => {
    window.location.reload();
  };

  return (
    <div className="mx-auto text-center">
      <GameEndModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        score={score}
        username={username}
      />

      <h2 className="text-3xl font-semibold">Game Page</h2>

      <p className="mt-10 text-xl">Score: {score}</p>
      <p className="mt-2 font-semibold">
        Time Remaining: {Math.floor(timeRemaining / 60)}:
        {(timeRemaining % 60).toLocaleString("en-US", {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </p>
      <p className="mt-2 text-3xl font-semibold">Current Word: {currentWord}</p>
      <input
        className="mt-10 w-1/4 mx-auto px-4 py-2 border-2 border-gray-400 rounded-md"
        type="text"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Type the word here"
      />
      <br />
      <PrimaryButton label="Back" onClick={goBack} />
      <PrimaryButton label="Restart" onClick={restartGame} />
    </div>
  );
}

export default GamePage;
