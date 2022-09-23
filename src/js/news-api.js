const axios = require('axios').default;

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const URL = 'https://pixabay.com/api/';
    const KEY = '30097880-73ac2834789f98742941535c7';
    let searchParams = `per_page=40&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}`;
    const response = await axios(
      `${URL}?key=${KEY}&q=${this.searchQuery}&${searchParams}`
    );

    if (response.status === 200) {
      console.log(response.data);
      return response.data.hits;
    } else {
      throw new Error(response.statusText);
    }
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
