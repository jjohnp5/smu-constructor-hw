const Word = require('./Word.js');
const inquire = require('inquirer');
const colors = require('colors/safe')

const randos = [
    "Jurassic Park",
    "New Yankees",
    "Dak Cowboy",
    "Memeo Weebo",
    "Dandy Kick"
]
// var jj = new Word.word(randos[1]);
let randoIndex
let guessRemaining
let currentWord
let guessedLetters = [];
reset();
function reset() {
    guessedLetters = [];
    randoIndex = Math.floor(Math.random() * randos.length);
    currentWord = randos[randoIndex].split(' ').map(word => {
        return new Word.word(word);
    })
    guessRemaining = 10;
    inq();
}



function inq() {
    if (guessRemaining > 0) {
        inquire.prompt([
            {
                type: 'input',
                message: colors.blue('Guess a letter. Only 1 letter each input.'),
                name: 'letter',
                validate: function (s) {
                    return s.length < 2 ? true : colors.cyan('Invalid input, please type just one letter and press enter.');
                }
            }
        ]).then(res => {
            if (guessedLetters.indexOf(res.letter) !== -1) {
                console.log(colors.yellow('You Already guessed that letter, please try again.'));
                console.log(currentWord.join(' '));
                inq();
            } else {
                guessedLetters.push(res.letter)
                let logger = "";
                let currentGuess;
                let currentWordGuessed;
                let guessStatus = [];
                let currentGuessStatus = [];
                currentWord.forEach(word => {
                    currentGuess = word.getCurrentGuessed()
                    word.updateLetter(res.letter)
                    currentWordGuessed = word.getCurrentGuessed()
                    word.setGuessStatus();
                    guessStatus.push(word.getGuessStatus())
                    currentGuessStatus.push(currentGuess === currentWordGuessed);
                })
                if (currentGuessStatus[0] && currentGuessStatus[1]) {
                    guessRemaining--;
                    console.log(colors.red('Letter not found. Try again. Guesses remaining = ' + guessRemaining));
                }else{
                    console.log(colors.rainbow('GOOOD GUESSS!!'));
                }
                if (guessStatus[0] && guessStatus[1]) {
                    inquire.prompt([
                        {
                            type: 'confirm',
                            message: colors.green('You Win!. Play again?'),
                            name: 'conf'
                        }
                    ]).then(res => {
                        if (res.conf) {
                            reset();
                        } else {
                            return;
                        }
                    })
                } else {
                    console.log(currentWord.join(' '));
                    inq();
                }


            }
        })

    } else {
        inquire.prompt([
            {
                type: 'confirm',
                message: 'No More guesses. Play again?',
                name: 'conf'
            }
        ]).then(res => {
            if (res.conf) {
                reset();
            } else {
                return;
            }
        })
    }



}