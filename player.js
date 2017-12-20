function Player(initPos) {
  this.pos = initPos.plus(new Vector(0, 0.2));
  this.size = new Vector(0.8, 0.8);
  this.speed = new Vector(0, 0);
}

Player.prototype.type = 'player'
