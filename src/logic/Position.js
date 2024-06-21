import { BOARD_SIZE } from "./constants";
export default class Position{

  constructor(x, y, isTouched){
    this.x = x
    this.y = y
    this.isTouched = isTouched;
  }

  getX(){
    return this.x;
  }

  getY(){
    return this.y;
  }

  shoot(){
    this.isTouched = true;
    console.log(`Disparada posicion ${this.y} ${this.x}`);
  }

  isPosTouched(){
    return this.isTouched;
  }

  transformToIndex(){
    return this.y * BOARD_SIZE.X + this.x;
  }

  transformFromIndex(index){
    this.x = index % BOARD_SIZE.X;
    this.y = (index - this.x) / BOARD_SIZE.X;
  }
}