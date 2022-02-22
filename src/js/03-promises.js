import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refFormElements = document.querySelector('.form').elements;
const refButton = document.querySelector('.form button');

const refs = {
  delay: refFormElements.delay,
  step: refFormElements.step,
  amount: refFormElements.amount,
};

refButton.addEventListener('click', onCreateButton);

function onCreateButton(event) {
  event.preventDefault();
  const amount = Number(refs.amount.value);
  let delay = Number(refs.delay.value);
  const step = Number(refs.step.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promiseInstance = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
