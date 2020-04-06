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
    this.engine.addObject(new Surface(new Vector2d(0, 0), 0, Orientation.HORIZONTAL));
    this.engine.addObject(new Surface(new Vector2d(0, this.engine.HEIGHT), 0, Orientation.HORIZONTAL));
    this.engine.addObject(new Surface(new Vector2d(0, 0), 0, Orientation.VERTICAL));
    this.engine.addObject(new Surface(new Vector2d(this.engine.WIDTH, 0), 0, Orientation.VERTICAL));

    this.engine.addObject(new Ball(this.canvas.width / 2, this.canvas.height / 2, "red"));

    this.engine.addObject(this.inputManager);

    this.engine.start();
}());