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
    this.engine.addObject(new Surface(new Vector2d(5, 10), this.engine.WIDTH - 40, Orientation.HORIZONTAL));


    this.engine.addObject(new Surface(new Vector2d(this.engine.WIDTH / 3, this.engine.HEIGHT / 3), this.engine.WIDTH / 3, Orientation.HORIZONTAL));


    //floor
    this.engine.addObject(new Surface(new Vector2d(10, this.engine.HEIGHT - 15), this.engine.WIDTH - 55, Orientation.HORIZONTAL));

    //left wall
    this.engine.addObject(new Surface(new Vector2d(10, 10), this.engine.HEIGHT - 20, Orientation.VERTICAL));

    //right wall
    this.engine.addObject(new Surface(new Vector2d(this.engine.WIDTH - 40, 10), this.engine.HEIGHT - 20, Orientation.VERTICAL));

    this.engine.addObject(new PlayerBall(this.canvas.width / 2, this.canvas.height / 2, "red", this.player));


    for (var i = 0; i < 10; ++i)
        this.engine.addObject(new Ball(Math.random() * this.canvas.width, Math.random() * this.canvas.height, "green"));

    this.engine.addObject(this.inputManager);

    this.engine.start();
}());