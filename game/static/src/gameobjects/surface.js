class Surface extends GameObject {
    #startPoint
    #length
    #orientation

    /**
     * 
     * @param {Vector2d} startPoint 
     * @param {number} length 
     * @param {Orientation} orientation 
     */
    constructor(startPoint, length, orientation) {
        super();

        this.#startPoint = startPoint;
        this.#length = length;
        this.#orientation = orientation;

        this.addProperty(
            Collider.OBJECT_PROPERTY,
            Collider.COLLIDER_OBJECT_DATA(ColliderShape.SURFACE, true)
        );
    }

    get startPoint() { return this.#startPoint; }
    get length() { return this.#length; }
    get orientation() { return this.#orientation; }

    update(ctx, objects) {
        this.render(ctx);
    }

    render(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.#startPoint.x, this.#startPoint.y);
        ctx.lineWidth = 10;

        switch (this.#orientation) {
            case Orientation.HORIZONTAL:
                ctx.lineTo(this.#startPoint.x + this.#length, this.#startPoint.y);
                break;
            case Orientation.VERTICAL:
                ctx.lineTo(this.#startPoint.x, this.#startPoint.y + this.#length);
                break;
        }

        ctx.stroke();
        ctx.closePath();
    }
}