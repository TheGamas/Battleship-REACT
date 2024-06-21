import Board from "./Board.js";
import Position from "./Position.js";

let board = new Board();
console.log(board.toString());

board.shoot(new Position(0, 0));
board.shoot(new Position(0, 1));
board.shoot(new Position(0, 2));
board.shoot(new Position(0, 3));
board.shoot(new Position(0, 4));
board.shoot(new Position(0, 5));
board.shoot(new Position(0, 6));
board.shoot(new Position(0, 7));
board.shoot(new Position(0, 8));
board.shoot(new Position(0, 9));
console.log(board.toString());
console.log("Flattops: " + board.howMuchBoatsLeft('flattop'));
console.log("Cruises: " + board.howMuchBoatsLeft('cruise'));
console.log("Destructors: " + board.howMuchBoatsLeft('destructor'));
console.log("Frigates: " + board.howMuchBoatsLeft('frigate'));

