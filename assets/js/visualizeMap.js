mapboxgl.accessToken = 'pk.eyJ1IjoicmlzaHVwYWwwNSIsImEiOiJjanp0eG9mMTAwMDUyM210amx1OHZycGZ6In0.1xrOyO0qoTiRh110hkBvSw';

  var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
  center: [141.44652,-34.246944], // starting position [lng, lat]
  //center: [37.80, 144.00],
  zoom: 9 // starting zoom
  });


 var cities = {
  "type": "FeatureCollection",
  "features": [
  {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "type": "Point",
    "coordinates": [
      141.44652,
      -34.246944
  ]
},"properties": {
        'title': 'Peregrine Espresso',
        'description': '1718 14th St NW, Washington, DC',
        // one can customize markers by adding simplestyle properties
        // https://www.mapbox.com/guides/an-open-platform/#simplestyle
        'marker-size': 'large',
        'marker-color': '#BE9A6B',
        'marker-symbol': 'cafe'
    }
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "Point",
"coordinates": [
140.89,
-34
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "Point",
"coordinates": [
141.70,
-36.5
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "Point",
"coordinates": [
142.812,
-37.408
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "Point",
"coordinates": [
142.5,
-34.60
]
}
},
{
"type": "Feature",
"properties": {},
"geometry": {
"type": "Point",
"coordinates": [
141.56,
-35.67
]
}
}
]
};

var geoJson = cities.features;
 
/*var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: [141.44652,-34.246944],
zoom: 
});*/
map.addSource("symbols", {
        "type": "geojson",
        "data":"cities"});

//var geoJson = cities.features;
map.on('load', function() {
	map.addLayer({

      "id": "style-1",
      "type": "circle",
      "source": "symbols",

      "paint": {
        "circle-radius": "{radius}",
        "circle-color": "#1DC5B3",
        "circle-opacity": 0.4,
        "text-size": 12
      },

      "layout": {
        "text-field": "{title}",
        "text-offset": [0, 0.6],
        "text-anchor": "top"
      },

      "interactive" : true,
      "minzoom" : 0,
      "maxzoom": 22
    });
 
cities.features.forEach(function(city, index) {
setTimeout(function() {

map.jumpTo({center: city.geometry.coordinates});
}, 3000 * index);

});


});