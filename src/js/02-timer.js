import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

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
    Notify.failure('Please choose date in the future');
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
  refs.dateInput.disabled = true;
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
      //send rest time in frandly format to markUp
      markUp(convertMs(restTime));
    }
  }, 1000);
}

function markUp({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.second.textContent = addLeadingZero(seconds);
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

function addLeadingZero(el) {
  return String(el).padStart(2, '0');
}
