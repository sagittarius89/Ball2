class Ball extends GameObject {
    #position;
    #acc;
    #color;
    #radius

    constructor(x, y, color) {
        super();

        /**
         * @member {Vector2d}
         */
        this.#position = new Vector2d(x, y);
        /**
         * @member {Vector2d}
         */
        this.#acc = new Vector2d(0, 0);
        /**
         * @member {String}
         */
        this.#color = color;
        this.#radius = Physics.radius;

        this.addProperty(
            Collider.COLLIDER_OBJECT_PROPERTY,
            Collider.COLLIDER_OBJECT_DATA(ColliderShape.CIRCLE, false)
        );
    }

    get position() { return this.#position; }
    get acc() { return this.#acc; }
    get color() { return this.#color; }
    get radius() { return this.#radius; }

    /**
     * @param {Vector2d} vector
     */
    set position(vector) { this.#position = vector; }

    /**
     * @param {Vector2d} vector
     */
    set acc(vector) { this.#acc = vector; }

    update(ctx, objects) {
        var sign = new Vector2d(this.#acc.x >= 0 ? 1 : -1, this.#acc.y >= 0 ? 1 : -1);
        var accAbs = new Vector2d(Math.abs(this.#acc.x), Math.abs(this.#acc.y));

        this.#acc = this.#acc.add(
            new Vector2d(
                sign.x * Physics.friction * accAbs.x,
                sign.y * Physics.friction * accAbs.y + Physics.grav
            )
        );

        this.#position = this.#position.add(this.#acc);

        this.render(ctx);
    }

    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.lineWidth = 5;
        ctx.strokeStyle = '#003300';
        ctx.stroke();
    }
}