mapboxgl.accessToken = 'pk.eyJ1IjoicmlzaHVwYWwwNSIsImEiOiJjanp0eG9mMTAwMDUyM210amx1OHZycGZ6In0.1xrOyO0qoTiRh110hkBvSw';
		var map = new mapboxgl.Map({
	container: 'map', // container id
	style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
	center: [144.00,-37.00], // starting position [lng, lat]
	//center: [37.80, 144.00],
	zoom: 6 // starting zoom
	});
	map.addControl(new MapboxGeocoder({
	accessToken: mapboxgl.accessToken,
	mapboxgl: mapboxgl
	}));

	map.addControl(new mapboxgl.GeolocateControl({
	positionOptions: {
	enableHighAccuracy: true
	},
	trackUserLocation: true

	}));
		