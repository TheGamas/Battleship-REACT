import { BOARD_SIZE } from "./constants.js";
import Position from "./Position.js";
import Boat from "./Boat.js";
import { BOATS_LENGTH } from "./constants.js";
export default class BoatsFactory{

  static boat(type){
    switch(type){
      case 'flattop':
        return BoatsFactory.linearBoat(BOATS_LENGTH.flattop);

      case 'cruise':
        return BoatsFactory.linearBoat(BOATS_LENGTH.cruise);

      case 'destructor':
        return BoatsFactory.linearBoat(BOATS_LENGTH.destructor);

      case 'frigate':
        return BoatsFactory.linearBoat(BOATS_LENGTH.frigate);
    }
  }


  static linearBoat(length){
    let positions = new Set()
    
    let x = Math.round(Math.random()*BOARD_SIZE.X);
    let y = Math.round(Math.random()*BOARD_SIZE.Y);
    
    let inc_x = 0;
    let inc_y = 0;

    let vertical = Math.random() < 0.5;

    if (vertical){
      inc_y = 1;
    }
    else{
      inc_x = 1;
    }

    for (let i = 0; i < length; i++){
      let position = new Position(x, y, false)
      positions.add(position)
      x = x + inc_x;
      y = y + inc_y;
    }

    return new Boat(positions)
  }
}