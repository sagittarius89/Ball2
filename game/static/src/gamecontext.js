const GameContext = (function () {
    this.canvas = document.getElementById("canvas");
    this.canvas.width = document.body.clientWidth - 15;
    this.canvas.height = document.body.clientHeight - 15;

    this.engine = new GameEngine(this.canvas.getContext("2d"));
    this.inputManager = new InputManager();
    this.player = new Player("Player 1");
    this.keyboardInput = new Keyboard();
    this.inputManager.attachPlayer(this.player, this.keyboardInput);
    this.engine.addObject(this.inputManager);

    //roof
    //this.engine.addObject(new Surface(new Vector2d(5, 10), this.engine.WIDTH - 40, Orientation.HORIZONTAL));


    this.engine.addObject(new Surface(new Vector2d(this.engine.WIDTH / 3, this.engine.HEIGHT / 3), this.engine.WIDTH / 3, Orientation.HORIZONTAL));


    //floor
    this.engine.addObject(new Surface(new Vector2d(10, 1000), this.engine.WIDTH, Orientation.HORIZONTAL));

    //left wall
    this.engine.addObject(new Surface(new Vector2d(10, -100000), 101000, Orientation.VERTICAL));

    //right wall
    this.engine.addObject(new Surface(new Vector2d(this.engine.WIDTH, -100000), 101000, Orientation.VERTICAL));

    for (var i = 0; i < 100; ++i) {
        var delta = Math.random() * this.engine.WIDTH;

        if (delta > this.engine.WIDTH * 5 / 6)
            delta = this.engine.WIDTH * 5 / 6;

        var length = Math.random() * (this.engine.WIDTH - delta);

        if (length < this.engine.WIDTH / 6)
            length = this.engine.WIDTH / 6;

        if (length > this.engine.WIDTH / 2)
            length = this.engine.WIDTH / 2;

        if (length + delta > this.engine.WIDTH)
            length = this.engine.WIDTH - delta;

        this.engine.addObject(new Surface(new Vector2d(delta, -i * 300 + 500), length, Orientation.HORIZONTAL));
    }

    this.playerBall = null;
    this.engine.addObject(this.playerBall = new PlayerBall(this.canvas.width / 2, this.canvas.height / 2, "red", this.player));

    this.engine.camera.attachToObject(this.playerBall);

    for (var i = 0; i < 10; ++i)
        this.engine.addObject(new Ball(Math.random() * this.canvas.width, Math.random() * this.canvas.height, "green"));

    this.engine.addObject(this.inputManager);

    this.setInterval(() => {

        if (engine.objects.length < 200)
            engine.addObject(new Ball(canvas.width * Math.random(), playerBall.position.y - 2000, "yellow",
                Math.random() * (Physics.radius * 4)));

        engine.objects.foreach(element => {
            if (element.getProperty(Collider.OBJECT_PROPERTY) &&
                element.getProperty(Collider.OBJECT_PROPERTY)[Collider.SHAPE_PROPERTY] == ColliderShape.CIRCLE &&
                element.position.y > playerBall.position.y + 1000) {

                engine.objects.delete(element);

                console.log(element.position.y, playerBall.position.y)
            }
        });
    }, 750);

    this.engine.start();
}());