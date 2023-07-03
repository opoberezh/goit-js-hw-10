

import { fetchBreeds, fetchCatByBreed } from './js/cat-api';
import SlimSelect from 'slim-select';
import Notiflix from 'notiflix';
import 'slim-select/dist/slimselect.css';

const selectEl = document.querySelector('.breed-select');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const divEl = document.querySelector('.cat-info');
const spanEl = document.querySelector('.loadering');

errorEl.style.display = 'none';

function initSlimSelect() {
  const slimSelect = new SlimSelect({
    select: document.querySelector('.breed-select'),
    settings: {
      showSearch: false,
    },
  });

  return slimSelect;
}

function showSlimSelect() {
  selectEl.style.display = 'flex';
  initSlimSelect();
}

function showLoader() {
  loaderEl.style.display = 'block';
  spanEl.style.display = 'block';
}

function hideLoader() {
  loaderEl.style.display = 'none';
  spanEl.style.display = 'none';
}

selectEl.style.display = 'none';
spanEl.style.display = 'block';

let catsArr = null;

showLoader();

fetchBreeds()
  .then(data => {
    catsArr = data;
    data.forEach(el => {
      const oprionEl = document.createElement('option');
      oprionEl.value = el.id;
      oprionEl.textContent = el.name;
      selectEl.append(oprionEl);
    });

    hideLoader();

    showSlimSelect();
  })
  .catch(err => {
    console.log(err);
    hideLoader();
    Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
  });

selectEl.addEventListener('change', event => {
  divEl.innerHTML = '';
  showLoader();

  fetchCatByBreed(event.target.value)
    .then(data => {
      const currentCatData = catsArr.find(el => el.id === event.target.value);
      divEl.innerHTML = `
          <img src="${data[0].url}" alt="cats" width="50%">
          <div>
              <p class="cat-header">${currentCatData.name}</p>
              <p>${currentCatData.description}</p>
              <p><b>Temperament</b> - ${currentCatData.temperament}</p>
          </div>
      `;
      hideLoader();
    })
    .catch(err => {
      console.warn(err);
      divEl.innerHTML = '';
      hideLoader();
      Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    });
});


