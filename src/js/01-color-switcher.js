const startButtonRef = document.querySelector('[data-start]');
const stopButtonRef = document.querySelector('[data-stop]');
const canChangeColor = true;
let intervalID = null;

startButtonRef.addEventListener('click', onStartButton);
stopButtonRef.addEventListener('click', onStopButton);
stopButtonRef.setAttribute('disabled', 'true');

function onStartButton() {
  intervalID = setInterval(changeBodyColor, 1000);
  startButtonRef.setAttribute('disabled', 'true');
  stopButtonRef.removeAttribute('disabled');
}

function onStopButton() {
  clearInterval(intervalID);
  startButtonRef.removeAttribute('disabled');
  stopButtonRef.setAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
  let backgroundColor = getRandomHexColor();
  document.body.style.backgroundColor = backgroundColor;
}
