// script.js

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
    ['☀️', '🌤️', '🌪️', '☔', '🌦️', '🌧️', '🌈', '🌩️', '❄️', '🌫️'],
    // Food
    ['🍔', '🍟', '🌭', '🍕', '🥪', '🌮', '🌯', '🥗', '🍝', '🍣'],
    // Halloween
    ['🎃', '👻', '🕸️', '🕷️', '🧙', '🧛', '🧟', '💀', '🪦', '🦇'],
    // Christmas
    ['🎄', '🎅', '🤶', '🦌', '⛪', '🌟', '🧦', '❄️', '🎁', '🕯️'],
    // Fantasy Creatures
    ['🧚', '🧞', '🧜', '🦄', '🐉', '🦹', '🧙', '🧛', '👹', '🧝'],
    // Aliens & Space
    ['👽', '🛸', '🚀', '🪐', '☄️', '🌌', '🌠', '👾', '🛰️', '🌍'],
    // Jungle Adventure
    ['🦁', '🐍', '🦜', '🐒', '🐘', '🐆', '🌴', '🪲', '🍃', '🌺'],
    // Mystical Symbols
    ['🔮', '🧿', '♾️', '☯️', '⚛️', '☮️', '✡️', '🔱', '♈', '♉'],
    // Emojis of Emotion
    ['😄', '😂', '😭', '😡', '😱', '😴', '🥳', '😜', '🤔', '😇'],
    // Household Items
    ['🛏️', '🚪', '🧹', '🛁', '🔑', '💡', '🖼️', '🖨️', '📱', '🖥️'],
    // Transportation (Air & Sea)
    ['✈️', '🚁', '🛫', '🚢', '⛴️', '🛥️', '🛳️', '🛶', '🛩️', '⛵'],
    // Farm Life
    ['🐓', '🐄', '🐖', '🌽', '🚜', '👨‍🌾', '🐑', '🐐', '🌾', '🥚'],
    // Under the Sea
    ['🐠', '🐟', '🐡', '🐙', '🦑', '🐬', '🦈', '🦀', '🐚', '🌊'],
    // Insects
    ['🐞', '🦋', '🐜', '🐝', '🦟', '🪰', '🪳', '🕷️', '🪲', '🦗'],
    // Time & Clocks
    ['⏰', '⏳', '⌚', '🕛', '🕑', '🕔', '🕙', '🕡', '⏱️', '🕰️'],
    // Magic Spells & Potions
    ['🪄', '💫', '🧪', '✨', '🔥', '🍄', '🧉', '⚗️', '🕯️', '🔮'],
    // Music & Instruments
    ['🎸', '🎺', '🎻', '🥁', '🎷', '🎹', '🎤', '📯', '🎼', '🎧'],
    // Beach Day
    ['🏖️', '🌞', '🌴', '🏄', '⛱️', '🍹', '🏊', '🤿', '🦀', '🌊'],
    // Camping
    ['🏕️', '🔥', '🎒', '⛺', '🌌', '🧭', '🗻', '🛶', '🪓', '🌲'],
    // Farm Harvest
    ['🌽', '🍅', '🥔', '🥕', '🌾', '🥒', '🍆', '🧄', '🍠', '🌻'],
    // Books & Writing
    ['📖', '✏️', '📚', '📜', '🖋️', '📓', '📆', '🗒️', '✒️', '📄'],
    // Science Lab
    ['🧬', '🔬', '⚗️', '🧫', '🧪', '🔭', '🩺', '📡', '🧲', '🧪'],
    // Family
    ['👨‍👩‍👧', '👨‍👩‍👦', '👩‍👩‍👧', '👨‍👨‍👧', '👶', '👴', '👵', '👦', '👧', '👩'],
    // Holidays & Celebrations
    ['🎉', '🎊', '🎈', '🎆', '🎇', '🎍', '🎏', '🎂', '🥂', '🍾'],
    // Winter Sports
    ['🏂', '⛷️', '⛸️', '🏒', '🏑', '🥌', '🏉', '🏋️', '🚴', '🤽'],
    // Tech & Gadgets
    ['💻', '⌨️', '🖱️', '📱', '🎧', '🖨️', '📷', '🎥', '📺', '💽'],
    // Travel Essentials
    ['🧳', '📍', '🗺️', '🌏', '🏕️', '🏨', '🚘', '🚌', '🚖', '✈️'],
    // Fashion & Accessories
    ['👗', '👕', '👖', '👔', '👠', '🎩', '👓', '💍', '👜', '👒'],
    // Jobs & Professions
    ['👨‍⚕️', '👩‍🏫', '👨‍🔧', '👩‍🚒', '👨‍🚀', '👩‍⚖️', '👩‍🍳', '👨‍✈️', '👩‍🔬', '👨‍🎤'],
    // Urban Life
    ['🏙️', '🏢', '🏬', '🏦', '🏪', '🏛️', '🚋', '🏥', '🏨', '🚇'],
    // Outdoor Adventures
    ['🧗', '⛷️', '🏌️', '🏄', '🧗‍♂️', '🎣', '🚵', '🚣', '🏕️', '🌄'],
    // Gardening
    ['🌱', '🌷', '🌼', '🌹', '🌿', '🍀', '🍂', '🍁', '🪴', '🌻'],
    // Pirates
    ['🏴‍☠️', '⚓', '🦜', '🏝️', '🗡️', '🚤', '⛵', '🍻', '💀', '👑'],
    // Around the House
    ['🍽️', '🛋️', '🖼️', '🚪', '🔑', '🛏️', '📺', '💡', '🔨', '🛁'],
    // Day & Night
    ['🌞', '🌜', '🌚', '🌕', '🌒', '🌝', '🌛', '🌌', '🌅', '🌇'],
    // Party
    ['🎈', '🎉', '🎂', '🍾', '🎶', '🍸', '🎤', '🎬', '🥳', '🥂'],
    // Transportation (Trains & Tracks)
    ['🚂', '🚆', '🚈', '🚞', '🚝', '🚋', '🚉', '🚎', '🚅', '🚄'],
    // Carnival & Circus
    ['🎡', '🎠', '🎢', '🤹', '🎭', '🎪', '🎨', '🧵', '🎟️', '🎬'],
    // Dinosaurs & Prehistoric Life
    ['🦕', '🦖', '🦣', '🦤', '🌋', '🪨', '🦎', '🐊', '🌿', '🦈'],
    // Zodiac Signs
    ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑'],
    // Board Games & Puzzles
    ['🎲', '♟️', '🧩', '🎯', '🃏', '🎴', '♔', '♕', '♖', '♗'],
    // Superheroes
    ['🦸‍♂️', '🦸‍♀️', '🦹‍♂️', '🦹‍♀️', '⚡', '🛡️', '🗡️', '🦇', '🕸️', '💥'],
    // Baking & Desserts
    ['🍰', '🎂', '🧁', '🍩', '🍪', '🍨', '🍧', '🍦', '🍫', '🥧'],
    // Landmarks
    ['🗽', '🗼', '🗿', '🕌', '🏰', '🏯', '⛩️', '🕋', '🌉', '🌁'],
    // Medical & Health
    ['⚕️', '💉', '💊', '🩺', '🏥', '🩹', '🩸', '🩻', '🤒', '🤕'],
    // Martial Arts
    ['🥋', '🥊', '🥷', '⚔️', '🗡️', '🛡️', '💪', '🤼', '🦵', '🦶'],
    // Desert Life
    ['🐪', '🐫', '🦂', '🦎', '🌵', '🐍', '🏜️', '☀️', '🦅', '🥵'],
    // Birds
    ['🦅', '🦉', '🐧', '🦆', '🦢', '🦜', '🕊️', '🐓', '🐦', '🦩'],
    // Emojis with Hearts
    ['❤️', '💔', '💕', '💖', '😍', '😘', '😻', '💓', '💗', '💘'],
    // Robots & AI
    ['🤖', '🦾', '🦿', '👾', '⚙️', '💻', '📡', '🛰️', '🧠', '🕹️'],
    // Animals of the Arctic
    ['🐧', '🐻‍❄️', '🦭', '🐋', '🐳', '🐟', '❄️', '🌨️', '🧊', '🐙'],
    // Emojis with Hats
    ['🎩', '🎓', '👒', '🧢', '👑', '⛑️', '🎅', '🤠', '🥷', '🧙‍♂️'],
    // Emojis with Glasses
    ['🤓', '😎', '🕶️', '👓', '🧐', '🥽', '🥸', '👨‍🏫', '👩‍🏫', '🧑‍🏫'],
    // Royalty & Nobility
    ['👑', '🤴', '👸', '🏰', '🛡️', '⚔️', '🏇', '💍', '🫅', '🫄'],
    // Office Life
    ['💼', '🖨️', '🖥️', '🗂️', '📊', '📈', '📉', '📋', '📝', '📎'],
    // Baby & Kids
    ['👶', '🚼', '🍼', '🧸', '👧', '🧒', '🧑‍🍼', '🚸', '🛝', '🎒'],
    // Wedding
    ['💍', '💒', '👰', '🤵', '💐', '🎂', '💌', '💑', '🥂', '🎉'],
    // Colors
    ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤', '⬛'],
    // Law & Order
    ['👮', '👨‍⚖️', '👩‍⚖️', '⚖️', '🔒', '🚓', '🚔', '🏛️', '🧑‍⚖️', '🛡️'],
    // In the Kitchen
    ['🍽️', '🍴', '🍳', '🥄', '🥢', '🍚', '🧂', '🔪', '🥣', '🥤'],
    // Emoji Hands
    ['👍', '👎', '👋', '✋', '🤚', '🖐️', '🖖', '🤟', '🤘', '✌️'],
    // Animals with Wings
    ['🦅', '🦉', '🕊️', '🦜', '🐦', '🐧', '🐝', '🦋', '🦇', '🦢'],
    // Drinks & Beverages
    ['🍺', '🍻', '🍷', '🍸', '🍹', '🥤', '🍵', '☕', '🥛', '🍾'],
    // Shapes
    ['🔶', '🔷', '🔺', '🔻', '⬛', '⬜', '◾', '◽', '⚫', '⚪'],
   
    // Emoji Letters & Symbols
    ['❤️', '⭐', '✨', '💥', '🔥', '❄️', '💧', '🌟', '🎶', '🌀'],
];



