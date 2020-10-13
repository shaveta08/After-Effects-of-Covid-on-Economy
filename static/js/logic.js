var Coords = [51.903614, -8.468399];
var mapZoomLevel = 1;
var myMap, light, baseMaps;
var factor = "2020";
var globalData;
Control_layer = L.control.timelineSlider({
	timelineItems: [
		"1980",
		"1981",
		"1982",
		"1983",
		"1984",
		"1985",
		"1986",
		"1987",
		"1988",
		"1989",
		"1990",
		"1991",
		"1992",
		"1993",
		"1994",
		"1995",
		"1996",
		"1997",
		"1998",
		"1999",
		"2000",
		"2001",
		"2002",
		"2003",
		"2004",
		"2005",
		"2006",
		"2007",
		"2008",
		"2009",
		"2010",
		"2011",
		"2012",
		"2013",
		"2014",
		"2015",
		"2016",
		"2017",
		"2018",
		"2019",
		"2020",
	],
	labelWidth: "40px",
	position: "bottomleft",
	changeMap: getDataAddFactor,
	extraChangeMapParams: { exclamation: "Hello World!" },
});

// Create the createMap function
function getDataAddFactor({ label, value, map }) {
	console.log(label, value);
	factor = label;
	map.eachLayer(function (layer) {
		map.removeLayer(layer);
	});
	var platesLayer = createPlatesLayer(globalData);
	platesLayer.addTo(myMap);
}
function createMap(platesLayer, Legend) {
	// Create the tile layer that will be the background of our map
	light = L.tileLayer(
		"https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
		{
			attribution:
				'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
			maxZoom: 18,
			id: "light-v10",
			accessToken: API_KEY,
		}
	);

	// Create a baseMaps object to hold the lightmap layer
	baseMaps = {
		Light: light,
	};

	// Create the map object with options
	myMap = L.map("map-id", {
		center: Coords,
		zoom: 1.5,
		layers: [light, platesLayer],
	});
	Legend.addTo(myMap);
	L.control.scale().addTo(myMap);
	Control_layer.addTo(myMap);
}

function chooseColor(value) {
	//console.log(value);
	if (value === undefined || value === "no data") return "#FFE8D6";
	else if (value > 20) return "#7A0A1E";
	else if (value > 15) return "#93101E";
	else if (value > 10) return "#B71A1E";
	else if (value > 5) return "#DB3026";
	else if (value > 0) return "#FF5035";
	else if (value > -5) return "#FF8767";
	else if (value > -10) return "#FFA985";
	else return "#FFCCAE";
}

function createLegend() {
	var legend = L.control({ position: "bottomright" });
	legend.onAdd = function () {
		var div = L.DomUtil.create("div", "info legend"),
			grades = [-10, -5, 1, 5, 10, 15, 20],
			labels = [];
		div.innerHTML +=
			'<i style="background:' +
			chooseColor("no data") +
			'"></i>no data<br><hr>';
		div.innerHTML +=
			'<i style="background:' +
			chooseColor(-20) +
			'"></i>Less than -10<br><hr>';
		for (var i = -0; i < grades.length; i++) {
			div.innerHTML +=
				'<i style="background:' +
				chooseColor(grades[i] + 1) +
				'"></i>' +
				grades[i] +
				(grades[i + 1] ? " &ndash; " + grades[i + 1] + "<br><hr>" : "+");
		}
		return div;
	};
	return legend;
}

function createPlatesLayer(geoData) {
	return L.geoJSON(geoData, {
		style: function (feature) {
			return {
				color: "#7FFF00",
				fillColor: chooseColor(feature.properties[factor]),
				fillOpacity: 0.7,
				weight: 1.5,
			};
		},
		onEachFeature: function (feature, layer) {
			// Set mouse events to change map styling
			layer.on({
				// When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
				mouseover: function (event) {
					layer = event.target;
					layer.setStyle({
						fillOpacity: 1,
					});
				},
				// When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
				mouseout: function (event) {
					layer = event.target;
					layer.setStyle({
						fillOpacity: 0.7,
					});
				},
				// When a feature (neighborhood) is clicked, it is enlarged to fit the screen
				click: function (event) {
					myMap.fitBounds(event.target.getBounds());
					jsonObject = feature.properties;
					xValues = Object.keys(jsonObject);
					yValues = Object.values(jsonObject);

					addPlot(xValues, yValues);
					console.log();
				},
			});
			// Giving each feature a pop-up with information pertinent to it
			layer.bindPopup(
				"<h2>" +
					feature.properties.Country +
					"</h2> <hr> <h3>" +
					feature.properties[factor] +
					"</h3>"
			);
		},
	});
}
function deleteTrace(divId) {
	Plotly.deleteTraces("plot", 0);
}
function addPlot(xValues, yValues) {
	//console.log(yValues.slice(-4));
	Plotly.plot("plot", [
		{
			x: xValues.slice(0, 41),
			y: yValues.slice(0, 41),
			mode: "lines+markers",
			name: yValues.slice(-4)[0],
		},
	]);
}
function buildPlot(xValues, yValues) {
	//console.log(xValues);
	var trace = {
		x: xValues.slice(0, 41),
		y: yValues.slice(0, 41),
		mode: "lines+markers",
		name: yValues.slice(-1)[0],
	};
	data = [trace];
	layout = {
		title: "Economic Changes Through the years",
		xaxis: {
			title: "Years",
		},
		yaxis: {
			title: "gdp",
		},
	};
	Plotly.newPlot("plot", data, layout);
}
var default_file = "Dataset/gdp.json";

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json("Dataset/countries.geojson", function (geoData) {
	console.log(geoData);
	// var select_instance = d3.select("#instance");
	// select_instance.onChange(function () {
	// 	var select_value = select_instance.property("value");
	// 	if (select_value == "GDP") {
	// 		default_file = "Dataset/gdp.json";
	// 	} else {
	// 		default_file = "Dataset/inf.json";
	// 	}
	// });
	d3.json(default_file, function (gdp) {
		//console.log(gdp);
		geoData.features.forEach((feature) => {
			gdp.forEach((item) => {
				if (feature.properties.ADMIN == item.Country) {
					feature.properties = Object.assign(item, feature.properties);
				}
			});
			//console.log(feature.properties);
		});
		globalData = geoData;
		var xValues = Object.keys(gdp.slice(-1)[0]);
		var yValues = Object.values(gdp.slice(-1)[0]);
		console.log(xValues, yValues);
		buildPlot(xValues, yValues);
		var platesLayer = createPlatesLayer(geoData);
		var Legend = createLegend();
		createMap(platesLayer, Legend);
	});
});
