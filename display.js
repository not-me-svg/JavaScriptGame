const SCALE = 20;

function createElement(type, className) {
  let element = document.createElement(type);
  if (className) element.className = className;
  return element;
}

function DOMDisplay(parent, level) {
  this.wrap = parent.appendChild(createElement('div', 'jsg'));
  this.level = level;

  this.wrap.appendChild(this.drawBackground());
  this.actorsLayer = null;
}

DOMDisplay.prototype.drawBackground = function() {
  let table = createElement('table', 'jsg__bg');
  table.style.width = this.level.width * SCALE + 'px';

  this.level.grid.forEach(row => {
    let tableRow = createElement('tr');
    tableRow.style.height = SCALE + 'px'
    table.appendChild(tableRow);

    row.forEach(type => {
      tableRow.appendChild(createElement('td', type));
    })
  })

  return table;
}

DOMDisplay.prototype.drawActors = function() {
  let actorsWrap = createElement('div');
  this.level.actors.map(actor => {
    let actorElement = createElement('div', `actr ${actor.type}`);
    let rect = actorsWrap.appendChild(actorElement);
    rect.style.width = actor.size.x * SCALE + 'px';
    rect.style.height = actor.size.y * SCALE + 'px';
    rect.style.top = actor.pos.y * SCALE + 'px';
    rect.style.left = actor.pos.x * SCALE + 'px';
  })

  return actorsWrap;
}

DOMDisplay.prototype.moveDisplay = function () {
    let width = this.wrap.clientWidth;
    let height = this.wrap.clientHeight;
    let margin = width / 3;

    let left = this.wrap.scrollLeft;
    let rigth = left + width;
    let top = this.wrap.scrollTop;
    let bottom = top + height;

    let player = this.level.actor;
    let playerCenter = player.pos.plus(player.size.times(0.5)).times(SCALE);

    if (playerCenter.x < left + margin) this.wrap.scrollLeft = playerCenter.x - margin;
    else if (playerCenter.x > rigth - margin) this.wrap.scrollLeft = playerCenter.x + margin - width;
    if (playerCenter.y < top + margin) this.wrap.scrollTop = playerCenter.y - margin;
    else if (playerCenter.y > bottom - margin) this.wrap.scrollTop = playerCenter.y + margin - height;
}

DOMDisplay.prototype.drawFrame = function() {
  if(this.actorsLayer) this.wrap.removeChild(this.actorsLayer);
  this.actorsLayer = this.wrap.appendChild(this.drawActors());
  this.wrap.className = 'jsg ' + (this.level.status || '');
  this.moveDisplay();
}

DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
}
