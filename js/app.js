// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Enemy object has a starting point on the x-axis
    // Starting point on the y-axis
    // and a speed
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //enemy moves off canvas, should reset and move again
    // canvas is 550 pixels, resets to just off screen and gives 
    // Enemy object a random speed
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    //check for player collision
    if (player.x < this.x + 60 &&
        player.x + 37 > this.x &&
        player.y < this.y + 25 &&
        30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Works just like the Enemy object but is a Player object
let Player = function(x, y, speed) {
     this.x = x;
     this.y = y;
     this.speed = speed;

    // image sprite for our player (would like to make this selectable at some point)
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Prevent player from moving beyond the canvas walls
    if (this.y > 380) {
        this.y = 380;
    } 

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    //check for player reaching top tile, resets player to beginning if they reach
    if (this.y < 0) {
            this.x = 200;
            this.y = 380;      
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress){
    //sets up listeners for each key press and what they do. 
    //from middle of one square to right or left is about 50 pixels
    // from middle of one square up or down is about 30 pixels
    switch (keyPress){
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
        case 'a':
            this.x -= this.speed + 50;
            break;
        case 'w':
            this.y -= this.speed + 30;
            break;
        case 'd':
            this.x += this.speed + 50;
            break;
        case 's':
            this.y += this.speed + 30;
            break;
        case 'numpad5':
            this.y += this.speed + 30;
            break;
    }
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
let allEnemies = [];
// Sets enemy object position on the Y axis
const enemyPosition = [60,140,220];
// Place the player object in a variable called player
// sets the starting x, y and speed of player object
let player = new Player(200, 380, 50);
let enemy;

//goes throught enemyPosition array, sets starting x-axis at 0
// PosY is set by the array, and speed is random
//pushes enemy variable to Enemy object 
enemyPosition.forEach(function(posY){
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        12: "numpad5",
        65: 'a',
        87: 'w',
        68: 'd',
        83: 's',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
