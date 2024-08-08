export function createGalleryMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<li class="gallery-list">
        <a class="gallery-link" href="${largeImageURL}" >
          <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
          />
          <ul class="gallery-block">
            <li>
              <p class="gallery-text">Likes</p>
              <p class="gallery-info">${likes}</p>
            </li>
            <li>
              <p class="gallery-text">Views</p>
              <p class="gallery-info">${views}</p>
            </li>
            <li>
              <p class="gallery-text">Comments</p>
              <p class="gallery-info">${comments}</p>
            </li>
            <li>
              <p class="gallery-text">Downloads</p>
              <p class="gallery-info">${downloads}</p>
            </li>
          </ul>
        </a>
      </li>`;
      }
    )
    .join('');
}

export function clearGallery() {
  document.querySelector('.gallery').innerHTML = '';
}

export function renderGallery(markup) {
  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);
}
