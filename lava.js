function Lava(initPos, characterType) {
  this.pos = initPos;
  this.size = new Vector(1, 1);

  if (characterType === '=') this.speed = new Vector(2, 0);
  else if (characterType === '|') this.speed = new Vector(0, 2);
  else if (characterType === 'v') {
    this.speed = new Vector(0, 3);
    this.respawnPos = initPos;
  }
}

Lava.prototype.type = 'lava';
Lava.prototype.act = function(step, level) {
  let newPosition = this.pos.plus(this.speed.times(step));
  if (!level.obstacleAt(newPosition, this.size)) this.pos = newPosition;
  else if (this.respawnPos) this.pos = this.respawnPos;
  else this.speed = this.speed.times(-1);
}
