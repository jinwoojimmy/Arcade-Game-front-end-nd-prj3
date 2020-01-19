const Constant = {
    MAX_HEIGHT: 606,
    MAX_WIDTH: 505,
    COL_UNIT: 101, // x-axis move unit
    ROW_UNIT: 83, // y-axis move unit 
    CREATURE_HEIGHT: 101 / 2,
    CREATURE_WIDTH: 101,
}

class Creature {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.reset();
    }

    reset() {
    }

    update(dt) {
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

class Enemy extends Creature {
    constructor() {
        super();
        this.sprite = 'images/enemy-bug.png';
    }

    reset() {
        this.x = 0;
        this.y = Constant.ROW_UNIT * (Math.floor(Math.random() * 3) + 1);
        this.speed = 100 * (Math.floor(Math.random() * 3) +1);
    }

    update(dt) {
        if (this.x > Constant.MAX_WIDTH + 100) {
            this.reset();
            return;
        }
        this.x = this.x  + (this.speed * dt);
    }
}

class Player extends Creature {
    constructor() {
        super();
        this.sprite = 'images/char-boy.png';
        this.celebrationSprite = 'images/Selector.png';
        this.isWin = false; 
    }

    reset() {
        this.x = Constant.COL_UNIT * Math.floor(Math.random() * 5);
        this.y = Constant.ROW_UNIT * (Math.floor(Math.random() * 2) +4);
        this.isMovePressed = false;
    }

    update() {
        if (!this.isMovePressed)
            return;
        this.x += this.bufferX;
        this.y += this.bufferY;

        if (this.y === 0)
            this.isWin = true;
        this.isMovePressed = false;
    }

    checkCollide(enemy) {
        if (this.x < enemy.x + Constant.CREATURE_WIDTH
                && this.x > enemy.x - Constant.CREATURE_WIDTH 
                && this.y < enemy.y + Constant.CREATURE_HEIGHT
                && this.y > enemy.y - Constant.CREATURE_HEIGHT)
            this.reset();
    }

    render() {
        super.render();
        if (this.isWin) {
            ctx.drawImage(Resources.get(this.celebrationSprite), this.x, this.y);
        }
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
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const allEnemies = [enemy1, enemy2, enemy3];
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

    player.handleInput(allowedKeys[e.keyCode]);
});
