async function windowActions() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';

  const request = await fetch(endpoint);

  const restaurants = await request.json();

  function findMatches(wordToMatch, restauraunts) {
    return restaurants.filter((place) => {
      // if name or zip code matches search
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.zip.match(regex);
    });
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  function displayMatches(event) {
    const matchArray = findMatches(event.target.value, restaurants);
    const html = matchArray.map((place) => {
      const regex = new RegExp(event.target.value, 'gi');
      const restaurantName = place.name.replace(regex, `<span class="h1">${event.target.value}</span>`);
      const zipCode = place.zip.replace(regex, `<span class="h1">${event.target.value}</span>`);
      return `
              <ul>
              <li><span class='name'>${place.name}</span><li>
              <span class='zip'>${place.zip}</span>
              </ul>
              <br>
              `;
    }).join('');
    if (!event.target.value) {
      document.querySelector('.suggestions').innerHTML = '';
      return false;
    }
    suggestions.innerHTML = html;
  }

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', (evt) => {
    displayMatches(evt);
  });
}
window.onload = windowActions();