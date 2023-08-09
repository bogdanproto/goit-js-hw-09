import Notiflix from 'notiflix';

const ref = {
  form: document.querySelector('.form'),
  btnCreate: document.querySelector('.form button'),
};

ref.form.addEventListener('submit', submitForm);

function submitForm(evt) {
  evt.preventDefault();
  disableElement(ref.btnCreate);

  const arrayPromises = [];
  const { delay, step, amount } = evt.currentTarget.elements;
  const stepDelay = Number(step.value);
  const amountPromise = Number(amount.value);
  let delayPromise = Number(delay.value);

  for (let i = 1; i <= amountPromise; i += 1) {
    const promice = createPromise(i, delayPromise)
      .then(({ position, delay }) => {
        showNotification(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          'success'
        );
      })
      .catch(({ position, delay }) => {
        showNotification(
          `❌ Rejected promise ${position} in ${delay}ms`,
          'failure'
        );
      });

    delayPromise += stepDelay;
    arrayPromises.push(promice);
  }

  // make button activate when all promise will have done
  Promise.allSettled(arrayPromises).then(() => activateElement(ref.btnCreate));
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function showNotification(str, type) {
  if (type === 'success') {
    Notiflix.Notify.success(str);
  } else if (type === 'failure') {
    Notiflix.Notify.failure(str);
  } else {
    Notiflix.Notify.info(str);
  }
}

function disableElement(element) {
  element.disabled = true;
}

function activateElement(element) {
  element.disabled = false;
}
