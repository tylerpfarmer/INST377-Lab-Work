async function mainThread() {
  const endpoint = 'https://data.princegeorgescountymd.gov/resource/umjn-t2iz.json';
  const request = await fetch(endpoint);
  const restaurants = await request.json();
  // marker array
  const markers = [];

  // Map
  const accessToken = 'pk.eyJ1IjoidHlsZXJwZmFybWVyIiwiYSI6ImNrdXZuem41NjFuanIybm9kODFwOGdkcXkifQ.a6scWSSqAyYImncizXgGzQ';
  const mymap = L.map('mapid').setView([38.989, -76.93], 12);
  L.tileLayer(`https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${accessToken}`, {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoidHlsZXJwZmFybWVyIiwiYSI6ImNrdXZuem41NjFuanIybm9kODFwOGdkcXkifQ.a6scWSSqAyYImncizXgGzQ'
  }).addTo(mymap);

  function findMatches(wordToMatch, restauraunts) {
    return restaurants.filter((place) => {
      // if zip code matches search
      const regex = new RegExp(wordToMatch, 'gi');
      return place.zip.match(regex);
    });
  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  function displayMatches(event) {
    markers.forEach((marker) => {
      marker.remove();
    });
    const matchArray = findMatches(event.target.value, restaurants);
    newMatchArray = matchArray.slice(0,5);
    newMatchArray.forEach(place => {
      if(place.hasOwnProperty('geocoded_column_1')) {
        const point = place.geocoded_column_1;
        const latLong = point.coordinates;
        const marker = latLong.reverse();
        markers.push(L.marker(marker).addTo(mymap));
      }
    })
    // where would I be without the class Discord 0_0
    const html = newMatchArray.map((place) => {
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

  searchInput.addEventListener('input', displayMatches);
  searchInput.addEventListener('keyup', (evt) => {
    displayMatches(evt);
  });
}
window.onload = mainThread();