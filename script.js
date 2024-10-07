// Define emoji groups and special emojis
const emojiGroups = [
    // Animals
    ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯'],
    // Fruits
    ['🍎', '🍌', '🍒', '🍇', '🍉', '🥝', '🍍', '🍓', '🍋', '🍑'],
    // Sports
    ['⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓'],
    // Vehicles
    ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑', '🚒', '🚜'],
    // Weather
    ['☀️', '🌤️', '⛅', '🌥️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '❄️'],
    // Food
    ['🍔', '🍟', '🌭', '🍕', '🥪', '🌮', '🌯', '🥗', '🍝', '🍣'],
    // Halloween
    ['🎃', '👻', '🦇', '🍬', '🕷️', '🕸️', '👺', '👹', '💀', '🧛‍♂️'],
    // Christmas
    ['🎄', '🎅', '🧑‍🎄', '❄️', '⛄', '🎁', '🎉', '🔔', '🕯️', '⭐'],
    // Nature
    ['🌳', '🌲', '🌴', '🌵', '🌾', '🍂', '🍃', '🌻', '🌼', '🌸'],
    // Music
    ['🎵', '🎶', '🎤', '🎸', '🎹', '🎻', '🥁', '🎺', '🎷', '🎼'],
    // Occupations
    ['👨‍⚕️', '👩‍⚕️', '👨‍🏫', '👩‍🏫', '👨‍🍳', '👩‍🍳', '👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨'],
    // Technology
    ['💻', '📱', '📞', '📺', '🖥️', '📷', '🎮', '⌚', '🖨️', '🔋'],
    // Plants
    ['🌹', '🌻', '🌼', '🌺', '🌿', '🍀', '🌾', '🍂', '🍃', '🌱'],
    // Sea Creatures
    ['🐠', '🐟', '🐋', '🐙', '🦑', '🐬', '🐚', '🦈', '🐳', '🌊'],
    // Insects
    ['🐝', '🦋', '🐞', '🦗', '🕷️', '🦟', '🪲', '🦠', '🐜', '🐌'],
    // Mythical Creatures
    ['🐉', '🧚‍♀️', '🧜‍♂️', '🦄', '👹', '🧞‍♂️', '🧙‍♀️', '🧚‍♂️', '🦇', '👻'],
    // Emotions
    ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇'],
    // Places
    ['🏠', '🏢', '🏥', '🏖️', '🏞️', '🏜️', '🏝️', '🏙️', '🌆', '🌃'],
    // Tools
    ['🔧', '🔨', '⚙️', '🛠️', '🔩', '🔍', '🧰', '🪛', '⚖️', '🔌']
];


const specialEmojis = {
    bomb: '💣',
    rowClear: '📏',
    columnClear: '📐',
    combo: '✨'
};

// Canvas for particle effects
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Particle class for animations
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 3 + 2;
        this.color = color;
        this.speed = Math.random() * 2 + 1;
        this.angle = Math.random() * 2 * Math.PI;
        this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed
        };
        this.alpha = 1;
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
}

let particlesArray = [];

function handleParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.alpha <= 0) {
            particlesArray.splice(index, 1);
        }
    });
}

function createParticles(x, y, color) {
    for (let i = 0; i < 15; i++) {
        particlesArray.push(new Particle(x, y, color));
    }
}

// Sound effects
const matchSound = new Audio('sounds/match_sound.mp3');
const gameOverSound = new Audio('sounds/game_over.mp3');

// Background music tracks
const bgMusicTracks = [
    new Audio('sounds/bg_music1.mp3'),
    new Audio('sounds/bg_music2.mp3'),
    new Audio('sounds/bg_music3.mp3'),
    new Audio('sounds/bg_music4.mp3'),
    new Audio('sounds/bg_music5.mp3')
];

let currentMusicIndex = 0;

function playBackgroundMusic() {
    bgMusicTracks[currentMusicIndex].volume = 0.5; // Set volume
    bgMusicTracks[currentMusicIndex].play();

    bgMusicTracks[currentMusicIndex].addEventListener('ended', () => {
        currentMusicIndex = (currentMusicIndex + 1) % bgMusicTracks.length;
        playBackgroundMusic();
    });
}

// Game Variables
let numRows = 8; // Keep the number of rows constant
let numCols = 8; // Start with 8 columns
let board = [];
let firstSelection = null;
let score = 0;
let level = 1;
let moves = 30;
let timer = 90;
let gameInterval;
let isAnimating = false;
let comboActive = false;
let powerUpsUnlocked = false;

