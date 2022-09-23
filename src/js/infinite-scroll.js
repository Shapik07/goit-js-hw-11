const callback = entries => {
  entries.forEach(entry => {
    console.log('Hello');
    console.log(entry);
  });
};
const options = {

}

const observer = new IntersectionObserver(callback, options);

const card = document.querySelector('#idi');
observer.observe(card);
