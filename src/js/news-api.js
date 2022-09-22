export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = 'https://pixabay.com/api/';
    const KEY = '30097880-73ac2834789f98742941535c7';
    let searchSettings = `per_page=40&image_type=photo&orientation=horizontal&safesearch=true$page=${this.page}`;

    fetch(`${url}?key=${KEY}&q=${this.searchQuery}&${searchSettings}`)
      .then(result => result.json())
      .then(data => {
        this.incrementPage();
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newSearchQuery) {
    this.searchQuery = newSearchQuery;
  }
}
