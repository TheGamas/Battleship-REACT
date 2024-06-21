import BoatsFactory from './BoatsFactory.js';
import { BOARD_SIZE } from './constants.js';
import Position from './Position.js';
import { SIMBOLS } from './constants.js';
import { EVENTS } from './constants.js';

export default class Board{


  constructor(){
    this.failedShoots = new Set()
    this.boats = new Map();
    this.createBoats();
  }

  shoot(position){
    let result = this.shootBoats(position);

    if (result === EVENTS.failedShot){
      this.failedShoots.add(position);
    }
    return result
  }

  clone(){
    let newBoard = new Board()
    newBoard.failedShoots = this.failedShoots;
    newBoard.boats = this.boats;
    return newBoard;
  }


  shootBoats(position){
    for(const boatsType of this.boats.values()){
      for (const boat of boatsType){
        let wasSunk = boat.isSunk()
        if (boat.shoot(position)){
          if (boat.isSunk() && ! wasSunk){
            console.log("barco disparado: ")
            return EVENTS.sunk;
          }
          return EVENTS.shot;

        }
        
      }
    }
    return EVENTS.failedShot;
  }

  howMuchBoatsLeft(type){
    let count = 0;
    for (const boat of this.boats.get(type)){
      if (! boat.isSunk()){
        count++;
      }
    }
    return count;
  }

  toString(){
    let boardString = '  ';
    let letters = 'ABCDEFGHIJ';
    for (let i = 0; i < BOARD_SIZE.X; i++){
      boardString += letters[i];
      boardString += ' ';
    }
    boardString += '\n';

    
    for (let i = 0; i < BOARD_SIZE.X; i++){
      boardString += letters[i];
      for (let j = 0; j < BOARD_SIZE.Y; j++){
        boardString += ' ';
        boardString += this.getSymbol(new Position(i, j));
      }
      boardString += '\n';
    }
    return boardString;
  }

  getSymbol(position){
    
    if (this.isTouchedBoat(position)) return SIMBOLS.shotBoat;

    if (this.isBoat(position)) return SIMBOLS.boat;
    
    if (this.isFailedShoot(position)) return SIMBOLS.failedShot;

    return SIMBOLS.water;
  }

  createBoats(){
    this.addBoat('flattop');
    this.addBoat('cruise');
    this.addBoat('destructor');
    this.addBoat('destructor');
    this.addBoat('frigate');
    this.addBoat('frigate');
    this.addBoat('frigate');
  }

  isBoatOut(boat){
    for (const pos of boat.positions){
      if (pos.getX() < 0 || pos.getX() >= BOARD_SIZE.X || 
          pos.getY() < 0 || pos.getY() >= BOARD_SIZE.Y){
        return true;
      }
    }
    return false;
  }

  isBoatOverlapping(boat){
    for (const pos of boat.positions){
      if (this.isBoat(pos)){
        return true;
      }
    }
    return false;
  }

  isBoat(position){
    for(const boatsType of this.boats.values()){
      for (const boat of boatsType){
        for (const pos of boat.positions){
          if (pos.getX() === position.getX() && pos.getY() === position.getY()){
            return true;
          }
        }
      }
    }
    return false;
  }

  isFailedShoot(position){
    for (const pos of this.failedShoots){
      if (pos.getX() === position.getX() && pos.getY() === position.getY()){
        return true;
      }
    }
    return false;
  }

  isTouchedBoat(position){
    for(const boatsType of this.boats.values()){
      for (const boat of boatsType){
        for (const pos of boat.positions){
          if (pos.getX() === position.getX() && pos.getY() === position.getY() && pos.isPosTouched()){
            return true;
          }
        }
      }
    }
    return false;
  }

  addBoat(type){
    if (this.boats.get(type) === undefined){
      this.boats.set(type, new Set());
    }
    
    let boat = BoatsFactory.boat(type);
    while (this.isBoatOut(boat) || this.isBoatOverlapping(boat)){
      boat = BoatsFactory.boat(type);
    }
    this.boats.get(type).add(boat);
  }

}
