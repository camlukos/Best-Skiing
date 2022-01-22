// Bubble map of averages

// Map and projection
var myMap = L.map("map", {
    center: [40.580755, -111.657296],
    zoom: 5
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


var precip = [
  {
    
    name: "ARAPAHOE 4.3 SW, CO US",
    location: [39.6524797, -104.5204745],
    average: 0.094959097,
    size: 20
    
  },
  {
    name: "MAMMOTH LAKES 16.3 ESE, CA US",
    location: [37.6198538, -118.9829602],
    average: 0.587066929,
    size: 40
    
  },
  {
    name: "LAVA BUTTE OREGON, OR US",
    location: [43.9178641, -121.3604104],
    average: 0.086123924,
    size: 15
    
  },
  {
    name: "SNOWBIRD, UT US",
    location: [40.580755, -111.657296],
    average: 0.143507818,
    size: 25
  },
  {
    name: "PALISADES TAHOE, CA US",
    location: [39.1969822, -120.2431388],
    average: 0.376489899,
    size: 30    
  }
];

// Loop through the cities array, and create one marker for each city object.
for (var i = 0; i < precip.length; i++) {
  L.circleMarker(precip[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "red",
    radius:precip[i].size
    // Setting our circle's radius to equal the output of our markerSize() function:
    // This will make our marker's size proportionate to its population.
    
  }).bindPopup(`<h1>${precip[i].name}, ${precip[i].average}</h1> `).addTo(myMap);
}

