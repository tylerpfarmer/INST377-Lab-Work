async function mainThread() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const restaurants = await request.json();
  const mymap = L.map('mapid').setView([51.505, -0.09], 13);
  const accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

  // Map
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);

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
window.onload = mainThread();