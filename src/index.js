import { GameCycle } from '@eliya-56/canvas-engine';
import { TetrisEngine } from '@eliya-56/canvas-engine';
import SnakeGame from './games/snake-game/SnakeGame';

let engine = new TetrisEngine(document.body);
engine.useBorders = false;
let game = new SnakeGame(engine);
let cycle = new GameCycle(game);

game.configure();
cycle.start();