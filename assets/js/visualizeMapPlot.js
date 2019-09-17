// import finalData from 'suburbWiseSpecies.js';
url = window.location.href;
val = url.split('data=').pop();
var finalData;
fetchLocationsBySuburb(val);

//function to fetch all species by suburb Name. 
function fetchLocationsBySuburb(val){
  $('#loading-image').show();
  $.ajax({
  type: "GET",
  url: "https://j0uvsseb90.execute-api.ap-southeast-2.amazonaws.com/fetchlocations/" + val + "/" + 100,
  crossDomain: true,
  contentType: "application/json",
  success: function(data, status){
  finalData = data.data
  if (finalData == undefined){
    fetchLocationsBySuburb(val)
  }
  else{
    console.log(finalData)
    plotData = jsonToGeoJson(finalData)
    console.log(plotData)
    plotMap(plotData)
    
    $('#headr #outer_map  h1').html("<center>Explore Other Locations for "+finalData[0].commonName+" in "+finalData[0].state +" </center>")
    var image = finalData[0].image.split(' ').join('_')
    $('#headr #new_text h2').html(finalData[0].commonName+"<br><img src=images/"+image+".jpg alt=''/>")
    

    }
      $('#loading-image').hide();

  }
  });
};


function jsonToGeoJson(finalData){
  var geojson = {
  type: "FeatureCollection",
  features: [],
  }
  for (i = 0; i < finalData.length; i++) {
    /*$.getJSON(finalData, function(raw){
    $.each(raw, function(index, data){*/
    geojson.features.push({
    "type": "Feature",
    "geometry": {
      "type": "Point",
      "coordinates": [finalData[i].lng, finalData[i].lat]
    },
    "properties": {
      "eventDate": finalData[i].eventDate,
      "lat": finalData[i].lat,
      "lng": finalData[i].lng,
      "is_Dangerous":finalData[i].is_Dangerous,
      "description": finalData[i].description,
      "commonName":finalData[i].commonName,
      "locality":finalData[i].locality,
      "image":finalData[i].image,
      
    }
    });
  }
    return geojson
    };

function plotMap(geojson) {
  
  mapboxgl.accessToken = 'pk.eyJ1IjoicmlzaHVwYWwwNSIsImEiOiJjanp0eG9mMTAwMDUyM210amx1OHZycGZ6In0.1xrOyO0qoTiRh110hkBvSw';

  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
    center: [145.46332,-37.814], // starting position [lng, lat]
    //center: [37.80, 144.00],
    
    zoom: 7 // starting zoom
    });
  map.addControl(new mapboxgl.NavigationControl());
  map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
  enableHighAccuracy: true
  },
  trackUserLocation: true

  }));
  // code from the next step will go here!
  geojson.features.forEach(function(marker) {
    //feature = geojson.features[0];
    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';
    marker.properties.image = marker.properties.image.split(' ').join('_')
    el.style.backgroundImage = 'url(images/'+marker.properties.image+'.jpg)';
    el.style.width = '30px';
    el.style.height = '30px';

    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    new mapboxgl.Marker(el)
    .setLngLat(marker.geometry.coordinates)
    .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML('<div id="popup-container"><img class="image fit" src= images/'+marker.properties.image+'.jpg  alt="" height="100" width="100" /> ' +'<H3>' + marker.properties.commonName + '</H3><p> Spotted on: ' + marker.properties.eventDate + '</p><p> Locality: ' + marker.properties.locality + '</p>'))
    .addTo(map);
  });
}
