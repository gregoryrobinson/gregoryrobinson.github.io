window.onload = getLocation;

/*
Here we will check the browser supports the Geolocation API; if exists, then we will display the location
*/
var geo = navigator.geolocation;
function getLocation() {
if( geo ) {
geo.getCurrentPosition( displayLocation );
} else {
alert( "Oops, Geolocation API is not supported" );
}
}

/*
This function displays the latitude and longitude when the browser has a location.
*/
function displayLocation( position ) {
var latitude = position.coords.latitude;
var longitude = position.coords.longitude;

var div = document.getElementById( 'location' );
div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;

// Call showMap function once we've updated other div's on the page
displayMap( position.coords );
}

// Global Variable that will hold Google Map
var map;

/*
This method is used to display Google Map.
*/
function displayMap( coords ) {
var googleLatAndLong = new google.maps.LatLng( coords.latitude, coords.longitude );

var mapOptions = {
zoom: 8,
center: googleLatAndLong,
mapTypeId: google.maps.MapTypeId.ROADMAP,
};

var mapDiv = document.getElementById( 'map' );
map = new google.maps.Map( mapDiv, mapOptions );

var title = 'Your Location';
var content = 'You are here: ' + coords.latitude + ', ' + coords.longitude;
addMarker( map, googleLatAndLong, title, content );
var ourStore = {lat: 37.564566, lng: -122.320844};
title = "ABC Toys Location";
content = 'Our store is located here: ' + ourStore.lat + ', ' + ourStore.lng;
addMarker( map, ourStore, title, content );

calcRoute(googleLatAndLong, ourStore);
}

/* 
 This function creates a marker, an InfoWindow and add a click handler on the Marker.
 */
 function addMarker ( map, latlong, title, content ) {
 var markerOptions = {
 position: latlong,
 map: map,
 title: title,
 clickable: true
 };
var marker = new google.maps.Marker( markerOptions );
var infoWindowOptions = {
 content: content,
 position: latlong
 };
var infoWindow = new google.maps.InfoWindow( infoWindowOptions );
 google.maps.event.addListener( marker, 'click', function() {
 infoWindow.open(map);
 });
 }

/* 
 This function provides driving directions
 */
function calcRoute(start, end) {
 var directionsDisplay = new google.maps.DirectionsRenderer();
 var directionsService = new google.maps.DirectionsService();
 directionsDisplay.setMap(map);
 directionsDisplay.setPanel(document.getElementById('directions'));

 var request = {
    origin:start,
    destination:end,
    travelMode: 'DRIVING'
  };
  directionsService.route(request, function(response, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(response);
    }
  });
}