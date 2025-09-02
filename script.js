document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameContainer = document.getElementById('game-container');
    const startButton = document.getElementById('startButton');
    const playAudioBtn = document.getElementById('playAudioBtn');
    const optionsContainer = document.getElementById('options-container');
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('nextBtn');

    // URLs de los efectos de sonido
    const soundEffectCorrect = 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/Right%20Answer.mp3';
    const soundEffectIncorrect = 'https://raw.githubusercontent.com/garciaprieto-jr/los-numeros-0-20---Harry-potter-juego-/garciaprieto-jr-audio/Wrong%20Answer.mp3';

    // Datos del juego: números y audios del 0 al 20
    const gameData = [
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

    // Variables para el conteo de aciertos y errores
    let correctCount = 0;
    let incorrectCount = 0;

    // Obtener los elementos HTML del contador
    const correctCountEl = document.getElementById('correct-count');
    const incorrectCountEl = document.getElementById('incorrect-count');

    // Función para generar un color hexadecimal aleatorio
    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    // Función para mezclar un array
    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    // Función para mostrar el emoji de retroalimentación
    const displayEmoji = (isCorrect) => {
        const emoji = document.createElement('div');
        emoji.classList.add('emoji-overlay');
        emoji.textContent = isCorrect ? '😊' : '😔';
        document.body.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 3000); 
    };

    // Función para generar una nueva ronda de juego
    const generateRound = () => {
        isClickable = true;
        feedback.textContent = '';
        nextBtn.style.display = 'none';
        optionsContainer.innerHTML = '';

        const correctItem = gameData[Math.floor(Math.random() * gameData.length)];
        currentRoundData.correct = correctItem.number;
        currentRoundData.audio = new Audio(correctItem.audio);

        const incorrectItems = gameData.filter(item => item.number !== correctItem.number);
        const shuffledIncorrects = shuffleArray(incorrectItems).slice(0, 3);
        
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

    // Función para manejar la selección del usuario
    const handleChoice = (selectedNumber, selectedButton) => {
        if (!isClickable) return;

        isClickable = false;
        
        const isCorrect = selectedNumber === currentRoundData.correct;
        
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
            displayEmoji(true);
            correctCount++;
            correctCountEl.textContent = correctCount;
        } else {
            feedback.textContent = '¡Incorrecto! Intenta de nuevo.';
            feedback.style.color = '#E53935';
            selectedButton.classList.add('incorrect');
            document.querySelector(`.option-btn span[data-number="${currentRoundData.correct}"]`).parentNode.classList.add('correct');
            const incorrectAudio = new Audio(soundEffectIncorrect);
            incorrectAudio.play();
            setTimeout(() => {
                incorrectAudio.pause();
                incorrectAudio.currentTime = 0;
            }, 3000);
            displayEmoji(false);
            incorrectCount++;
            incorrectCountEl.textContent = incorrectCount;
        }
        
        nextBtn.style.display = 'block';
    };

    // Función para iniciar el juego
    const startGame = () => {
        startScreen.classList.add('hidden');
        gameContainer.classList.remove('hidden');
        generateRound();
    };

    // Event listeners para los botones
    startButton.addEventListener('click', startGame);
    nextBtn.addEventListener('click', generateRound);
});