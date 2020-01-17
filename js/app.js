const Constant = {
    MAX_HEIGHT: 606,
    MAX_WIDTH: 505,
    COL_UNIT: 101,
    ROW_UNIT: 83,
}

// Enemies our player must avoid
var Enemy = function() {
    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.init();
};

Enemy.prototype.init = function() {
    // set initial location
    this.x = 0; //-Math.floor(Math.random * MAX_WIDTH);
    this.y = 100 * Math.floor(Math.random() * 5);
    // set speed
    this.speed = 100 * (Math.floor(Math.random() * 3) +1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x > Constant.MAX_WIDTH + 100) {
        this.init();
        return;
    }
    this.x = this.x  + (this.speed * dt);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
/*
class Creature {
    constructor() {
        console.log('Creature created');
        this.x = 0;
        this.y = 0;
    }

    update() {
        console.log('update call');
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        console.log('render call');
    }
}
*/
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';
        this.x = Constant.COL_UNIT * Math.floor(Math.random() * 5);
        this.y = Constant.ROW_UNIT * (Math.floor(Math.random() * 2) +4);
        this.isMovePressed = false;
    }

    update() {
        if (!this.isMovePressed)
            return;
        this.x += this.bufferX;
        this.y += this.bufferY;
        this.isMovePressed = false;
    }

    handleInput(allowedKey) {
        
        if (!allowedKey) return;
        
        this.isMovePressed = true;
        this.bufferX = 0;
        this.bufferY = 0;

        switch (allowedKey) {
            case 'left':
                if (this.x - Constant.COL_UNIT >= 0)
                    this.bufferX = -Constant.COL_UNIT;
                break;
            case 'up':
                if (this.y - Constant.ROW_UNIT >= 0)
                    this.bufferY = -Constant.ROW_UNIT;
                break;
            case 'right':
                if (this.x + Constant.COL_UNIT < Constant.MAX_WIDTH)
                    this.bufferX = Constant.COL_UNIT;
                break;
            case 'down':
                if (this.y + Constant.ROW_UNIT < Constant.MAX_HEIGHT - 2 * Constant.ROW_UNIT)
                    this.bufferY = Constant.ROW_UNIT;
                break;  
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const allEnemies = [enemy1, enemy2];
const player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    // e.preventDefault();
    player.handleInput(allowedKeys[e.keyCode]);
});