// Emoji group management
let currentEmojiGroupIndex = -1; // Start with -1 to ensure first group is random
let currentEmojiGroup = [];

// Initialize the game
function init() {
    const gameBoard = document.getElementById('game-board');
    // Start with a random emoji group
    updateEmojiGroup(true);
    board = createBoard();
    renderBoard(gameBoard);
    updateGameInfo();
    startTimer();
    animate();
    playBackgroundMusic(); // Start background music
}

// Update the current emoji group
function updateEmojiGroup(isInitial = false) {
    let previousIndex = currentEmojiGroupIndex;
    do {
        currentEmojiGroupIndex = Math.floor(Math.random() * emojiGroups.length);
    } while (!isInitial && currentEmojiGroupIndex === previousIndex); // Ensure the new group is different from the previous one unless it's the initial call
    currentEmojiGroup = emojiGroups[currentEmojiGroupIndex];
}

// Create a 2D board with random emojis ensuring no initial matches
function createBoard() {
    let newBoard = [];
    for (let row = 0; row < numRows; row++) {
        let currentRow = [];
        for (let col = 0; col < numCols; col++) {
            let emoji;
            do {
                emoji = currentEmojiGroup[Math.floor(Math.random() * currentEmojiGroup.length)];
            } while (
                (col >= 2 && emoji === currentRow[col - 1] && emoji === currentRow[col - 2]) || // horizontal
                (row >= 2 && emoji === newBoard[row - 1][col] && emoji === newBoard[row - 2][col]) || // vertical
                (row >= 2 && col >= 2 && emoji === newBoard[row - 1][col - 1] && emoji === newBoard[row - 2][col - 2]) || // diagonal \
                (row >= 2 && col <= numCols - 3 && emoji === newBoard[row - 1][col + 1] && emoji === newBoard[row - 2][col + 2]) // diagonal /
            );
            currentRow.push(emoji);
        }
        newBoard.push(currentRow);
    }
    return newBoard;
}

// Render the board to the DOM
function renderBoard(gameBoard) {
    gameBoard.innerHTML = '';
    gameBoard.style.width = `${numCols * 80}px`; // Adjust the width based on the number of columns
    board.forEach((row, rowIndex) => {
        row.forEach((emoji, colIndex) => {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.setAttribute('data-row', rowIndex);
            tile.setAttribute('data-col', colIndex);
            tile.innerText = emoji;
            tile.addEventListener('click', handleTileClick);
            gameBoard.appendChild(tile);
        });
    });
}

// Handle tile clicks for swapping
function handleTileClick(e) {
    if (isAnimating) return; // Prevent actions during animations

    const tile = e.target;
    const row = parseInt(tile.getAttribute('data-row'));
    const col = parseInt(tile.getAttribute('data-col'));

    if (!firstSelection) {
        firstSelection = { row, col, element: tile };
        tile.classList.add('selected');
    } else {
        const secondSelection = { row, col, element: tile };
        if (isAdjacent(firstSelection, secondSelection)) {
            swapTiles(firstSelection, secondSelection);
            animateSwap(firstSelection.element, secondSelection.element);
            if (checkMatches()) {
                isAnimating = true;
                setTimeout(() => {
                    processMatches();
                    renderBoard(document.getElementById('game-board'));
                    updateGameInfo();
                    isAnimating = false;
                    if (checkLevelComplete()) {
                        advanceLevel();
                    } else if (moves <= 0 || timer <= 0) {
                        gameOver();
                    }
                }, 600);
            } else {
                // Swap back if no match
                swapTiles(firstSelection, secondSelection);
                animateSwap(secondSelection.element, firstSelection.element);
            }
        }
        firstSelection.element.classList.remove('selected');
        firstSelection = null;
        decrementMove();
    }
}

// Check if two selections are adjacent (including diagonally)
function isAdjacent(sel1, sel2) {
    const dx = Math.abs(sel1.col - sel2.col);
    const dy = Math.abs(sel1.row - sel2.row);
    return (dx === 1 && dy === 0) || (dx === 0 && dy === 1) || (dx === 1 && dy === 1);
}

// Swap two tiles on the board
function swapTiles(sel1, sel2) {
    const temp = board[sel1.row][sel1.col];
    board[sel1.row][sel1.col] = board[sel2.row][sel2.col];
    board[sel2.row][sel2.col] = temp;
}

