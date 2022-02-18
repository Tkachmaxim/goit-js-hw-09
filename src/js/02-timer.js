import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const settigsForFlatpickr = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // call function for validation and initialization selected data, argument - first elemenet of array selectedDates
    onSelectData(selectedDates[0]);
  },
};

const params = {
  dateValue: Date.now(),
};

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  second: document.querySelector('[data-seconds]'),
  startButton: document.querySelector('button[data-start]'),
};

//init flatpickr instance
const instanceFlatpickr = flatpickr('#datetime-picker', settigsForFlatpickr);

//set disable startButton
refs.startButton.disabled = true;

// init listener on startButton
refs.startButton.addEventListener('click', onStartButton);

function onSelectData(value) {
  //validate choosen data
  if (value < Date.now()) {
    alert('Please choose a date in the future');
    refs.startButton.disabled = true;
    return;
  } else {
    refs.startButton.disabled = false;
    params.dateValue = value;
  }
}

//callback function that started when click on start Button

function onStartButton() {
  //disable button
  refs.startButton.disabled = true;
  instanceFlatpickr;

  //start timer
  startTimer();
}

//callback function timer

function startTimer() {
  //check whether time finished or continue
  const timerId = setInterval(() => {
    const restTime = params.dateValue - Date.now();
    if (restTime <= 0) {
      //destrtoy flatpickr and stop time
      refs.startButton.disabled = false;
      refs.dateInput.disabled = false;
      console.log('time stop');
      clearInterval(timerId);
    } else {
      refs.dateInput.disabled = true;
      //send rest time in frandly format to markUp
      markUp(convertMs(restTime));
    }
  }, 1000);
}

function markUp({ days, hours, minutes, seconds }) {
  refs.days.textContent = addZero(days);
  refs.hours.textContent = addZero(hours);
  refs.minutes.textContent = addZero(minutes);
  refs.second.textContent = addZero(seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addZero(el) {
  return String(el).padStart(2, '0');
}

/* let calcTimeGlobal = Date.now();
const startButton = document.querySelector('button[data-start]');

startButton.addEventListener('click', startTimer);

const flatpickerSettings = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 5,
  onClose(selectedDates) {
    onChoosedData(selectedDates[0]);
  },
};

const instance = flatpickr('#datetime-picker', flatpickerSettings);

function onChoosedData(date) {
  const calcTime = date.getTime();
  if (calcTime <= Date.now()) {
    window.alert('Please choose a date in the future');
    return;
  }
  calcTimeGlobal = calcTime;
}

function startTimer() {
  if (calcTimeGlobal > Date.now()) {
    setInterval(() => {
      const restTime = convertMs(calcTimeGlobal - Date.now());
      murkUp(restTime);
    }, 1000);
  }
}

function murkUp({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = addZero(days);
  document.querySelector('[data-hours]').textContent = hours;
  document.querySelector('[data-minutes]').textContent = minutes;
  document.querySelector('[data-seconds]').textContent = seconds;
}


}

function addZero(el) {
  return String(el).padStart(2, '0');
} 

 */
