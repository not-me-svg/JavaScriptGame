const playerSpeed = 6;
const gravity = 28;
const jumpSpeed = 16;

function Player(initPos) {
  this.pos = initPos.plus(new Vector(0, -1));
  this.size = new Vector(1, 1);
  this.speed = new Vector(0, 0);
}

Player.prototype.type = 'player';

Player.prototype.moveX = function(step, level, keys) {
  this.speed.x = 0;
  if (keys.left) this.speed.x -= playerSpeed;
  if (keys.right) this.speed.x += playerSpeed;
  let motion = new Vector(this.speed.x * step, 0);
  let newPosition = this.pos.plus(motion);

  let obstacle = level.obstacleAt(newPosition, this.size);
  if (obstacle) level.playerTouched(obstacle);
  else this.pos = newPosition;
}

Player.prototype.moveY = function(step, level, keys) {
  this.speed.y += step * gravity;
  let motion = new Vector(0, this.speed.y * step);
  let newPosition = this.pos.plus(motion);

  let obstacle = level.obstacleAt(newPosition, this.size);
  if (obstacle) {
      level.playerTouched(obstacle);
      if (keys.up && this.speed.y > 0) this.speed.y = -jumpSpeed;
      else this.speed.y = 0;
  } else {
      this.pos = newPosition;
  }
}

Player.prototype.act = function(step, level, keys) {
  this.moveX(step, level, keys);
  this.moveY(step, level, keys);

  let otherActor = level.actorAt(this);
  if (otherActor) level.playerTouched(otherActor.type, otherActor);

  if (level.status === 'lost') {
      this.pos.y += step;
      this.size.y -= step;
  }
}
