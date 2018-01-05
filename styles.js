var spritzies = Object.values(document.getElementsByClassName('spritz')[0].children);

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

spritzies.forEach(function(element) {
    element.style.top = getRandomInt(-800, 800) + 'px';
    element.style.left = getRandomInt(-2000, 2000) + 'px';
});

var presents = Object.values(document.getElementsByClassName('present'));
presents.forEach(function(element) {
    element.onclick = function() {
      element.classList.toggle('disabled');
    };
});
