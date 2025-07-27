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
        
        // Ensure the emoji group is valid and has content
        if (!this.state.currentEmojiGroup || this.state.currentEmojiGroup.length === 0) {
            console.warn('Invalid emoji group, using fallback');
            this.state.currentEmojiGroup = emojiGroups[0]; // Fallback to first group
        }
        
        console.log('Current emoji group:', this.state.currentEmojiGroupIndex, this.state.currentEmojiGroup);
    }

    createBoard() {
        let newBoard = [];
        
        // Ensure we have a valid emoji group
        if (!this.state.currentEmojiGroup || this.state.currentEmojiGroup.length === 0) {
            this.updateEmojiGroup(true);
        }
        
        for (let row = 0; row < 8; row++) {
            let currentRow = [];
            for (let col = 0; col < 8; col++) {
                let emoji;
                let attempts = 0;
                const maxAttempts = 50;
                
                do {
                    emoji = this.state.currentEmojiGroup[Math.floor(Math.random() * this.state.currentEmojiGroup.length)];
                    attempts++;
                } while (
                    attempts < maxAttempts && (
                        (col >= 2 && emoji === currentRow[col - 1] && emoji === currentRow[col - 2]) ||
                        (row >= 2 && emoji === newBoard[row - 1][col] && emoji === newBoard[row - 2][col]) ||
                        (row >= 2 && col >= 2 && emoji === newBoard[row - 1][col - 1] && emoji === newBoard[row - 2][col - 2]) ||
                        (row >= 2 && col < 6 && emoji === newBoard[row - 1][col + 1] && emoji === newBoard[row - 2][col + 2])
                    )
                );
                
                // Ensure we have a valid emoji
                if (!emoji) {
                    emoji = this.state.currentEmojiGroup[0];
                }
                
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
                
                // Ensure we have a valid emoji, use fallback if needed
                const displayEmoji = emoji && emoji !== null ? emoji : '❓';
                tile.innerText = displayEmoji;
                
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
                
                // Check for matches after swap
                const hasMatches = this.checkMatches();
                
                if (hasMatches) {
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
                    // No matches, swap back
                    setTimeout(() => {
                        this.swapTiles(this.state.firstSelection, secondSelection);
                        this.animateSwap(secondSelection.element, this.state.firstSelection.element);
                    }, 400);
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
        // Allow horizontal, vertical, and diagonal adjacent movement
        return (dx === 1 && dy === 0) || (dx === 0 && dy === 1) || (dx === 1 && dy === 1);
    }

    swapTiles(sel1, sel2) {
        const temp = this.state.board[sel1.row][sel1.col];
        this.state.board[sel1.row][sel1.col] = this.state.board[sel2.row][sel2.col];
        this.state.board[sel2.row][sel2.col] = temp;
    }

    animateSwap(tile1, tile2) {
        tile1.classList.add('swapping');
        tile2.classList.add('swapping');
        
        // Enhanced swap animation with diagonal support
        const dx = Math.abs(parseInt(tile1.getAttribute('data-col')) - parseInt(tile2.getAttribute('data-col')));
        const dy = Math.abs(parseInt(tile1.getAttribute('data-row')) - parseInt(tile2.getAttribute('data-row')));
        
        if (dx === 1 && dy === 1) {
            // Diagonal swap animation
            tile1.style.transform = 'scale(1.1) rotate(15deg)';
            tile2.style.transform = 'scale(1.1) rotate(-15deg)';
        } else {
            // Horizontal/vertical swap animation
            tile1.style.transform = 'scale(1.1) rotate(5deg)';
            tile2.style.transform = 'scale(1.1) rotate(-5deg)';
        }
        
        setTimeout(() => {
            tile1.classList.remove('swapping');
            tile2.classList.remove('swapping');
            tile1.style.transform = '';
            tile2.style.transform = '';
        }, 400);
    }

    checkMatches() {
        const matches = this.findMatches();
        return matches.length > 0;
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

        // Check diagonal matches (top-left to bottom-right)
        for (let row = 0; row < 6; row++) {
            for (let col = 0; col < 6; col++) {
                let emoji = this.state.board[row][col];
                if (emoji && emoji === this.state.board[row + 1][col + 1] && emoji === this.state.board[row + 2][col + 2]) {
                    matched.push({ row, col });
                    matched.push({ row: row + 1, col: col + 1 });
                    matched.push({ row: row + 2, col: col + 2 });
                }
            }
        }

        // Check diagonal matches (top-right to bottom-left)
        for (let row = 0; row < 6; row++) {
            for (let col = 2; col < 8; col++) {
                let emoji = this.state.board[row][col];
                if (emoji && emoji === this.state.board[row + 1][col - 1] && emoji === this.state.board[row + 2][col - 2]) {
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

        console.log('Found matches:', matched);
        return matched;
    }

    processMatches() {
        const matches = this.findMatches();
        if (matches.length > 0) {
            if (this.state.soundEnabled) {
                this.sounds.match.play().catch(e => console.log('Sound play blocked'));
            }
        }

        matches.forEach((match, index) => {
            const { row, col } = match;
            this.state.board[row][col] = null;
            
            // Enhanced particle effects with delay for cascade effect
            setTimeout(() => {
                this.createParticles(col * 80 + 40, row * 80 + 40, '#ff69b4');
            }, index * 50);
            
            // Calculate score based on match length
            const matchLength = matches.filter(m => m.row === row && m.col === col).length;
            const baseScore = matchLength * 10;
            const comboBonus = this.state.comboMultiplier * 5;
            this.state.score += baseScore + comboBonus;
            this.state.matchesMade++;
        });

        this.state.comboMultiplier++;
        
        // Enhanced collapse and fill with smooth animations
        setTimeout(() => {
            this.collapseBoard();
            setTimeout(() => {
                this.fillBoard();
            }, 200);
        }, 300);
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
        // Ensure we have a valid emoji group
        if (!this.state.currentEmojiGroup || this.state.currentEmojiGroup.length === 0) {
            this.updateEmojiGroup(true);
        }
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                if (this.state.board[row][col] === null) {
                    let emoji;
                    let attempts = 0;
                    const maxAttempts = 50;
                    
                    do {
                        emoji = this.state.currentEmojiGroup[Math.floor(Math.random() * this.state.currentEmojiGroup.length)];
                        attempts++;
                    } while (
                        attempts < maxAttempts && (
                            (col >= 2 && emoji === this.state.board[row][col - 1] && emoji === this.state.board[row][col - 2]) ||
                            (row >= 2 && emoji === this.state.board[row - 1][col] && emoji === this.state.board[row - 2][col]) ||
                            (row >= 2 && col >= 2 && emoji === this.state.board[row - 1][col - 1] && emoji === this.state.board[row - 2][col - 2]) ||
                            (row >= 2 && col < 6 && emoji === this.state.board[row - 1][col + 1] && emoji === this.state.board[row - 2][col + 2])
                        )
                    );
                    
                    // Ensure we have a valid emoji
                    if (!emoji) {
                        emoji = this.state.currentEmojiGroup[0];
                    }
                    
                    this.state.board[row][col] = emoji;
                }
            }
        }

        if (this.findMatches().length > 0) {
            setTimeout(() => this.processMatches(), 200);
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
        for (let i = 0; i < 20; i++) {
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
        this.radius = Math.random() * 4 + 2;
        this.color = color;
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * 2 * Math.PI;
        this.velocity = {
            x: Math.cos(this.angle) * this.speed,
            y: Math.sin(this.angle) * this.speed
        };
        this.alpha = 1;
        this.gravity = 0.1;
        this.friction = 0.98;
        this.life = 1;
        this.decay = 0.02;
    }

    update() {
        this.velocity.x *= this.friction;
        this.velocity.y += this.gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.life -= this.decay;
        this.alpha = this.life;
        this.radius *= 0.99;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        
        // Add glow effect
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
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

// Validate emoji groups
console.log('Emoji groups loaded:', emojiGroups.length);
emojiGroups.forEach((group, index) => {
    if (!group || group.length === 0) {
        console.warn(`Empty emoji group at index ${index}`);
    }
});

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