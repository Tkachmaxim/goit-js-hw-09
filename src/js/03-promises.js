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
  const amount = Number(refs.amount.value);
  let delay = Number(refs.delay.value);
  const step = Number(refs.step.value);
  for (let index = 1; index <= amount; index++) {
    createPromise(index, delay).then(Notify.success('Yes')).catch(Notify.failure('No'));
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promiseInstance = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, resolve });
      } else {
        reject({ position, resolve });
      }
    }, delay);
  });

  return promiseInstance;
}
