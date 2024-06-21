export default class Boat{

  constructor(positions){
    this.positions = positions;
  }

  isTouched(){
    return this.positions.filter(position => position.isTouched()).length > 0;
  }

  isSunk(){
    for (const pos of this.positions){
      if (pos.isTouched === false){
        return false;
      }
    }
    return true;
  }

  shoot(position){
    for (const pos of this.positions){
      if(pos.getX() === position.getX() && pos.getY() === position.getY()){
        pos.shoot();
        return true;
      }
    }
    return false;
  }
}