maptilersdk.config.apiKey =mapToken;
const map = new maptilersdk.Map({
  container: 'map', // container's id or the HTML element to render the map
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});

// console.log(coordinates);
const marker = new maptilersdk.Marker({color:"red"})
  .setLngLat(listing.geometry.coordinates) //listing.geomtry.coordinates
  .setPopup(new maptilersdk.Popup().setHTML(`<h4>${listing.title}</h4><p>Exact location Provide After Booking!</p>`))
  .addTo(map);

