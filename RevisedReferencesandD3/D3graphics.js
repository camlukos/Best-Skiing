//Map of ski locations
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




//Map precipitation indicator Tahoe

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%m/%d/%Y");

// Load data 
d3.csv("./tahoe.csv").then(function(tahoe) {

  // Print the Data
  console.log(tahoe)
  // Format the date and cast the force value to a number
  tahoe.forEach(function(data) {
    data.DATE = parseTime(data.DATE);
    data.SNOW = +data.SNOW;
  });
// Configure a time scale
  // d3.extent returns the an array containing the min and max values for the property specified
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(tahoe, data => data.DATE))
    .range([0, chartWidth]);

  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(tahoe, data => data.SNOW)])
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure a line function which will plot the x and y coordinates using our scales
  var drawLine = d3.line()
    .x(data => xTimeScale(data.DATE))
    .y(data => yLinearScale(data.SNOW));

  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for Data
    .attr("d", drawLine(tahoe))
    .classed("line", true);

  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
}).catch(function(error) {
  console.log(error);
});


//Map precipitation indicator Arapahoe

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%m/%d/%Y");

// Load data
d3.csv("./a basin.csv").then(function(arapahoe) {

  // Print the Data
  console.log(arapahoe)
  // Format the date and cast the force value to a number
  arapahoe.forEach(function(data) {
    data.DATE = parseTime(data.DATE);
    data.SNOW = +data.SNOW;
  });
// Configure a time scale
  // d3.extent returns the an array containing the min and max values for the property specified
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(arapahoe, data => data.DATE))
    .range([0, chartWidth]);

  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(arapahoe, data => data.SNOW)])
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure a line function which will plot the x and y coordinates using our scales
  var drawLine = d3.line()
    .x(data => xTimeScale(data.DATE))
    .y(data => yLinearScale(data.SNOW));

  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for Data
    .attr("d", drawLine(arapahoe))
    .classed("line", true);

  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
}).catch(function(error) {
  console.log(error);
});


//Map precipitation indicator Mammoth

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%m/%d/%Y");

// Load data from forcepoints.csv
d3.csv("./mammoth.csv").then(function(mammoth) {

  // Print the Data
  console.log(mammoth)
  // Format the date and cast the force value to a number
  mammoth.forEach(function(data) {
    data.DATE = parseTime(data.DATE);
    data.SNOW = +data.SNOW;
  });
// Configure a time scale
  // d3.extent returns the an array containing the min and max values for the property specified
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(mammoth, data => data.DATE))
    .range([0, chartWidth]);

  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(mammoth, data => data.SNOW)])
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure a line function which will plot the x and y coordinates using our scales
  var drawLine = d3.line()
    .x(data => xTimeScale(data.DATE))
    .y(data => yLinearScale(data.SNOW));

  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for Data
    .attr("d", drawLine(mammoth))
    .classed("line", true);

  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
}).catch(function(error) {
  console.log(error);
});


//Map precipitation indicator mt Bachelor

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%m/%d/%Y");

// Load data
d3.csv("./mt bachelor.csv").then(function(bachelor) {

  // Print the Data
  console.log(bachelor)
  // Format the date and cast the force value to a number
  bachelor.forEach(function(data) {
    data.DATE = parseTime(data.DATE);
    data.SNOW = +data.SNOW;
  });
// Configure a time scale
  // d3.extent returns the an array containing the min and max values for the property specified
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(bachelor, data => data.DATE))
    .range([0, chartWidth]);

  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(bachelor, data => data.SNOW)])
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure a line function which will plot the x and y coordinates using our scales
  var drawLine = d3.line()
    .x(data => xTimeScale(data.DATE))
    .y(data => yLinearScale(data.SNOW));

  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for Data
    .attr("d", drawLine(bachelor))
    .classed("line", true);

  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
}).catch(function(error) {
  console.log(error);
});


//Map precipitation indicator snowbird

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%m/%d/%Y");

// Load data
d3.csv("./snowbird.csv").then(function(snowbird) {

  // Print the Data
  console.log(snowbird)
  // Format the date and cast the force value to a number
  snowbird.forEach(function(data) {
    data.DATE = parseTime(data.DATE);
    data.PRCP = +data.PRCP;
  });
// Configure a time scale
  // d3.extent returns the an array containing the min and max values for the property specified
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(snowbird, data => data.DATE))
    .range([0, chartWidth]);

  // Configure a linear scale with a range between the chartHeight and 0
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(snowbird, data => data.PRCP)])
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xTimeScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  // Configure a line function which will plot the x and y coordinates using our scales
  var drawLine = d3.line()
    .x(data => xTimeScale(data.DATE))
    .y(data => yLinearScale(data.PRCP));

  // Append an SVG path and plot its points using the line function
  chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for Data
    .attr("d", drawLine(snowbird))
    .classed("line", true);

  // Append an SVG group element to the chartGroup, create the left axis inside of it
  chartGroup.append("g")
    .classed("axis", true)
    .call(leftAxis);

  // Append an SVG group element to the chartGroup, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);
}).catch(function(error) {
  console.log(error);
});


// Bubble map of averages

// Map and projection
var myMap2 = L.map("map2", {
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
    
  }).bindPopup(`<h1>${precip[i].name}, ${precip[i].average}</h1> `).addTo(myMap2);
}

