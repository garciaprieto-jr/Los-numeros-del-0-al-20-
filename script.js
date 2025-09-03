document.addEventListener('DOMContentLoaded', () => {
    // --- Elementos del DOM ---
    const startScreen = document.getElementById('start-screen');
    const gameContainer = document.getElementById('game-container');
    const gameOverScreen = document.getElementById('gameOver-screen');
    const wellDoneScreen = document.getElementById('wellDone-screen');
    const perfectScreen = document.getElementById('perfect-screen');
    const playAudioBtn = document.getElementById('playAudioBtn');
    const optionsContainer = document.getElementById('options-container');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextBtn');
    const correctCountEl = document.getElementById('correct-count');
    const incorrectCountEl = document.getElementById('incorrect-count');
    const nextCountdownEl = document.getElementById('next-countdown');

    // --- Botones de inicio de juego ---
    const startGame0_10Btn = document.getElementById('startGame0-10');
    const startGame11_20Btn = document.getElementById('startGame11-20');
    const startGame0_20Btn = document.getElementById('startGame0-20');
    
    // --- Botones de volver a jugar ---
    const playAgainBtn1 = document.getElementById('playAgainBtn1');
    const playAgainBtn2 = document.getElementById('playAgainBtn2');
    const playAgainBtn3 = document.getElementById('playAgainBtn3');

    // --- Efectos de sonido ---
    const soundEffectCorrect = 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/Right%20Answer.mp3';
    const soundEffectIncorrect = 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/Wrong%20Answer.mp3';

    // --- Datos y variables de estado del juego ---
    const allGameData = [
        { number: 0, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/00.mp3' },
        { number: 1, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/01.mp3' },
        { number: 2, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/02.mp3' },
        { number: 3, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/03.mp3' },
        { number: 4, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/04.mp3' },
        { number: 5, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/05.mp3' },
        { number: 6, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/06.mp3' },
        { number: 7, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/07.mp3' },
        { number: 8, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/08.mp3' },
        { number: 9, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/09.mp3' },
        { number: 10, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/10.mp3' },
        { number: 11, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/11.mp3' },
        { number: 12, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/12.mp3' },
        { number: 13, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/13.mp3' },
        { number: 14, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/14.mp3' },
        { number: 15, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/15.mp3' },
        { number: 16, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/16.mp3' },
        { number: 17, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/17.mp3' },
        { number: 18, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/18.mp3' },
        { number: 19, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/19.mp3' },
        { number: 20, audio: 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/20.mp3' },
    ];
    
    let currentRoundData = {};
    let isClickable = false;
    let correctCount = 0;
    let incorrectCount = 0;
    const maxRounds = 10;
    let gameDataForMode = [];
    let shuffledGameData = [];
    let nextCountdownInterval;
    let confettiInstance = null; // Variable para mantener la instancia de JSConfetti

    // --- Funciones auxiliares ---
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const displayEmoji = (isCorrect, isLastRound) => {
        if (!isCorrect || isLastRound) return;

        const emoji = document.createElement('div');
        emoji.classList.add('emoji-overlay');
        emoji.textContent = '😊';
        document.body.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 3000); 
    };

    // Función para detener el confeti después de 10 segundos
    const stopConfetti = () => {
        if (confettiInstance) {
            // JSConfetti no tiene un método stop(), así que detenemos la animación manualmente
            // Esto solo funciona si el código de la biblioteca está en el mismo archivo o es accesible.
            // Con el código que te proporcioné, la animación se detiene cuando el canvas se limpia
            // lo que es handled en el resetGame
        }
    };

    // --- Funciones principales del juego ---
    const generateRound = () => {
        clearInterval(nextCountdownInterval);
        nextCountdownEl.textContent = ''; 

        if (shuffledGameData.length === 0) {
            endGame();
            return;
        }
        
        isClickable = true;
        feedback.textContent = '';
        nextBtn.classList.add('hidden');
        optionsContainer.innerHTML = '';

        const correctItem = shuffledGameData.shift();
        currentRoundData.correct = correctItem.number;
        currentRoundData.audio = new Audio(correctItem.audio);

        const incorrectItems = gameDataForMode.filter(item => item.number !== correctItem.number);
        const shuffledIncorrects = shuffleArray(incorrectItems).slice(0, 2); 
        
        const allOptions = [correctItem, ...shuffledIncorrects];
        const shuffledOptions = shuffleArray(allOptions);

        shuffledOptions.forEach(item => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            
            const numberText = document.createElement('span');
            numberText.textContent = item.number;
            numberText.style.fontSize = '3em';
            numberText.style.color = getRandomColor();
            numberText.setAttribute('data-number', item.number);
            
            button.appendChild(numberText);
            button.addEventListener('click', () => handleChoice(item.number, button));
            optionsContainer.appendChild(button);
        });

        playAudioBtn.onclick = () => {
            currentRoundData.audio.play();
        };
    };

    const handleChoice = (selectedNumber, selectedButton) => {
        if (!isClickable) return;

        isClickable = false;
        
        const isCorrect = selectedNumber === currentRoundData.correct;
        const isLastRound = (correctCount + incorrectCount + 1) === maxRounds; 
        
        if (isCorrect) {
            feedback.textContent = '¡Correcto!';
            feedback.style.color = '#4CAF50';
            selectedButton.classList.add('correct');
            const correctAudio = new Audio(soundEffectCorrect);
            correctAudio.play();
            setTimeout(() => {
                correctAudio.pause();
                correctAudio.currentTime = 0;
            }, 3000);
            displayEmoji(true, isLastRound);
            correctCount++;
        } else {
            feedback.textContent = '¡Incorrecto! Intenta de nuevo.';
            feedback.style.color = '#E53935';
            selectedButton.classList.add('incorrect');
            const correctOption = document.querySelector(`.option-btn span[data-number="${currentRoundData.correct}"]`);
            if (correctOption) {
                correctOption.parentNode.classList.add('correct');
            }
            const incorrectAudio = new Audio(soundEffectIncorrect);
            incorrectAudio.play();
            setTimeout(() => {
                incorrectAudio.pause();
                incorrectAudio.currentTime = 0;
            }, 3000);
            displayEmoji(false, isLastRound);
            incorrectCount++;
        }
        
        correctCountEl.textContent = correctCount;
        incorrectCountEl.textContent = incorrectCount;
        nextBtn.classList.remove('hidden');
        
        if (incorrectCount >= 3 || (correctCount + incorrectCount) === maxRounds) {
            endGame();
        } else {
            let nextCountdown = 5;
            nextCountdownEl.textContent = `Siguiente en: ${nextCountdown}`;

            nextCountdownInterval = setInterval(() => {
                nextCountdown--;
                if (nextCountdown >= 0) {
                    nextCountdownEl.textContent = `Siguiente en: ${nextCountdown}`;
                }
                if (nextCountdown <= 0) {
                    clearInterval(nextCountdownInterval);
                    generateRound();
                }
            }, 1000);
        }
    };

    const endGame = () => {
        gameContainer.classList.add('hidden');
        
        let screenToShow;
        
        if (incorrectCount >= 3) {
            screenToShow = gameOverScreen;
        } else if (correctCount === maxRounds) {
            screenToShow = perfectScreen;
            if (typeof JSConfetti !== 'undefined') {
                confettiInstance = new JSConfetti();
                confettiInstance.addConfetti();

                // Detener el confeti después de 10 segundos (10,000 milisegundos)
                setTimeout(() => {
                    if (confettiInstance) {
                        confettiInstance.animationTimer = null;
                        const canvas = confettiInstance.canvas;
                        if (canvas) {
                            canvas.remove();
                        }
                    }
                }, 10000);

            } else {
                console.warn("JSConfetti no está definido. No se puede lanzar confeti.");
            }
        } else {
            screenToShow = wellDoneScreen;
        }
        
        screenToShow.classList.remove('hidden');
    };

    const resetGame = () => {
        gameOverScreen.classList.add('hidden');
        wellDoneScreen.classList.add('hidden');
        perfectScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
        correctCount = 0;
        incorrectCount = 0;
        correctCountEl.textContent = correctCount;
        incorrectCountEl.textContent = incorrectCount;
        clearInterval(nextCountdownInterval);
        nextCountdownEl.textContent = '';
        if (confettiInstance && confettiInstance.canvas) {
            confettiInstance.canvas.remove();
        }
    };

    const startGame = (mode) => {
        switch(mode) {
            case '0-10':
                gameDataForMode = allGameData.slice(0, 11);
                break;
            case '11-20':
                gameDataForMode = allGameData.slice(11, 21);
                break;
            case '0-20':
            default:
                gameDataForMode = allGameData;
                break;
        }
        
        shuffledGameData = shuffleArray([...gameDataForMode]).slice(0, maxRounds);
        
        startScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        generateRound();
    };

    // --- Event Listeners para los botones de inicio ---
    startGame0_10Btn.addEventListener('click', () => startGame('0-10'));
    startGame11_20Btn.addEventListener('click', () => startGame('11-20'));
    startGame0_20Btn.addEventListener('click', () => startGame('0-20'));
    nextBtn.addEventListener('click', () => {
        clearInterval(nextCountdownInterval);
        generateRound();
    });

    // --- Event Listeners para los nuevos botones de volver a jugar ---
    playAgainBtn1.addEventListener('click', resetGame);
    playAgainBtn2.addEventListener('click', resetGame);
    playAgainBtn3.addEventListener('click', resetGame);
});