const StartLength = 4;
const UpDirection = 0;
const RightDirection = 1;
const DownDirection = 2;
const LeftDirection = 3;

export default class Snake {
    constructor(engine) {
        this._engine = engine;
        this._bodyPoints = [];
        this._pointsToTurnOff = [];

        this._width = engine.columnCount;
        this._height = engine.rowCount;


        this._snakeCrushed = false;
        this._needToIncreaseSnakeSize = false;
        this._length = StartLength;
        this._direction = RightDirection;
        this._directionChanged = false;
        this._startPoint = { x: StartLength - 1, y: 0 };
        this._buildInitialBody();
    }

    _buildInitialBody() {
        for (let i = StartLength - 1; i >= 0; i--) {
            this._bodyPoints.push({ x: this._startPoint.x - i, y: this._startPoint.y });
        }
    }

    get snakeCrushed() {
        return this._snakeCrushed;
    }

    keyboardHandler(value) {
        if (this._directionChanged) {
            return;
        }

        switch (value.keyCode) {
            case 37:
                if (this._direction == RightDirection) {
                    break;
                }
                this._direction = LeftDirection;
                this._directionChanged = true;
                break;
            case 38:
                if (this._direction == DownDirection) {
                    break;
                }
                this._direction = UpDirection;
                this._directionChanged = true;
                break;
            case 39:
                if (this._direction == LeftDirection) {
                    break;
                }
                this._direction = RightDirection;
                this._directionChanged = true;
                break;
            case 40:
                if (this._direction == UpDirection) {
                    break;
                }
                this._direction = DownDirection;
                this._directionChanged = true;
                break;
        }
    }

    increaseSnakeSize() {
        this._needToIncreaseSnakeSize = true;
    }

    move() {
        switch (this._direction) {
            case UpDirection:
                this._moveUp();
                break;
            case LeftDirection:
                this._moveLeft();
                break;
            case DownDirection:
                this._moveDown();
                break;
            case RightDirection:
                this._moveRight();
                break;
        }
    }

    isPointOfBody(startPoint) {
        for (let i = 0; i < this._bodyPoints.length; i++) {
            if (this._bodyPoints[i].x === startPoint.x && this._bodyPoints[i].y === startPoint.y) {
                return true;
            }
        }

        return false;
    }

    isHeaderPoint(point) {
        if (this._bodyPoints[this._bodyPoints.length - 1].x === point.x && this._bodyPoints[this._bodyPoints.length - 1].y === point.y) {
            return true;
        }

        return false;
    }

    _moveBody(x, y) {
        this._startPoint = { x, y };

        if (this.isPointOfBody(this._startPoint)) {
            this._snakeCrushed = true;
            return;
        }

        this._bodyPoints.push(this._startPoint);

        if (!this._needToIncreaseSnakeSize) {
            let pointToTurnOff = this._bodyPoints.shift()
            this._pointsToTurnOff.push(pointToTurnOff);
        }
        else {
            this._needToIncreaseSnakeSize = false;
        }
    }

    _moveUp() {
        let nextX = this._startPoint.x;
        let nextY = this._startPoint.y === 0 ? this._height - 1 : this._startPoint.y - 1;
        this._moveBody(nextX, nextY);
    }

    _moveLeft() {
        let nextX = this._startPoint.x === 0 ? this._width - 1 : this._startPoint.x - 1;
        let nextY = this._startPoint.y;
        this._moveBody(nextX, nextY);
    }

    _moveDown() {
        let nextX = this._startPoint.x;
        let nextY = this._startPoint.y === this._height - 1 ? 0 : this._startPoint.y + 1;
        this._moveBody(nextX, nextY);
    }

    _moveRight() {
        let nextX = this._startPoint.x === this._width - 1 ? 0 : this._startPoint.x + 1;
        let nextY = this._startPoint.y;
        this._moveBody(nextX, nextY);
    }

    render() {
        if (this._snakeCrushed) {
            return;
        }

        for (let point of this._pointsToTurnOff) {
            this._engine.turnOffField(point.x, point.y);
            this._pointsToTurnOff = [];
        }

        for (let i = this._bodyPoints.length - 1; i >= 0; i--) {
            this._engine.turnOnField(this._bodyPoints[i].x, this._bodyPoints[i].y);
        }
        
        this._directionChanged = false;
    }
}