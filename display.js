const SCALE = 20;

function createElement(type, className) {
  let element = document.createElement(type);
  if (className) {
    element.className = className;
    return element;
  }
}

function DOMDisplay(parent, level) {
  this.wrap = parent.appendChild(createElement('div', 'jsg'));
  this.level = level;

  this.drawBackground = function() {
    let table = createElement('table', 'jsg__bg');
    table.style.width = this.level.width * SCALE + 'px';

    this.level.grid.forEach(row => {
      let tableRow = createElement('tr');
      table.appendChild(tableRow);
    })

    return table;
  }

  this.wrap.appendChild(this.drawBackground());
}
