import { Notify } from 'notiflix/build/notiflix-notify-aio';
import NewsApiService from './news-api';
import galleryTpl from './markup/create-markup.hbs';

const Handlebars = require('handlebars');

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryList: document.querySelector('.Gallery_list'),
  buttonLoadMore: document.querySelector('.button'),
};

const API = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
refs.buttonLoadMore.addEventListener('click', onLoadMore);

function onSearch(e) {
  e.preventDefault();
  clearMarkup();

  API.query = e.currentTarget.elements.searchQuery.value.trim();
  if (!API.query) {
    return;
  }

  API.resetPage();
  API.fetchImages().then((hits) => {
    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      ) 
    } else {
      Notify.success('Hooray! We found totalHits images');
    }

    appendPicturesMarkup(hits);
  });
}

function onLoadMore() {
  if (!API.query) {
    return;
  }
  API.fetchImages().then(appendPicturesMarkup);
}

function appendPicturesMarkup(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', galleryTpl(hits));
  Notify
}

function clearMarkup() {
  refs.galleryList.innerHTML = '';
}
