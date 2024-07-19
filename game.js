// Iteration 1: Declare variables required for this game
let gameTime = 60;
let playerLives = 5;
let playerScore = 0;
let missedZombies = 0;
let gameTimer;
let activeZombie;

// Iteration 1.2: Add shotgun sound
const shootSound = new Audio('./assets/shotgun.wav');

// Iteration 1.3: Add background sound
const bgMusic = new Audio('./assets/bgm.mp3');
bgMusic.loop = true;

// Iteration 1.4: Add lives
const livesElement = document.getElementById('lives');

// Iteration 2: Write a function to make a zombie
function generateZombie() {
    const zombie = document.createElement('img');
    zombie.src = './assets/zombie-1.png';
    zombie.className = 'zombie-image';
    zombie.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
    zombie.style.bottom = '0px'; // Start from bottom of the screen
    zombie.style.position = 'absolute';
    zombie.onclick = function() {
        shootSound.play();
        removeZombie(zombie);
        playerScore++;
        missedZombies = 0; // Reset missed shots counter
        generateZombie();
    };
    document.body.appendChild(zombie);
    activeZombie = zombie;

    // Animate zombie movement
    animateZombie(zombie);
}

// Animate zombie movement upwards
function animateZombie(zombie) {
    let bottomPosition = 0;
    const moveInterval = setInterval(() => {
        bottomPosition += 5; // Adjust speed as needed
        zombie.style.bottom = `${bottomPosition}px`;
        if (parseInt(zombie.style.bottom) > window.innerHeight) {
            clearInterval(moveInterval);
            assessMissedZombie();
        }
    }, 100);
}

// Iteration 3: Write a function to check if the player missed a zombie
function assessMissedZombie() {
    if (parseInt(activeZombie.style.bottom) > window.innerHeight) {
        removeZombie(activeZombie);
        missedZombies++;
        updateLives();
        if (missedZombies >= 5) {
            endGame();
        } else {
            generateZombie();
        }
    }
}

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function removeZombie(zombie) {
    zombie.remove();
}

// Iteration 5: Creating timer
function startGameTimer() {
    gameTimer = setInterval(() => {
        gameTime--;
        document.getElementById('timer').innerText = gameTime;
        if (gameTime <= 0) {
            clearInterval(gameTimer);
            endGame();
        }
    }, 1000);
}

// Iteration 6: Write a code to start the game by calling the first zombie
function startGame() {
    bgMusic.play();
    startGameTimer();
    generateZombie();
}

// Iteration 7: Write the helper function to get random integer
function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

// Helper function to update lives display
function updateLives() {
    livesElement.style.width = `${(playerLives / 5) * 100}%`;
}

// Function to handle game over
function endGame() {
    bgMusic.pause();
    alert('Game Over!'); // Show a message or redirect to game over page
    location.href = 'game-over.html';
}

// Start the game when the page loads
window.onload = startGame;
