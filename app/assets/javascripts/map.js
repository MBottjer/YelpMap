$.getJSON('/map/data/', function (yelpData) {
	var map = L.map('map', {
		center: [ yelpData[0].latitude, yelpData[0].longitude ],
		zoom:5
	});
	var noiseLevelIconClass = {
		'quiet': 'volume-off',
		'average': 'volume-down',
		'loud': 'volume-up',
		'very_loud': 'volume-up',
		undefined: 'info'
	}
	L.tileLayer('http://{s}.tiles.mapbox.com/v3/livingston.j9a1923b/{z}/{x}/{y}.png').addTo(map);
	// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png?{foo}').addTo(map);
	var latitudes = [], longitudes = [];
	var tree = rbush();
	yelpData.forEach(function (data) {
		latitudes.push(data.latitude);
		longitudes.push(data.longitude);
		var pointMarker = L.marker([data.latitude, data.longitude], {
  			icon: L.AwesomeMarkers.icon({
  				prefix: 'fa',
  				icon: noiseLevelIconClass[data.attributes["Noise Level"]],
  				markerColor: 'red'
  			})
		});
		var point = [ data.latitude, data.longitude, data.latitude, data.longitude, { marker: pointMarker } ];
		tree.insert(point);
	});
	var maxLat = Math.max.apply(Math, latitudes),
			minLat = Math.min.apply(Math, latitudes),
			maxLong = Math.max.apply(Math, longitudes),
			minLong = Math.min.apply(Math, longitudes);
	map.fitBounds([
		[maxLat, maxLong],
		[minLat, minLong]
	]);
	var markers;
	var renderPoints = function (evt) {
		var bounds = map.getBounds(),
				activePoints = tree.search([bounds._southWest.lat, bounds._southWest.lng,  bounds._northEast.lat, bounds._northEast.lng]);
		markers && map.removeLayer(markers);
		markers = new L.FeatureGroup();
		activePoints.forEach(function (point) {
				point[4].marker.addTo(markers);
		});
		markers.addTo(map);
	};
	map.on('moveend', renderPoints);
	renderPoints()
});