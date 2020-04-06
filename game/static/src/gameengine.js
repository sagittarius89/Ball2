class GameEngine {
    #ctx;
    #objects;

    /** @param {CanvasRenderingContext2D} ctx */
    constructor(ctx) {
        /** @member {CanvasRenderingContext2D} */
        this.#ctx = ctx;

        /** @member {GameObjectList} */
        this.#objects = new GameObjectList();

        this.addObject(new Collider());
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
        setTimeout(this.update, 20, this.#ctx, this.#objects, this);
    }

    update(ctx, objects, instance) {
        ctx.clearRect(0, 0, instance.WIDTH, instance.HEIGHT);

        objects.foreach((obj) => {
            obj.update(ctx, objects);
        });

        if (instance.continue)
            setTimeout(instance.update, 20, ctx, objects, instance);
    }

    stop() {
        this.continue = false;
    }
}
