let idInterval = null;

const ref = {
  btnStartEl: document.querySelector('button[data-start]'),
  btnStopEl: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};
ref.btnStartEl.disabled = false;
ref.btnStopEl.disabled = true;

ref.btnStartEl.addEventListener('click', startChangeColor);
ref.btnStopEl.addEventListener('click', stopChangeColor);

function startChangeColor() {
  switchButton();
  idInterval = setInterval(changeBodyColor, 1000);
}

function stopChangeColor() {
  switchButton();
  clearInterval(idInterval);
}

function changeBodyColor() {
  ref.bodyEl.style.backgroundColor = getRandomHexColor();
}

function switchButton() {
  if (ref.btnStopEl.disabled) {
    ref.btnStartEl.disabled = true;
    ref.btnStopEl.disabled = false;
  } else if (ref.btnStartEl.disabled) {
    ref.btnStartEl.disabled = false;
    ref.btnStopEl.disabled = true;
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
