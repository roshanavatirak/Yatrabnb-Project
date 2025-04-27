// map.js
import { listings } from './data.js';

// Initialize Map
const map = L.map('map').setView([20.5937, 78.9629], 2);

// Add OpenStreetMap Tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Create bounds to auto-fit all markers
const bounds = L.latLngBounds();

// Loop through listings
listings.forEach(listing => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(listing.location)}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        const lat = data[0].lat;
        const lon = data[0].lon;

        const marker = L.marker([lat, lon]).addTo(map);

        // Set Popup with Image, Title, and Price
        marker.bindPopup(`
          <div style="text-align:center;">
            <img src="${listing.image.url}" alt="${listing.title}" style="width:100px; height:70px; object-fit:cover; border-radius:8px;"><br>
            <b>${listing.title}</b><br>
            $${listing.price}/night
          </div>
        `);

        bounds.extend([lat, lon]);
        map.fitBounds(bounds);
      } else {
        console.log('No location found for:', listing.location);
      }
    })
    .catch(err => console.error('Error in geocoding:', err));
});
