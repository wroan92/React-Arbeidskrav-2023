# TypeMaster Theme Edition

TypeMaster Theme Edition is a typing game where users can practice their typing skills with various themes. Users select a theme, enter their username, and then type words related to the chosen theme. The game tracks the user's score and time, and provides feedback on their performance.

## Features

- **Theme Selection**: Users can choose from various themes like "Breast Cancer Awareness Month", "Halloween", "Autumn", and "Oktoberfest".
- **Score Tracking**: The game keeps track of the user's score based on their typing accuracy.
- **Timer**: A countdown timer adds an element of challenge to the game.
- **Consecutive Correct Bonus**: Users receive bonus points for consecutive correct answers.
- **Local Storage**: The game saves the top 5 scores in the local storage.
- **End Game Modal**: A modal pops up at the end of the game to display the user's score.

## How to Play

1. Navigate to the HomePage.
2. Enter your username.
3. Select a theme from the available options.
4. Click "Start Game".
5. Type the displayed word in the input field.
6. Press the spacebar to submit the word and move on to the next word.
7. Try to type as many words as possible before the timer runs out.
8. At the end of the game, view your score in the modal.

## Scoring System

In TypeMaster Theme Edition, the scoring system is designed to reward accuracy and speed:

1. Word Accuracy: The closer the match, the higher the score. If the user's input is exactly the same as the current word, they receive points equal to the length of the word.

2. First Try Bonus: If the user types the word correctly on their first try, they receive an additional bonus of 50 points.

3. Consecutive Correct Bonus: For every two consecutive words typed correctly, the user receives an additional bonus of 100 points.

4. End of Game: At the end of the game, the user's total score is displayed, and if it's one of the top 5 scores, it's saved in the local storage.


## For Developers

### Technologies Used

- **React**: The main library used for building the user interface.
- **React Router**: Used for routing and navigation within the app.
- **Tailwind CSS**: A utility-first CSS framework used for styling the application.

### Setting Up the Project

1. **Clone the Repository**:

   ```bash
   git clone [repository-url]
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd type-master-theme-edition
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Start the Development Server**:

   ```bash
   npm start
   ```

   This will start the development server, and the app should open in your default browser. If not, you can manually navigate to `http://localhost:3000`.

5. **Building for Production**:

   ```bash
   npm run build
   ```

   This command will create an optimized build of the project in a `build` directory.

### Contributing

If you wish to contribute to this project:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes.
4. Submit a pull request to the main branch.
