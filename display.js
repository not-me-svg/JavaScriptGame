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
  let actorWrap = createElement('div');
  this.level.actors.map(actor => {
    let actorElement = createElement('div', `actr actr__${actor.type}`);
    let rect = actorWrap.appendChild(actorElement);
    rect.style.width = actor.size.x * SCALE + 'px';
    rect.style.height = actor.size.y * SCALE + 'px';
    rect.style.top = actor.pos.y * SCALE + 'px';
    rect.style.left = actor.pos.x * SCALE + 'px';
  })

  return actorWrap;
}

DOMDisplay.prototype.drawFrame = function() {
  if(this.actorsLayer) this.wrap.removeChild(this.actorsLayer);
  this.actorsLayer = this.wrap.appendChild(this.drawActors());
  this.wrap.className = 'jsg ' + (this.level.status || '');
}

DOMDisplay.prototype.clear = function() {
  this.wrap.parentNode.removeChild(this.wrap);
}
