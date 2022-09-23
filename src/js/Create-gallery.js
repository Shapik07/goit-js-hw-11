import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import NewsApiService from './news-api';
import galleryTpl from './markup/create-markup.hbs';
import 'infinite-scroll';

const Handlebars = require('handlebars');

const refs = {
  searchForm: document.querySelector('.search-form'),
  galleryList: document.querySelector('.Gallery_list'),
  buttonLoadMore: document.querySelector('.button'),
};

const API = new NewsApiService();
var galleryViewer = new SimpleLightbox('.photo-card a', {
  captionDelay: 250,
  captionsData: 'alt',
});

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
  API.fetchImages().then(hits => {
    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    } else {
      Notify.success('Hooray! We found totalHits images');
    }

    appendPicturesMarkup(hits);
  });
}

function onLoadMore(hits) {
  if (!API.query) {
    return;
  }

  API.fetchImages().then(hits => {
    if (hits.length === 0) {
      Notify.info(
        'We are sorry, but you have reached the end of search results.'
      );
    }
    appendPicturesMarkup(hits);
  });
}

function appendPicturesMarkup(hits) {
  refs.galleryList.insertAdjacentHTML('beforeend', galleryTpl(hits));
  galleryViewer.refresh();
}

function clearMarkup() {
  refs.galleryList.innerHTML = '';
}
