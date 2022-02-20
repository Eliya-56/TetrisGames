export default class FeedPoint {
    constructor(engine, x, y) {
        this._engine = engine;
        this.changePoint(x, y);
    }

    changePoint(x, y) {        
        this._x = x;
        this._y = y;
    }

    getCoordinate() {
        return { x: this._x, y: this._y};
    }

    _blink() {
        this._engine.switchField(this._x, this._y);
    }

    render() {
        //this._engine.highlightField(this._x, this._y);
        this._blink();
    }
}