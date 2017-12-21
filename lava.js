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

Lava.prototype.type = 'lava'