// Canvas for particle effects
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

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

// Function to play background music with random track selection
function playBackgroundMusic() {
    // Select a random track index each time
    currentMusicIndex = Math.floor(Math.random() * bgMusicTracks.length);
    const currentTrack = bgMusicTracks[currentMusicIndex];
    currentTrack.volume = 0.5;
    
    const playPromise = currentTrack.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('Background music is playing.');
        }).catch(error => {
            console.error('Background music playback failed:', error);
        });
    }

    // Set up event listener to play the next random track when the current one ends
    currentTrack.addEventListener('ended', playBackgroundMusic);
}


// Game Variables
let numRows = 8;
let numCols = 8;
let board = [];
let firstSelection = null;
let score = 0;
let level = 1;
let moves = 30;
let timer = 120;
let gameInterval;
let isAnimating = false;

// Emoji group management
let currentEmojiGroupIndex = -1;
let currentEmojiGroup = [];

// Initialize the game
function init() {
    const gameBoard = document.getElementById('game-board');
    updateEmojiGroup(true);
    board = createBoard();
    renderBoard(gameBoard);
    updateGameInfo();
    startTimer();
    animate();
    // Removed playBackgroundMusic() from here to comply with autoplay policies
}

// Update the current emoji group
function updateEmojiGroup(isInitial = false) {
    let previousIndex = currentEmojiGroupIndex;
    do {
        currentEmojiGroupIndex = Math.floor(Math.random() * emojiGroups.length);
    } while (!isInitial && currentEmojiGroupIndex === previousIndex);
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
                (col >= 2 && emoji === currentRow[col - 1] && emoji === currentRow[col - 2]) ||
                (row >= 2 && emoji === newBoard[row - 1][col] && emoji === newBoard[row - 2][col])
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
    gameBoard.style.width = `${numCols * 80}px`;
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
    if (isAnimating) return;

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
                swapTiles(firstSelection, secondSelection);
                animateSwap(secondSelection.element, firstSelection.element);
            }
        }
        firstSelection.element.classList.remove('selected');
        firstSelection = null;
        decrementMove();
    }
}

