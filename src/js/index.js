import '../sass/main.scss';
import API from '../js/fetchCountries.js';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { defaults, error } from '@pnotify/core';
defaults.width = '450px';
defaults.delay = 3000;
export default function errorMessage(text) {
  error(text);
}
const refs = {
  countryContainer: document.querySelector('.js-country-container'),
  searchForm: document.querySelector('.search-form'),
};

const debounce = require('lodash.debounce');
refs.searchForm.addEventListener('input', debounce(onInputChange, 500));

function onInputChange(event) {
  event.preventDefault();
  const form = event.target;
  const queryValue = form.value;

  if (queryValue.length < 1) {
    return onClearForm();
  }
  const fetchName = API.fetchCountryByName(queryValue);
  fetchName.then(data => {
    if (data.length >= 2 && data.length <= 10) {
      renderCountryList(data);
    } else if (data.length < 2) {
      renderCountryCard(data);
    } else if (data.length > 10) {
      errorMessage(
        'Too many matches found. Please enter a more specific query!',
      );
      // alert({
      //   text: 'Too many matches found. Please enter a more specific query!',
      //   type: 'Error',
      // });
    }
  });
}
function onClearForm(error) {
  refs.countryContainer.innerHTML = '';
}

function renderCountryCard(country) {
  const markup = countryCardTpl(country);
  refs.countryContainer.innerHTML = markup;
}
function renderCountryList(country) {
  const murkup = countryListTpl(country);
  refs.countryContainer.innerHTML = murkup;
}
