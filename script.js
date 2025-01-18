const gameBoard = document.getElementById('game-board');
const newGameButton = document.getElementById('new-game');
const moveCountElement = document.getElementById('move-count');
const timeTakenElement = document.getElementById('time-taken');
const congratulationsMessage = document.getElementById('congratulations');

let cards = [];
let flippedCards = [];
let moves = 0;
let timer;
let time = 0;
let matches = 0;

function createCard(image) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = image;

    const img = document.createElement('img');
    img.src = `images/${image}`;
    card.appendChild(img);

    card.addEventListener('click', () => flipCard(card));
    return card;
}

function startGame() {
    moves = 0;
    time = 0;
    matches = 0;
    flippedCards = [];
    clearInterval(timer);
    moveCountElement.textContent = moves;
    timeTakenElement.textContent = time;
    congratulationsMessage.style.display = 'none';

    const images = Array.from({ length: 18 }, (_, i) => `image${i + 1}.png`);
    const gameImages = [...images, ...images]; // Duplicate images for pairs
    shuffleArray(gameImages);

    gameBoard.innerHTML = '';
    cards = gameImages.map(image => createCard(image));
    cards.forEach(card => gameBoard.appendChild(card));

    timer = setInterval(() => {
        time++;
        timeTakenElement.textContent = time;
    }, 1000);
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('hidden')) {
        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            moveCountElement.textContent = moves;
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.image === card2.dataset.image) {
        setTimeout(() => {
            card1.classList.add('hidden');
            card2.classList.add('hidden');
            flippedCards = [];
            matches++;

            if (matches === 18) {
                clearInterval(timer);
                congratulationsMessage.style.display = 'block';
            }
        }, 500);
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

newGameButton.addEventListener('click', startGame);

// Start the game on page load
startGame();
