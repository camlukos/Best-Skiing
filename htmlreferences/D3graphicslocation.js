// Map of ski locations
// Creating our initial map object:
// We set the longitude, latitude, and starting zoom level.

var myMap = L.map("map", {
    center: [40.580755, -111.657296],
    zoom: 5
  });
  
  // Adding a tile layer (the background map image) to our map:
  // We use the addTo() method to add objects to our map.
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);


// Perform a GET request to the query URL. test to make sure it worked
d3.csv("locations.csv").then(function (data) {
  console.log(data)
});

var cities = [
  {
    name: "ARAPAHOE 4.3 SW, CO US",
    location: [39.6524797, -104.5204745],
    
  },
  {
    name: "MAMMOTH LAKES 16.3 ESE, CA US",
    location: [37.6198538, -118.9829602],
    
  },
  {
    name: "LAVA BUTTE OREGON, OR US",
    location: [43.9178641, -121.3604104],
    
  },
  {
    name: "SNOWBIRD, UT US",
    location: [40.580755, -111.657296],
    population: 3971883
  },
  {
    name: "PALISADES TAHOE, CA US",
    location: [39.1969822, -120.2431388],
    
  }
];

// Loop through the cities array, and create one marker for each city object.
for (var i = 0; i < cities.length; i++) {
  L.marker(cities[i].location, {
    fillOpacity: 0.75,
    color: "white",
    fillColor: "purple",
    // Setting our circle's radius to equal the output of our markerSize() function:
    // This will make our marker's size proportionate to its population.
    
  }).bindPopup(`<h1>${cities[i].name}</h1> `).addTo(myMap);
}