// Animate swapping of tiles
function animateSwap(tile1, tile2) {
    tile1.classList.add('swapping');
    tile2.classList.add('swapping');
    setTimeout(() => {
        tile1.classList.remove('swapping');
        tile2.classList.remove('swapping');
    }, 300);
}

// Check for any matches on the board
function checkMatches() {
    return findMatches().length > 0;
}

// Find all matched tiles, including diagonal matches
function findMatches() {
    let matched = [];

    // Check horizontal matches
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols - 2; col++) {
            let emoji = board[row][col];
            if (
                emoji &&
                emoji === board[row][col + 1] &&
                emoji === board[row][col + 2]
            ) {
                matched.push({ row, col });
                matched.push({ row, col: col + 1 });
                matched.push({ row, col: col + 2 });
            }
        }
    }

    // Check vertical matches
    for (let col = 0; col < numCols; col++) {
        for (let row = 0; row < numRows - 2; row++) {
            let emoji = board[row][col];
            if (
                emoji &&
                emoji === board[row + 1][col] &&
                emoji === board[row + 2][col]
            ) {
                matched.push({ row, col });
                matched.push({ row: row + 1, col });
                matched.push({ row: row + 2, col });
            }
        }
    }

    // Check diagonal matches (top-left to bottom-right)
    for (let row = 0; row < numRows - 2; row++) {
        for (let col = 0; col < numCols - 2; col++) {
            let emoji = board[row][col];
            if (
                emoji &&
                emoji === board[row + 1][col + 1] &&
                emoji === board[row + 2][col + 2]
            ) {
                matched.push({ row, col });
                matched.push({ row: row + 1, col: col + 1 });
                matched.push({ row: row + 2, col: col + 2 });
            }
        }
    }

    // Check diagonal matches (top-right to bottom-left)
    for (let row = 0; row < numRows - 2; row++) {
        for (let col = 2; col < numCols; col++) {
            let emoji = board[row][col];
            if (
                emoji &&
                emoji === board[row + 1][col - 1] &&
                emoji === board[row + 2][col - 2]
            ) {
                matched.push({ row, col });
                matched.push({ row: row + 1, col: col - 1 });
                matched.push({ row: row + 2, col: col - 2 });
            }
        }
    }

    // Remove duplicates
    matched = matched.filter(
        (v, i, a) => a.findIndex((t) => t.row === v.row && t.col === v.col) === i
    );

    return matched;
}

// Process matched tiles: remove, create special emojis, update score, and trigger animations
function processMatches() {
    const matches = findMatches();
    if (matches.length > 0) {
        matchSound.play(); // Play match sound
    }
    matches.forEach((match) => {
        const { row, col } = match;
        // Check for creating special emojis
        // For simplicity, if 4 in a row horizontally, vertically, or diagonally, create a special emoji
        if (isSpecialMatch(row, col)) {
            board[row][col] = specialEmojis.bomb; // Create a bomb for special match
            createParticles(col * 80 + 40, row * 80 + 40, '#ffa500');
        } else {
            board[row][col] = null;
            createParticles(col * 80 + 40, row * 80 + 40, '#ff69b4');
            score += 10;
        }
    });

    collapseBoard();
    fillBoard();
    if (comboActive) {
        score += 50;
        comboActive = false;
    }

    // Unlock power-ups when score reaches 500
    if (!powerUpsUnlocked && score >= 500) {
        powerUpsUnlocked = true;
        showPowerUpButtons();
    }
}

// Check if the match should create a special emoji
function isSpecialMatch(row, col) {
    let emoji = board[row][col];
    // Check horizontal special match
    if (
        col >= 1 &&
        col <= numCols - 3 &&
        board[row][col - 1] === emoji &&
        board[row][col + 1] === emoji &&
        board[row][col + 2] === emoji
    ) {
        return true;
    }
    // Check vertical special match
    if (
        row >= 1 &&
        row <= numRows - 3 &&
        board[row - 1][col] === emoji &&
        board[row + 1][col] === emoji &&
        board[row + 2][col] === emoji
    ) {
        return true;
    }
    // Check diagonal special match (top-left to bottom-right)
    if (
        row >= 1 &&
        col >= 1 &&
        row <= numRows - 3 &&
        col <= numCols - 3 &&
        board[row - 1][col - 1] === emoji &&
        board[row + 1][col + 1] === emoji &&
        board[row + 2][col + 2] === emoji
    ) {
        return true;
    }
    // Check diagonal special match (top-right to bottom-left)
    if (
        row >= 1 &&
        col >= 2 &&
        row <= numRows - 3 &&
        col <= numCols - 1 &&
        board[row - 1][col + 1] === emoji &&
        board[row + 1][col - 1] === emoji &&
        board[row + 2][col - 2] === emoji
    ) {
        return true;
    }
    return false;
}

