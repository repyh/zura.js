window.keys = {};
window.isKeyDown = (key) => {
    return window.keys[key];
}

window.addEventListener('keydown', e => {
    window.keys[e.key] = true;
});

window.addEventListener('keyup', e => {
    window.keys[e.key] = false;
})

class Rectangle {
    constructor(ctx, posX, posY, width, height, physics = false, phyProps) {
        this.ctx = ctx;
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;

        if(phyProps) {
            phyProps.drag *= 0.01;
            this.physics = phyProps
        }
        else this.physics = {
            gravity: 1,
            drag: 1,
            velocityX: 0,
            velocityY: 0
        }

        const temp = this;
        function initAnimation() {
            temp.#clearScreen();
            temp.physics ? temp.physics.velocityY += temp.physics.gravity : 0;
            temp.posY += temp.physics.velocityY;
            ctx.fillRect(temp.posX, temp.posY, temp.width, temp.height);
            requestAnimationFrame(initAnimation);
        }
        initAnimation()

        this.transform = {
            position(newX, newY) {
                this.#clearScreen();
                this.posX = newX;
                this.posY = newY;
                ctx.fillRect(this.posX, this.posY, this.width, this.height);
            }
        }

        if(physics && physics === true) {
            const temp = this;
            this.rigidBody = {
                addForce(x, y) {
                    temp.physics.velocityX = x;
                    temp.physics.velocityY = y*=-1;
                    function doForce() {
                        // temp.#clearScreen();
                        console.log(temp.physics.velocityY, temp.physics.velocityX)
                        if(temp.physics.velocityX === 0 && temp.physics.velocityY === 0) {
                            temp.physics.velocityX = 0;
                            temp.physics.velocityY = 0;
                            temp.ctx.fillRect(temp.posX, temp.posY, temp.width, temp.height);
                            return;
                        }
                        temp.#clearScreen();
                        temp.posX += temp.physics.velocityX;
                        temp.posY += temp.physics.velocityY;

                        if(temp.physics.gravity === 0 && temp.physics.velocityY !== 0) temp.physics.velocityY -= temp.physics.velocityY > 0 ? 1 : -1;
                        temp.physics.velocityX += temp.physics.velocityX === 0 ? 0 : (temp.physics.drag === 0 ? 1 : temp.physics.drag)*(temp.physics.velocityX >= 0 ? -1 : 1);
                        temp.ctx.fillRect(temp.posX, temp.posY, temp.width, temp.height);
                        requestAnimationFrame(doForce)
                    }
                    doForce();
                }
            }
        }
    }

    #clearScreen() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}

class Zura {
    constructor(ctx, screenSizeX, screenSizeY, Update) {
        this.ctx = ctx;
        this.ctx.canvas.width = screenSizeX;
        this.ctx.canvas.height = screenSizeY;
        if(Update) {
            function doUpdate() {
                Update();
                requestAnimationFrame(doUpdate);
            }
            doUpdate();
        }
    }
    clearScreen() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}