// Check if two selections are adjacent
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

// Find all matched tiles
function findMatches() {
    let matched = [];

    // Check horizontal matches
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols - 2; col++) {
            let emoji = board[row][col];
            if (emoji && emoji === board[row][col + 1] && emoji === board[row][col + 2]) {
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
            if (emoji && emoji === board[row + 1][col] && emoji === board[row + 2][col]) {
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
            if (emoji && emoji === board[row + 1][col + 1] && emoji === board[row + 2][col + 2]) {
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
            if (emoji && emoji === board[row + 1][col - 1] && emoji === board[row + 2][col - 2]) {
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

// Process matched tiles
function processMatches() {
    const matches = findMatches();
    if (matches.length > 0) {
        matchSound.play();
    }
    matches.forEach((match) => {
        const { row, col } = match;
        board[row][col] = null;
        createParticles(col * 80 + 40, row * 80 + 40, '#ff69b4');
        score += 10;
    });

    collapseBoard();
    fillBoard();
}

function collapseBoard() {
    for (let col = 0; col < numCols; col++) {
        let emptySpots = 0;
        for (let row = numRows - 1; row >= 0; row--) {
            if (board[row][col] === null) {
                emptySpots++;
            } else if (emptySpots > 0) {
                board[row + emptySpots][col] = board[row][col];
                board[row][col] = null;
            }
        }
    }
}

function fillBoard() {
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < numCols; col++) {
            if (board[row][col] === null) {
                let emoji;
                do {
                    emoji = currentEmojiGroup[Math.floor(Math.random() * currentEmojiGroup.length)];
                } while (
                    (col >= 2 && emoji === board[row][col - 1] && emoji === board[row][col - 2]) ||
                    (row >= 2 && emoji === board[row - 1][col] && emoji === board[row - 2][col])
                );
                board[row][col] = emoji;
            }
        }
    }

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

function advanceLevel() {
    level++;
    moves += 10;
    timer = level <= 2 ? 120 : level <= 4 ? 90 : 60;
    updateEmojiGroup();
    board = createBoard();
    renderBoard(document.getElementById('game-board'));
    updateGameInfo();
    alert(`🎉 Congratulations! You've reached Level ${level}! 🎉`);
}

// Handle game over
function gameOver() {
    gameOverSound.play();
    alert(`😢 Game Over! Your Score: ${score}`);
    resetGame();
}

// Reset the game to initial state
function resetGame() {
    score = 0;
    level = 1;
    moves = 30;
    timer = 120;
    clearInterval(gameInterval);
    numRows = 8;
    numCols = 8;
    updateEmojiGroup(true);
    board = createBoard();
    renderBoard(document.getElementById('game-board'));
    updateGameInfo();
    startTimer();
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

// Particle animation loop
function animate() {
    requestAnimationFrame(animate);
    handleParticles();
}

// Start button functionality
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
    playBackgroundMusic();
    init(); // Initialize the game after starting music
    startButton.style.display = 'none'; // Hide the start button after clicking
});

// ===== GAME STATE MANAGEMENT =====
class GameState {
    constructor() {
        this.isPlaying = false;
        this.isPaused = false;
        this.isGameOver = false;
        this.score = 0;
        this.level = 1;
        this.moves = 30;
        this.timer = 90;
        this.matchesMade = 0;
        this.comboMultiplier = 1;
        this.soundEnabled = true;
        this.currentEmojiGroupIndex = -1;
        this.currentEmojiGroup = [];
        this.board = [];
        this.firstSelection = null;
        this.isAnimating = false;
        this.gameInterval = null;
        this.particlesArray = [];
    }

    reset() {
        this.isPlaying = false;
        this.isPaused = false;
        this.isGameOver = false;
        this.score = 0;
        this.level = 1;
        this.moves = 30;
        this.timer = 90;
        this.matchesMade = 0;
        this.comboMultiplier = 1;
        this.firstSelection = null;
        this.isAnimating = false;
        this.clearInterval();
    }

    clearInterval() {
        if (this.gameInterval) {
            clearInterval(this.gameInterval);
            this.gameInterval = null;
        }
    }
}

// ===== GAME MANAGER =====
class GameManager {
    constructor() {
        this.state = new GameState();
        this.canvas = document.getElementById('particle-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.setupEventListeners();
        this.loadAssets();
    }

    setupCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }

    setupEventListeners() {
        // Start button
        document.getElementById('start-button').addEventListener('click', () => {
            this.startGame();
        });

        // Tutorial button
        document.getElementById('tutorial-button').addEventListener('click', () => {
            this.showTutorial();
        });

        // Help button
        document.getElementById('help-button').addEventListener('click', () => {
            this.showTutorial();
        });

        // Game controls
        document.getElementById('pause-button').addEventListener('click', () => {
            this.togglePause();
        });

        document.getElementById('restart-button').addEventListener('click', () => {
            this.restartGame();
        });

        document.getElementById('sound-toggle').addEventListener('click', () => {
            this.toggleSound();
        });

        // Modal controls
        document.getElementById('close-tutorial').addEventListener('click', () => {
            this.hideModal('tutorial-modal');
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            this.hideModal('game-over-modal');
            this.restartGame();
        });

        document.getElementById('share-score-btn').addEventListener('click', () => {
            this.shareScore();
        });

        document.getElementById('resume-btn').addEventListener('click', () => {
            this.resumeGame();
        });

        document.getElementById('restart-pause-btn').addEventListener('click', () => {
            this.hideModal('pause-modal');
            this.restartGame();
        });

        // Close modals when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.state.isPlaying) {
                this.togglePause();
            }
            if (e.key === 'r' && this.state.isPlaying) {
                this.restartGame();
            }
        });
    }

    loadAssets() {
        // Sound effects
        this.sounds = {
            match: new Audio('sounds/match_sound.mp3'),
            gameOver: new Audio('sounds/game_over.mp3'),
            bgMusic: [
                new Audio('sounds/bg_music1.mp3'),
                new Audio('sounds/bg_music2.mp3'),
                new Audio('sounds/bg_music3.mp3'),
                new Audio('sounds/bg_music4.mp3'),
                new Audio('sounds/bg_music5.mp3')
            ]
        };

        this.currentMusicIndex = 0;
        this.setupBackgroundMusic();
    }

    setupBackgroundMusic() {
        this.sounds.bgMusic.forEach(track => {
            track.volume = 0.3;
            track.loop = false;
        });

        this.sounds.bgMusic[0].addEventListener('ended', () => {
            this.playNextTrack();
        });
    }

    playNextTrack() {
        this.currentMusicIndex = (this.currentMusicIndex + 1) % this.sounds.bgMusic.length;
        const currentTrack = this.sounds.bgMusic[this.currentMusicIndex];
        
        if (this.state.soundEnabled && this.state.isPlaying) {
            currentTrack.play().catch(e => console.log('Background music autoplay blocked'));
        }
    }

    startGame() {
        this.hideLoadingScreen();
        this.showGameBoard();
        this.state.isPlaying = true;
        this.initGame();
        
        if (this.state.soundEnabled) {
            this.sounds.bgMusic[0].play().catch(e => console.log('Background music autoplay blocked'));
        }
    }

    hideLoadingScreen() {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
    }

    showGameBoard() {
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-board-container').style.display = 'block';
    }

    initGame() {
        this.updateEmojiGroup(true);
        this.state.board = this.createBoard();
        this.renderBoard();
        this.updateGameInfo();
        this.startTimer();
        this.animate();
    }

    updateEmojiGroup(isInitial = false) {
        let previousIndex = this.state.currentEmojiGroupIndex;
        do {
            this.state.currentEmojiGroupIndex = Math.floor(Math.random() * emojiGroups.length);
        } while (!isInitial && this.state.currentEmojiGroupIndex === previousIndex);
        this.state.currentEmojiGroup = emojiGroups[this.state.currentEmojiGroupIndex];
    }

    createBoard() {
        let newBoard = [];
        for (let row = 0; row < 8; row++) {
            let currentRow = [];
            for (let col = 0; col < 8; col++) {
                let emoji;
                do {
                    emoji = this.state.currentEmojiGroup[Math.floor(Math.random() * this.state.currentEmojiGroup.length)];
                } while (
                    (col >= 2 && emoji === currentRow[col - 1] && emoji === currentRow[col - 2]) ||
                    (row >= 2 && emoji === newBoard[row - 1][col] && emoji === newBoard[row - 2][col])
                );
                currentRow.push(emoji);
            }
            newBoard.push(currentRow);
        }
        return newBoard;
    }

    renderBoard() {
        const gameBoard = document.getElementById('game-board');
        gameBoard.innerHTML = '';
        
        this.state.board.forEach((row, rowIndex) => {
            row.forEach((emoji, colIndex) => {
                const tile = document.createElement('div');
                tile.classList.add('tile');
                tile.setAttribute('data-row', rowIndex);
                tile.setAttribute('data-col', colIndex);
                tile.innerText = emoji;
                tile.addEventListener('click', (e) => this.handleTileClick(e));
                gameBoard.appendChild(tile);
            });
        });
    }

    handleTileClick(e) {
        if (this.state.isAnimating || this.state.isPaused || this.state.isGameOver) return;

        const tile = e.target;
        const row = parseInt(tile.getAttribute('data-row'));
        const col = parseInt(tile.getAttribute('data-col'));

        if (!this.state.firstSelection) {
            this.state.firstSelection = { row, col, element: tile };
            tile.classList.add('selected');
        } else {
            const secondSelection = { row, col, element: tile };
            if (this.isAdjacent(this.state.firstSelection, secondSelection)) {
                this.swapTiles(this.state.firstSelection, secondSelection);
                this.animateSwap(this.state.firstSelection.element, secondSelection.element);
                
                if (this.checkMatches()) {
                    this.state.isAnimating = true;
                    setTimeout(() => {
                        this.processMatches();
                        this.renderBoard();
                        this.updateGameInfo();
                        this.state.isAnimating = false;
                        
                        if (this.checkLevelComplete()) {
                            this.advanceLevel();
                        } else if (this.state.moves <= 0 || this.state.timer <= 0) {
                            this.gameOver();
                        }
                    }, 600);
                } else {
                    this.swapTiles(this.state.firstSelection, secondSelection);
                    this.animateSwap(secondSelection.element, this.state.firstSelection.element);
                }
            }
            this.state.firstSelection.element.classList.remove('selected');
            this.state.firstSelection = null;
            this.decrementMove();
        }
    }

    isAdjacent(sel1, sel2) {
        const dx = Math.abs(sel1.col - sel2.col);
        const dy = Math.abs(sel1.row - sel2.row);
        return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
    }

    swapTiles(sel1, sel2) {
        const temp = this.state.board[sel1.row][sel1.col];
        this.state.board[sel1.row][sel1.col] = this.state.board[sel2.row][sel2.col];
        this.state.board[sel2.row][sel2.col] = temp;
    }

    animateSwap(tile1, tile2) {
        tile1.classList.add('swapping');
        tile2.classList.add('swapping');
        setTimeout(() => {
            tile1.classList.remove('swapping');
            tile2.classList.remove('swapping');
        }, 300);
    }

    checkMatches() {
        return this.findMatches().length > 0;
    }

    findMatches() {
        let matched = [];

        // Check horizontal matches
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 6; col++) {
                let emoji = this.state.board[row][col];
                if (emoji && emoji === this.state.board[row][col + 1] && emoji === this.state.board[row][col + 2]) {
                    matched.push({ row, col });
                    matched.push({ row, col: col + 1 });
                    matched.push({ row, col: col + 2 });
                }
            }
        }

        // Check vertical matches
        for (let col = 0; col < 8; col++) {
            for (let row = 0; row < 6; row++) {
                let emoji = this.state.board[row][col];
                if (emoji && emoji === this.state.board[row + 1][col] && emoji === this.state.board[row + 2][col]) {
                    matched.push({ row, col });
                    matched.push({ row: row + 1, col });
                    matched.push({ row: row + 2, col });
                }
            }
        }

        // Remove duplicates
        matched = matched.filter(
            (v, i, a) => a.findIndex((t) => t.row === v.row && t.col === v.col) === i
        );

        return matched;
    }

    processMatches() {
        const matches = this.findMatches();
        if (matches.length > 0) {
            if (this.state.soundEnabled) {
                this.sounds.match.play().catch(e => console.log('Sound play blocked'));
            }
        }

        matches.forEach((match) => {
            const { row, col } = match;
            this.state.board[row][col] = null;
            this.createParticles(col * 80 + 40, row * 80 + 40, '#ff69b4');
            
            // Calculate score based on match length
            const matchLength = matches.filter(m => m.row === row && m.col === col).length;
            const baseScore = matchLength * 10;
            const comboBonus = this.state.comboMultiplier * 5;
            this.state.score += baseScore + comboBonus;
            this.state.matchesMade++;
        });

        this.state.comboMultiplier++;
        this.collapseBoard();
        this.fillBoard();
    }

    collapseBoard() {
        for (let col = 0; col < 8; col++) {
            let emptySpots = 0;
            for (let row = 7; row >= 0; row--) {
                if (this.state.board[row][col] === null) {
                    emptySpots++;
                } else if (emptySpots > 0) {
                    this.state.board[row + emptySpots][col] = this.state.board[row][col];
                    this.state.board[row][col] = null;
                }
            }
        }
    }

    fillBoard() {
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.state.board[row][col] === null) {
                    let emoji;
                    do {
                        emoji = this.state.currentEmojiGroup[Math.floor(Math.random() * this.state.currentEmojiGroup.length)];
                    } while (
                        (col >= 2 && emoji === this.state.board[row][col - 1] && emoji === this.state.board[row][col - 2]) ||
                        (row >= 2 && emoji === this.state.board[row - 1][col] && emoji === this.state.board[row - 2][col])
                    );
                    this.state.board[row][col] = emoji;
                }
            }
        }

        if (this.findMatches().length > 0) {
            setTimeout(() => this.processMatches(), 300);
        } else {
            this.state.comboMultiplier = 1;
        }
    }

    updateGameInfo() {
        document.getElementById('score').innerText = this.state.score;
        document.getElementById('level').innerText = this.state.level;
        document.getElementById('moves').innerText = this.state.moves;
        document.getElementById('timer').innerText = this.state.timer;
    }

    decrementMove() {
        if (this.state.moves > 0) {
            this.state.moves--;
            this.updateGameInfo();
        }
    }

    startTimer() {
        this.state.clearInterval();
        this.state.gameInterval = setInterval(() => {
            if (this.state.timer > 0 && !this.state.isPaused) {
                this.state.timer--;
                this.updateGameInfo();
            } else if (this.state.timer <= 0) {
                this.state.clearInterval();
                this.gameOver();
            }
        }, 1000);
    }

    checkLevelComplete() {
        const levelThreshold = this.state.level * 500;
        return this.state.score >= levelThreshold;
    }

    advanceLevel() {
        this.state.level++;
        this.state.moves += 10;
        this.state.timer = this.state.level <= 2 ? 120 : this.state.level <= 4 ? 90 : 60;
        this.updateEmojiGroup();
        this.state.board = this.createBoard();
        this.renderBoard();
        this.updateGameInfo();
        
        // Show level up notification
        this.showNotification(`🎉 Level ${this.state.level}! 🎉`, 'success');
    }

    gameOver() {
        this.state.isGameOver = true;
        this.state.clearInterval();
        
        if (this.state.soundEnabled) {
            this.sounds.gameOver.play().catch(e => console.log('Sound play blocked'));
        }

        this.showGameOverModal();
    }

    showGameOverModal() {
        document.getElementById('final-score').innerText = this.state.score;
        document.getElementById('final-level').innerText = this.state.level;
        document.getElementById('final-matches').innerText = this.state.matchesMade;
        
        const title = this.state.score > 1000 ? 'Amazing Score!' : 
                     this.state.score > 500 ? 'Great Job!' : 'Good Try!';
        document.getElementById('game-over-title').innerText = title;
        
        this.showModal('game-over-modal');
    }

    restartGame() {
        this.state.reset();
        this.updateEmojiGroup(true);
        this.state.board = this.createBoard();
        this.renderBoard();
        this.updateGameInfo();
        this.startTimer();
        this.hideModal('pause-modal');
        this.hideModal('game-over-modal');
    }

    togglePause() {
        if (!this.state.isPlaying || this.state.isGameOver) return;
        
        this.state.isPaused = !this.state.isPaused;
        
        if (this.state.isPaused) {
            this.showModal('pause-modal');
        } else {
            this.hideModal('pause-modal');
        }
    }

    resumeGame() {
        this.state.isPaused = false;
        this.hideModal('pause-modal');
    }

    toggleSound() {
        this.state.soundEnabled = !this.state.soundEnabled;
        const soundBtn = document.getElementById('sound-toggle');
        soundBtn.innerHTML = this.state.soundEnabled ? 
            '<span class="btn-icon">🔊</span>' : 
            '<span class="btn-icon">🔇</span>';
        
        if (!this.state.soundEnabled) {
            this.sounds.bgMusic.forEach(track => track.pause());
        } else if (this.state.isPlaying) {
            this.sounds.bgMusic[0].play().catch(e => console.log('Sound play blocked'));
        }
    }

    showTutorial() {
        this.showModal('tutorial-modal');
    }

    showModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    hideModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }

    shareScore() {
        const text = `I scored ${this.state.score} points in CrazyLand! Can you beat my score? 🎮`;
        const url = window.location.href;
        
        if (navigator.share) {
            navigator.share({
                title: 'CrazyLand Score',
                text: text,
                url: url
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(`${text}\n${url}`).then(() => {
                this.showNotification('Score copied to clipboard! 📋', 'success');
            });
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Particle system
    createParticles(x, y, color) {
        for (let i = 0; i < 15; i++) {
            this.state.particlesArray.push(new Particle(x, y, color));
        }
    }

    handleParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.state.particlesArray.forEach((particle, index) => {
            particle.update();
            particle.draw(this.ctx);
            if (particle.alpha <= 0) {
                this.state.particlesArray.splice(index, 1);
            }
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.handleParticles();
    }
}

// ===== PARTICLE CLASS =====
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

    draw(ctx) {
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

// ===== EMOJI GROUPS =====
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
    ['☀️', '🌤️', '🌪️', '☔', '🌦️', '🌧️', '🌈', '🌩️', '❄️', '🌫️'],
    // Food
    ['🍔', '🍟', '🌭', '🍕', '🥪', '🌮', '🌯', '🥗', '🍝', '🍣'],
    // Halloween
    ['🎃', '👻', '🕸️', '🕷️', '🧙', '🧛', '🧟', '💀', '🪦', '🦇'],
    // Christmas
    ['🎄', '🎅', '🤶', '🦌', '⛪', '🌟', '🧦', '❄️', '🎁', '🕯️'],
    // Fantasy Creatures
    ['🧚', '🧞', '🧜', '🦄', '🐉', '🦹', '🧙', '🧛', '👹', '🧝'],
    // Aliens & Space
    ['👽', '🛸', '🚀', '🪐', '☄️', '🌌', '🌠', '👾', '🛰️', '🌍'],
    // Jungle Adventure
    ['🦁', '🐍', '🦜', '🐒', '🐘', '🐆', '🌴', '🪲', '🍃', '🌺'],
    // Mystical Symbols
    ['🔮', '🧿', '♾️', '☯️', '⚛️', '☮️', '✡️', '🔱', '♈', '♉'],
    // Emojis of Emotion
    ['😄', '😂', '😭', '😡', '😱', '😴', '🥳', '😜', '🤔', '😇'],
    // Household Items
    ['🛏️', '🚪', '🧹', '🛁', '🔑', '💡', '🖼️', '🖨️', '📱', '🖥️'],
    // Transportation (Air & Sea)
    ['✈️', '🚁', '🛫', '🚢', '⛴️', '🛥️', '🛳️', '🛶', '🛩️', '⛵'],
    // Farm Life
    ['🐓', '🐄', '🐖', '🌽', '🚜', '👨‍🌾', '🐑', '🐐', '🌾', '🥚'],
    // Under the Sea
    ['🐠', '🐟', '🐡', '🐙', '🦑', '🐬', '🦈', '🦀', '🐚', '🌊'],
    // Insects
    ['🐞', '🦋', '🐜', '🐝', '🦟', '🪰', '🪳', '🕷️', '🪲', '🦗'],
    // Time & Clocks
    ['⏰', '⏳', '⌚', '🕛', '🕑', '🕔', '🕙', '🕡', '⏱️', '🕰️'],
    // Magic Spells & Potions
    ['🪄', '💫', '🧪', '✨', '🔥', '🍄', '🧉', '⚗️', '🕯️', '🔮'],
    // Music & Instruments
    ['🎸', '🎺', '🎻', '🥁', '🎷', '🎹', '🎤', '📯', '🎼', '🎧'],
    // Beach Day
    ['🏖️', '🌞', '🌴', '🏄', '⛱️', '🍹', '🏊', '🤿', '🦀', '🌊'],
    // Camping
    ['🏕️', '🔥', '🎒', '⛺', '🌌', '🧭', '🗻', '🛶', '🪓', '🌲'],
    // Farm Harvest
    ['🌽', '🍅', '🥔', '🥕', '🌾', '🥒', '🍆', '🧄', '🍠', '🌻'],
    // Books & Writing
    ['📖', '✏️', '📚', '📜', '🖋️', '📓', '📆', '🗒️', '✒️', '📄'],
    // Science Lab
    ['🧬', '🔬', '⚗️', '🧫', '🧪', '🔭', '🩺', '📡', '🧲', '🧪'],
    // Family
    ['👨‍👩‍👧', '👨‍👩‍👦', '👩‍👩‍👧', '👨‍👨‍👧', '👶', '👴', '👵', '👦', '👧', '👩'],
    // Holidays & Celebrations
    ['🎉', '🎊', '🎈', '🎆', '🎇', '🎍', '🎏', '🎂', '🥂', '🍾'],
    // Winter Sports
    ['🏂', '⛷️', '⛸️', '🏒', '🏑', '🥌', '🏉', '🏋️', '🚴', '🤽'],
    // Tech & Gadgets
    ['💻', '⌨️', '🖱️', '📱', '🎧', '🖨️', '📷', '🎥', '📺', '💽'],
    // Travel Essentials
    ['🧳', '📍', '🗺️', '🌏', '🏕️', '🏨', '🚘', '🚌', '🚖', '✈️'],
    // Fashion & Accessories
    ['👗', '👕', '👖', '👔', '👠', '🎩', '👓', '💍', '👜', '👒'],
    // Jobs & Professions
    ['👨‍⚕️', '👩‍🏫', '👨‍🔧', '👩‍🚒', '👨‍🚀', '👩‍⚖️', '👩‍🍳', '👨‍✈️', '👩‍🔬', '👨‍🎤'],
    // Urban Life
    ['🏙️', '🏢', '🏬', '🏦', '🏪', '🏛️', '🚋', '🏥', '🏨', '🚇'],
    // Outdoor Adventures
    ['🧗', '⛷️', '🏌️', '🏄', '🧗‍♂️', '🎣', '🚵', '🚣', '🏕️', '🌄'],
    // Gardening
    ['🌱', '🌷', '🌼', '🌹', '🌿', '🍀', '🍂', '🍁', '🪴', '🌻'],
    // Pirates
    ['🏴‍☠️', '⚓', '🦜', '🏝️', '🗡️', '🚤', '⛵', '🍻', '💀', '👑'],
    // Around the House
    ['🍽️', '🛋️', '🖼️', '🚪', '🔑', '🛏️', '📺', '💡', '🔨', '🛁'],
    // Day & Night
    ['🌞', '🌜', '🌚', '🌕', '🌒', '🌝', '🌛', '🌌', '🌅', '🌇'],
    // Party
    ['🎈', '🎉', '🎂', '🍾', '🎶', '🍸', '🎤', '🎬', '🥳', '🥂'],
    // Transportation (Trains & Tracks)
    ['🚂', '🚆', '🚈', '🚞', '🚝', '🚋', '🚉', '🚎', '🚅', '🚄'],
    // Carnival & Circus
    ['🎡', '🎠', '🎢', '🤹', '🎭', '🎪', '🎨', '🧵', '🎟️', '🎬'],
    // Dinosaurs & Prehistoric Life
    ['🦕', '🦖', '🦣', '🦤', '🌋', '🪨', '🦎', '🐊', '🌿', '🦈'],
    // Zodiac Signs
    ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑'],
    // Board Games & Puzzles
    ['🎲', '♟️', '🧩', '🎯', '🃏', '🎴', '♔', '♕', '♖', '♗'],
    // Superheroes
    ['🦸‍♂️', '🦸‍♀️', '🦹‍♂️', '🦹‍♀️', '⚡', '🛡️', '🗡️', '🦇', '🕸️', '💥'],
    // Baking & Desserts
    ['🍰', '🎂', '🧁', '🍩', '🍪', '🍨', '🍧', '🍦', '🍫', '🥧'],
    // Landmarks
    ['🗽', '🗼', '🗿', '🕌', '🏰', '🏯', '⛩️', '🕋', '🌉', '🌁'],
    // Medical & Health
    ['⚕️', '💉', '💊', '🩺', '🏥', '🩹', '🩸', '🩻', '🤒', '🤕'],
    // Martial Arts
    ['🥋', '🥊', '🥷', '⚔️', '🗡️', '🛡️', '💪', '🤼', '🦵', '🦶'],
    // Desert Life
    ['🐪', '🐫', '🦂', '🦎', '🌵', '🐍', '🏜️', '☀️', '🦅', '🥵'],
    // Birds
    ['🦅', '🦉', '🐧', '🦆', '🦢', '🦜', '🕊️', '🐓', '🐦', '🦩'],
    // Emojis with Hearts
    ['❤️', '💔', '💕', '💖', '😍', '😘', '😻', '💓', '💗', '💘'],
    // Robots & AI
    ['🤖', '🦾', '🦿', '👾', '⚙️', '💻', '📡', '🛰️', '🧠', '🕹️'],
    // Animals of the Arctic
    ['🐧', '🐻‍❄️', '🦭', '🐋', '🐳', '🐟', '❄️', '🌨️', '🧊', '🐙'],
    // Emojis with Hats
    ['🎩', '🎓', '👒', '🧢', '👑', '⛑️', '🎅', '🤠', '🥷', '🧙‍♂️'],
    // Emojis with Glasses
    ['🤓', '😎', '🕶️', '👓', '🧐', '🥽', '🥸', '👨‍🏫', '👩‍🏫', '🧑‍🏫'],
    // Royalty & Nobility
    ['👑', '🤴', '👸', '🏰', '🛡️', '⚔️', '🏇', '💍', '🫅', '🫄'],
    // Office Life
    ['💼', '🖨️', '🖥️', '🗂️', '📊', '📈', '📉', '📋', '📝', '📎'],
    // Baby & Kids
    ['👶', '🚼', '🍼', '🧸', '👧', '🧒', '🧑‍🍼', '🚸', '🛝', '🎒'],
    // Wedding
    ['💍', '💒', '👰', '🤵', '💐', '🎂', '💌', '💑', '🥂', '🎉'],
    // Colors
    ['🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫', '⚪', '🟤', '⬛'],
    // Law & Order
    ['👮', '👨‍⚖️', '👩‍⚖️', '⚖️', '🔒', '🚓', '🚔', '🏛️', '🧑‍⚖️', '🛡️'],
    // In the Kitchen
    ['🍽️', '🍴', '🍳', '🥄', '🥢', '🍚', '🧂', '🔪', '🥣', '🥤'],
    // Emoji Hands
    ['👍', '👎', '👋', '✋', '🤚', '🖐️', '🖖', '🤟', '🤘', '✌️'],
    // Animals with Wings
    ['🦅', '🦉', '🕊️', '🦜', '🐦', '🐧', '🐝', '🦋', '🦇', '🦢'],
    // Drinks & Beverages
    ['🍺', '🍻', '🍷', '🍸', '🍹', '🥤', '🍵', '☕', '🥛', '🍾'],
    // Shapes
    ['🔶', '🔷', '🔺', '🔻', '⬛', '⬜', '◾', '◽', '⚫', '⚪'],
   
    // Emoji Letters & Symbols
    ['❤️', '⭐', '✨', '💥', '🔥', '❄️', '💧', '🌟', '🎶', '🌀'],
];

// ===== INITIALIZE GAME =====
document.addEventListener('DOMContentLoaded', () => {
    // Add notification styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-glass);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: var(--radius-lg);
            padding: var(--spacing-md) var(--spacing-lg);
            color: var(--text-primary);
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left: 4px solid var(--success-color);
        }
        
        .notification-info {
            border-left: 4px solid var(--primary-color);
        }
        
        .notification-warning {
            border-left: 4px solid var(--warning-color);
        }
        
        .notification-error {
            border-left: 4px solid var(--error-color);
        }
    `;
    document.head.appendChild(style);

    // Initialize the game
    window.gameManager = new GameManager();
    
    // Simulate loading
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('game-container').style.display = 'flex';
    }, 2000);
});
