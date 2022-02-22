import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  delay: document.querySelector('.form').delay,
  step: document.querySelector('.form').step,
  amount: document.querySelector('.form').amount,
  submitButton: document.querySelector('.form button'),
};

refs.submitButton.addEventListener('click', onCreateButton);

function onCreateButton(event) {
  event.preventDefault();
  const amount = ~~refs.amount.value;
  let delay = ~~refs.delay.value;
  const step = ~~refs.step.value;

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
