const API_KEY = '45237903-940e6dd06b8edc671dac0e6f2';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query, page) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(
    query
  )}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }
    return response.json();
  });
}
