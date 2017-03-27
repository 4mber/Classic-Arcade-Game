'use strict';


// Enemy Class: Sets image, location, & speed.
var Enemy = function(x, y, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};


// Checks for collisions w/ player.
Enemy.prototype.checkCollision = function() {
        if (
        player.y + 131 >= this.y + 90
        && player.x + 25 <= this.x + 88
        && player.y + 73 <= this.y + 135
        && player.x + 76 >= this.x + 11) {
            player.x = 404;
            player.y = 500;
        }
};


//Enemy Updates:
Enemy.prototype.update = function(dt) {
    // Animates bugs.
    this.x += this.speed*dt;
    // When enemies exit right, they loop back to the left.
    if (this.x >= 805) {
        this.x = -100;
    }
    this.checkCollision();
};


// Enemy Render: Draws enemies on canvas.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player Class: Sets image, location, & speed.
var Player = function(x, y, speed) {
    this.sprite = 'images/char-princess-girl.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};


// Displays:
Player.prototype.displayScore = function(aScore) {
    var canvas = document.getElementsByTagName('canvas');
    scoreDiv.innerHTML = '<strong>Score: </strong>' + aScore;
    document.body.insertBefore(scoreDiv, canvas[0]);
};


// Player Updates:
Player.prototype.update = function(dt) {
    // Keeps player from leaving left, right, or bottom boundaries.
    if (this.y > 500) {
        this.y = 500;
    }
    if (this.x > 802.5) {
        this.x = 802.5;
    }
    if (this.x < 2.5) {
        this.x = 2.5;
    }
    // Resets player to starting point & adds a point each time they reach the water!
    if (this.y + 3 <= 0) {
        this.x = 404;
        this.y = 500;
        score += 1;
    }

    this.displayScore(score);
};


// Player Render: Draws player on canvas & displays score.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// Player Handle Input: Controls player with directional arrow keys.
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed;
    }
    if (keyPress == 'up') {
        this.y -= this.speed - 14;
    }
    if (keyPress == 'right') {
        this.x += this.speed;
    }
    if (keyPress == 'down') {
        this.y += this.speed - 20;
    }
};


// Instantiates Player object:
var player = new Player(404, 500, 100);
// Defines score & scoreDiv variables.
var score = 0;
var scoreDiv = document.createElement('div');


// Instantiates Enemy objects:
// Defines number of enemy bugs on screen at any given time.
var numBugs = 5;
// Creates a random number.
var randomNum = function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Creates an array to instantiate Enemy objects.
var allEnemies = [];
// Randomly and evenly distributes the numBugs between the five rows, and sets a random speed for each row.
for (var i = 0; i < numBugs; i++) {
    if (i % 5 === 0) {
        allEnemies.push(new Enemy(-50, 56, randomNum(100, 400)));
    }
    if (i % 5 == 1) {
        allEnemies.push(new Enemy(-50, 142, randomNum(100, 400)));
    }
    if (i % 5 == 2) {
        allEnemies.push(new Enemy(-50, 225, randomNum(100, 400)));
    }
    if (i % 5 == 3) {
        allEnemies.push(new Enemy(-50, 308, randomNum(100, 400)));
    }
    if (i % 5 == 4) {
        allEnemies.push(new Enemy(-50, 390, randomNum(100, 400)));
    }
}


// Listens for key presses and sends the keys to your Player.handleInput() method.
document.addEventListener('keyup', function(e) {
var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};

player.handleInput(allowedKeys[e.keyCode]);
});