// Collapse the board after matches are removed
function collapseBoard() {
    for (let col = 0; col < numCols; col++) {
        let emptySpots = 0;
        for (let row = numRows - 1; row >= 0; row--) {
            if (
                board[row][col] === null ||
                Object.values(specialEmojis).includes(board[row][col])
            ) {
                emptySpots++;
            } else if (emptySpots > 0) {
                board[row + emptySpots][col] = board[row][col];
                board[row][col] = null;
            }
        }
    }
}

// Fill the board with new emojis
function fillBoard() {
    // We do not update the emoji group here to ensure consistency
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (board[row][col] === null) {
                let emoji;
                do {
                    emoji = currentEmojiGroup[Math.floor(Math.random() * currentEmojiGroup.length)];
                } while (
                    (col >= 2 && emoji === board[row][col - 1] && emoji === board[row][col - 2]) || // horizontal
                    (row >= 2 && emoji === board[row - 1][col] && emoji === board[row - 2][col]) || // vertical
                    (row >= 2 && col >= 2 && emoji === board[row - 1][col - 1] && emoji === board[row - 2][col - 2]) || // diagonal \
                    (row >= 2 && col <= numCols - 3 && emoji === board[row - 1][col + 1] && emoji === board[row - 2][col + 2]) // diagonal /
                );
                board[row][col] = emoji;
            }
        }
    }

    // Check recursively for new matches
    if (findMatches().length > 0) {
        processMatches();
    }
}

// Update game information display
function updateGameInfo() {
    document.getElementById('score').innerText = score;
    document.getElementById('level').innerText = level;
    document.getElementById('moves').innerText = moves;
    document.getElementById('timer').innerText = timer;
}

// Decrement move count
function decrementMove() {
    if (moves > 0) {
        moves--;
        updateGameInfo();
    }
}

// Start the countdown timer
function startTimer() {
    gameInterval = setInterval(() => {
        if (timer > 0) {
            timer--;
            updateGameInfo();
        } else {
            clearInterval(gameInterval);
            gameOver();
        }
    }, 1000);
}

// Check if level objectives are met
function checkLevelComplete() {
    const levelThreshold = level * 500;
    return score >= levelThreshold;
}

// Advance to the next level
function advanceLevel() {
    level++;
    moves += 10;
    timer += 90;
    if (numCols < 12) numCols++; // Increase columns up to a maximum
    updateEmojiGroup(); // Change emoji group for the new level
    board = createBoard();
    renderBoard(document.getElementById('game-board'));
    updateGameInfo();
    alert(`🎉 Congratulations! You've reached Level ${level}! 🎉`);
}

// Handle game over
function gameOver() {
    gameOverSound.play(); // Play game over sound
    alert(`😢 Game Over! Your Score: ${score}`);
    resetGame();
}

// Reset the game to initial state
function resetGame() {
    score = 0;
    level = 1;
    moves = 30;
    timer = 90;
    clearInterval(gameInterval);
    powerUpsUnlocked = false; // Reset power-ups
    numRows = 8; // Reset rows
    numCols = 8; // Reset columns
    updateEmojiGroup(true); // Start with a random emoji group
    board = createBoard();
    renderBoard(document.getElementById('game-board'));
    updateGameInfo();
    startTimer();
    hidePowerUpButtons();
}

// Show power-up buttons when unlocked
function showPowerUpButtons() {
    const powerUpsDiv = document.getElementById('power-ups');
    powerUpsDiv.style.display = 'flex';

    // Create power-up buttons
    powerUpsDiv.innerHTML = `
        <button id="shuffle-btn" title="🔄 Shuffle Board">🔄</button>
        <button id="bomb-btn" title="💣 Bomb Power-Up">💣</button>
        <button id="row-btn" title="📏 Clear Row">📏</button>
        <button id="column-btn" title="📐 Clear Column">📐</button>
        <button id="combo-btn" title="✨ Combo Power-Up">✨</button>
    `;

    attachPowerUpEvents();
}

