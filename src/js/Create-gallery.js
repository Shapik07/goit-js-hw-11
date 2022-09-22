import NewsApiService from './news-api';

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

  API.query = e.currentTarget.elements.searchQuery.value;
  API.resetPage();
  API.fetchImages();
}

function onLoadMore() {
  API.fetchImages();
}
