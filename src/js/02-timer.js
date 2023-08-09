import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { optionsNotify } from './options/options-timer'; //options for notification

const ref = {
  inputCalendar: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('button[data-start]'),
  day: document.querySelector('span[data-days]'),
  hour: document.querySelector('span[data-hours]'),
  minute: document.querySelector('span[data-minutes]'),
  second: document.querySelector('span[data-seconds]'),
};

ref.btnStart.addEventListener('click', startTimer);
disableElement(ref.btnStart);

const calendar = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    checkUserChoice(selectedDates[0]);
  },
});

//check user choise
function checkUserChoice(selectedDate) {
  if (new Date().getTime() > selectedDate.getTime()) {
    disableElement(ref.btnStart);
    showMessage('Please choose a date in the future');
    return;
  }

  activateElement(ref.btnStart);
}

function startTimer() {
  const timeStep = 1000;
  const selectedDate = calendar.selectedDates[0];

  let restTime = selectedDate.getTime() - new Date().getTime();

  //check if user chose date and time but didn't push the button immediately
  if (restTime <= 0) {
    checkUserChoice(calendar.selectedDates[0]);
    return;
  }

  disableElement(ref.btnStart);
  disableElement(ref.inputCalendar);

  const idTimer = setInterval(() => {
    showTimer(restTime);
    restTime -= timeStep;

    if (restTime <= 0) {
      clearInterval(idTimer);
      activateElement(ref.inputCalendar);
    }
  }, timeStep);
}

function showTimer(time) {
  const { days, hours, minutes, seconds } = convertMs(time);

  ref.day.textContent = addLeadingZero(days);
  ref.hour.textContent = addLeadingZero(hours);
  ref.minute.textContent = addLeadingZero(minutes);
  ref.second.textContent = addLeadingZero(seconds);
}

function showMessage(str) {
  Notiflix.Notify.failure(str, optionsNotify);
}

function disableElement(element) {
  element.disabled = true;
}

function activateElement(element) {
  element.disabled = false;
}

function addLeadingZero(str) {
  return String(str).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
