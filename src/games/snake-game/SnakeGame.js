import Snake from './Snake';
import FeedPoint from './FeedPoint';
import Score from './Score';

export default class SnakeGame {

    constructor(engine) {
        this._engine = engine;
        this._engine.useBorders = false;
        this._handlers = [];
        this._engine.keyboardHandler = this._keyboardHandler.bind(this);
    }

    _keyboardHandler(value) {
        if (this._handlers.length > 0) {
            for (let handler of this._handlers) {
                handler(value);
            }
        }
    }

    _addKeyboardHandler(handler) {
        this._handlers.push(handler);
    }

    configure() {
        this._score = new Score(this._engine);
        this._score.init();
        this._snake = new Snake(this._engine);
        this._addKeyboardHandler(this._snake.keyboardHandler.bind(this._snake));
        this._snake.render();

        let coordinateOfFeedPoint = this._getCoordinateOfFeedPoint();
        this._feedPoint = new FeedPoint(this._engine, coordinateOfFeedPoint.x, coordinateOfFeedPoint.y);
        this._feedPoint.render();
    }

    _calculate() {
        let feedPointCoordinate = this._feedPoint.getCoordinate();
        if (this._snake.isHeaderPoint(feedPointCoordinate)) {
            this._snake.increaseSnakeSize();
            this._score.increaseScore();
            let newFeedPointCoordinate = this._getCoordinateOfFeedPoint();
            this._feedPoint.changePoint(newFeedPointCoordinate.x, newFeedPointCoordinate.y);
        }

        this._snake.move();
    }

    _getCoordinateOfFeedPoint() {
        let point = {};
        do {
            point.x = Math.floor(Math.random() * (this._engine.columnCount));
            point.y = Math.floor(Math.random() * (this._engine.rowCount));
        } while (this._snake.isPointOfBody(point));

        return point;
    }

    render(frameCount, msFromLastFrame) {
        if (frameCount * 3 % 2 === 0) {
            this._calculate();
            this._snake.render();
            this._feedPoint.render();
            this._score.render();
        }
    }
}