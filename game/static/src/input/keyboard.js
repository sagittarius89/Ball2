class Keyboard extends InputDevice {
    #keyLeft;
    #keyUp;
    #keyRight;
    #keyDown;
    #keyFire;
    #keysState;

    constructor() {
        super();

        this.#keyLeft = 37;
        this.#keyUp = 38;
        this.#keyRight = 39;
        this.#keyDown = 40;
        this.#keyFire = -1;
        this.#keysState = {};

        var instance = this;

        onkeydown = onkeyup = function (e) {
            e = e || event; // to deal with IE
            instance.keysState[e.keyCode] = e.type == 'keydown';
        }
    }

    get keysState() { return this.#keysState; }

    get isJump() {
        return this.#keysState[this.#keyLeft];
    }
    get isMoveRight() {
        return this.#keysState[this.#keyUp];
    }
    get isMoveLeft() {
        return this.#keysState[this.#keyRight];
    }
    get isMoveDown() {
        return this.#keysState[this.#keyDown];
    }
    get isFire() {
        return this.#keysState[this.#keyFire];
    }

    set jump(keycode) {
        this.#keyLeft = keycode;
    }
    set moveRight(keycode) {
        this.#keyUp = keycode;
    }
    set moveLeft(keycode) {
        this.#keyRight = keycode;
    }
    set moveDown(keycode) {
        this.#keyDown = keycode;
    }
    set fire(keycode) {
        this.#keysState = keycode;
    }
}