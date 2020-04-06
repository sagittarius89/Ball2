class GameEngine {
    #ctx;
    #objects;
    #collider

    /** @param {CanvasRenderingContext2D} ctx */
    constructor(ctx) {
        /** @member {CanvasRenderingContext2D} */
        this.#ctx = ctx;

        /** @member {GameObjectList} */
        this.#objects = new GameObjectList();
        this.#collider = new Collider();
    }

    get ctx() { return this.#ctx; }

    /**
     * 
     * @param {GameObject} object 
     */
    addObject(object) {
        this.#objects.push(object);
    }

    get WIDTH() { return this.ctx.canvas.width }
    get HEIGHT() { return this.ctx.canvas.height; }

    start() {
        this.continue = true;

        setTimeout(this.update, 20, this.#ctx, this.#objects, this.#collider, this);
    }

    update(ctx, objects, collider, instance) {
        ctx.clearRect(0, 0, instance.WIDTH, instance.HEIGHT);

        objects.foreach((obj) => {
            obj.update(ctx, objects, collider);
        });

        if (instance.continue)
            setTimeout(instance.update, Physics.framerate, ctx, objects, collider, instance);
    }

    stop() {
        this.continue = false;
    }
}
