import { fetchImages } from './js/pixabay-api.js';
import {
  createGalleryMarkup,
  clearGallery,
  renderGallery,
} from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.getElementById('loader');
const formData = { text: '' };
const STORAGE_KEY = 'search-form-state';

populateForm();

let query = '';
let page = 1;
let simpleLightbox;

form.addEventListener('input', handleFormInput);
form.addEventListener('submit', handleFormSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

function handleFormInput(event) {
  const { name, value } = event.target;
  formData[name] = value.trim();

  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateForm() {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) return;
    const parsedData = JSON.parse(savedData);

    for (const [key, value] of Object.entries(parsedData)) {
      if (form.elements[key]) {
        form.elements[key].value = value;
        formData[key] = value;
      }
    }
  } catch (err) {
    console.error('Error parsing localStorage data:', err);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  query = input.value.trim();
  if (!query) {
    showError('Please enter a search query');
    return;
  }

  clearGallery();
  page = 1;
  loadMoreBtn.classList.add('is-hidden');
  showLoader();

  fetchImages(query, page)
    .then(data => {
      hideLoader();
      if (data.hits.length === 0) {
        showInfo('No images found for your query');
        return;
      }

      const markup = createGalleryMarkup(data.hits);
      renderGallery(markup);
      simpleLightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        captionPosition: 'bottom',
        className: 'simple-lightbox',
      });
      if (data.hits.length < 12) {
        loadMoreBtn.classList.add('is-hidden');
      } else {
        loadMoreBtn.classList.remove('is-hidden');
      }
      input.value = '';
    })
    .catch(() => {
      hideLoader();
      showError('Failed to fetch images');
    });
}

function handleLoadMore() {
  page += 1;
  showLoader();

  fetchImages(query, page)
    .then(data => {
      hideLoader();
      const markup = createGalleryMarkup(data.hits);
      renderGallery(markup);
      simpleLightbox.refresh();
      if (data.hits.length < 12) {
        loadMoreBtn.classList.add('is-hidden');
      }
    })

    .catch(() => {
      hideLoader();
      showError('Failed to fetch more images');
    });
}

function showError(message) {
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
  });
}

function showInfo(message) {
  iziToast.info({
    title: '',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
}

function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}