// Hide power-up buttons initially and when resetting
function hidePowerUpButtons() {
    const powerUpsDiv = document.getElementById('power-ups');
    powerUpsDiv.style.display = 'none';
    powerUpsDiv.innerHTML = ''; // Clear the power-ups
}

// Attach power-up button events
function attachPowerUpEvents() {
    document.getElementById('shuffle-btn').addEventListener('click', () => {
        activatePowerUp('shuffle');
    });

    document.getElementById('bomb-btn').addEventListener('click', () => {
        activatePowerUp('bomb');
    });

    document.getElementById('row-btn').addEventListener('click', () => {
        activatePowerUp('rowClear');
    });

    document.getElementById('column-btn').addEventListener('click', () => {
        activatePowerUp('columnClear');
    });

    document.getElementById('combo-btn').addEventListener('click', () => {
        activatePowerUp('combo');
    });
}

// Activate a specific power-up
function activatePowerUp(type) {
    if (isAnimating) return;

    switch (type) {
        case 'shuffle':
            shuffleBoard();
            break;
        case 'bomb':
            activateBomb();
            break;
        case 'rowClear':
            clearRow();
            break;
        case 'columnClear':
            clearColumn();
            break;
        case 'combo':
            activateCombo();
            break;
        default:
            break;
    }
}

// Shuffle the board
function shuffleBoard() {
    // Shuffle using the current emoji group
    let flatBoard = board
        .flat()
        .filter((emoji) => emoji !== null && !Object.values(specialEmojis).includes(emoji));
    for (let i = flatBoard.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [flatBoard[i], flatBoard[j]] = [flatBoard[j], flatBoard[i]];
    }

    // Reassign shuffled emojis to the board
    let index = 0;
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (board[row][col] !== null && !Object.values(specialEmojis).includes(board[row][col])) {
                board[row][col] = flatBoard[index++];
            }
        }
    }

    renderBoard(document.getElementById('game-board'));
    updateGameInfo();
}

// Activate bomb power-up: clear a random tile and its neighbors
function activateBomb() {
    let row = Math.floor(Math.random() * numRows);
    let col = Math.floor(Math.random() * numCols);
    clearAdjacent(row, col);
    score += 50;
    updateGameInfo();
}

// Clear adjacent tiles around a specific tile
function clearAdjacent(row, col) {
    const directions = [
        { r: -1, c: 0 },
        { r: 1, c: 0 },
        { r: 0, c: -1 },
        { r: 0, c: 1 },
        { r: 0, c: 0 },
        { r: -1, c: -1 },
        { r: -1, c: 1 },
        { r: 1, c: -1 },
        { r: 1, c: 1 }
    ];

    directions.forEach((dir) => {
        let newRow = row + dir.r;
        let newCol = col + dir.c;
        if (
            newRow >= 0 &&
            newRow < numRows &&
            newCol >= 0 &&
            newCol < numCols &&
            board[newRow][newCol] !== null
        ) {
            board[newRow][newCol] = null;
            createParticles(newCol * 80 + 40, newRow * 80 + 40, '#ff69b4');
        }
    });

    collapseBoard();
    fillBoard();
}

// Clear an entire row
function clearRow() {
    let row = Math.floor(Math.random() * numRows);
    for (let col = 0; col < numCols; col++) {
        board[row][col] = null;
        createParticles(col * 80 + 40, row * 80 + 40, '#00ced1');
    }
    collapseBoard();
    fillBoard();
    score += 30;
    updateGameInfo();
}

// Clear an entire column
function clearColumn() {
    let col = Math.floor(Math.random() * numCols);
    for (let row = 0; row < numRows; row++) {
        board[row][col] = null;
        createParticles(col * 80 + 40, row * 80 + 40, '#ffa500');
    }
    collapseBoard();
    fillBoard();
    score += 30;
    updateGameInfo();
}

// Activate combo power-up: combines shuffle and bomb
function activateCombo() {
    shuffleBoard();
    activateBomb();
    comboActive = true;
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    handleParticles();
}

// Help Modal Controls
const helpModal = document.getElementById('help-modal');
const openHelpBtn = document.getElementById('open-help');
const closeHelpBtn = document.getElementById('close-help');

openHelpBtn.addEventListener('click', () => {
    helpModal.style.display = 'block';
});

closeHelpBtn.addEventListener('click', () => {
    helpModal.style.display = 'none';
});

// Close modal when clicking outside the content
window.addEventListener('click', (e) => {
    if (e.target == helpModal) {
        helpModal.style.display = 'none';
    }
});

// Start the game
init();
