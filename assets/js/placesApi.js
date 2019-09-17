var placeSearch, autocomplete, geocoder;

function initAutocomplete() {
  geocoder = new google.maps.Geocoder();
  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')),
      {/*types: ['(cities)'],*/componentRestrictions: {country: 'au'}});

  autocomplete.addListener('place_changed', fillInAddress);
}

function codeAddress(address) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        alert(results[0].geometry.location);
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

function fillInAddress() {
  var place = autocomplete.getPlace();
  locality = place.formatted_address
  console.log(place)
  lat = place.geometry.location.lat()
  lng = place.geometry.location.lng()
  locality = locality.split(' ').join('_')
  navigate(lat,lng,locality);
  //   codeAddress(document.getElementById('autocomplete').value);
}

function navigate(lat,lng,locality) {
  //data = data.split(' ').join('_')
  base_url = 'suburbwisespecies.html'
  new_url =  base_url + '?data=' + lat+'/'+lng+'/'+locality;
  window.location.href = new_url;
}

/*$(document).ready(function() {
    $("#locationField #autocomplete").click(function(index) {
        //Do stuff when click
        //console.log(index.currentTarget.outerText)
        navigate(index.currentTarget.outerText)
        //fetchSpeciesBySuburb(index.currentTarget.outerText)
    });
});*/