const wobbleSpeed = 10;
const wobbleDistance = 0.1;

function Coin(initPos) {
  this.basePos = this.pos = initPos.plus(new Vector(0.2, 0.1));
  this.size = new Vector(0.6, 0.6);
  this.wobble = Math.PI * 2 * Math.random();
}

Coin.prototype.type = 'coin';
Coin.prototype.act = function(step) {
  this.wobble += step * wobbleSpeed;
  let wobblePosition = Math.sin(this.wobble) * wobbleDistance;
  this.pos = this.basePos.plus(new Vector(0, wobblePosition))
};
