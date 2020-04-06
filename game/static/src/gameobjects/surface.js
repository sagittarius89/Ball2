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

    get startPoint() { this.#startPoint; }
    get length() { this.#length; }
    get orientation() { this.#orientation; }
}