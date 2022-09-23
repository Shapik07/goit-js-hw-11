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
    // return fetch(`${URL}?key=${KEY}&q=${this.searchQuery}&${searchParams}`)
    //   .then(result => result.json())
    //   .then(data => {
    //     this.incrementPage();
    //     return data.hits;
    //   });
debugger
 const response = await axios(
      `${URL}?key=${KEY}&q=${this.searchQuery}&${searchSettings}`
    )

     if (response.status === 200) {
       return response.data;
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
