const ScoreQuant = 10;

export default class Score {
    constructor(engine, scoreQuant = ScoreQuant) {
        this._engine = engine;
        this._score = 0;
        this._quant = scoreQuant;
    }

    init() {
        this.render();
    }

    increaseScore() {
        this._score += this._quant;
    }

    render() {
        this._engine.setHeaderText(`Score: ${this._score}`);
    }
}