class PlayerBall extends Ball {
    #player;

    constructor(x, y, color, player) {
        super(x, y, color);

        /** @member {Player} */
        this.#player = player;

        this.addProperty(InputManager.INPUT_LISTENER_PROPERTY, player);
    }

    /**
     * 
     * @param {InputDevice} input 
     */
    notify(input) {
        if (input.isMoveLeft) {
            this.acc = this.acc.add(new Vector2d(-Physics.force, 0));
        }
        if (input.isMoveRight) {
            this.acc = this.acc.add(new Vector2d(Physics.force, 0));
        }
        if (input.isJump) {
            this.acc = this.acc.add(new Vector2d(0, -Physics.force));
        }
        if (input.isMoveDown) {
            this.acc = this.acc.add(new Vector2d(0, Physics.force));
        }
    }
}