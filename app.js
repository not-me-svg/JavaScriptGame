const ARROW_CODES = {
  37: 'left',
  38: 'up',
  39: 'right'
}

const ARROW = trackKeys(ARROW_CODES);

function trackKeys(keyCodes) {
  let pressedKeys = {};

  function handler(event) {
    if(keyCodes.hasOwnProperty(event.keyCode)) {
      let downPressed = event.type === 'keydown';
      pressedKeys[keyCodes[event.keyCode]] = downPressed;
    }
  }

  addEventListener('keydown', handler);
  addEventListener('keyup', handler);

  return pressedKeys;
}

let level = new Level(GAME_LEVELS);
let display = new DOMDisplay(document.body, level);
