const accessKey = 'yUqkVAU781q7oni7oMgQh9RyKfpiWHn--7BLHaYi1P4';

const formEl = document.querySelector('form');
const inputEl = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const showMore = document.getElementById('showMore');

let inputData = '';
let defPage = 1;

async function searchImages() {
  inputData = inputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${defPage}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (defPage === 1) {
    searchResults.innerHTML = '';
  }

  results.map(result => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('searchResult');
    const image = document.createElement('img');
    image.src = result.urls.small;
    image.alt = result.alt_description;
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = '_blank';
    imageLink.textContent = result.alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  defPage++;
  if (defPage > 1) {
    showMore.style.display = 'block';
  }
}

formEl.addEventListener('submit', event => {
  event.preventDefault();
  defPage = 1;
  searchImages();
});

showMore.addEventListener('click', event => {
  event.preventDefault();
  searchImages();
});
