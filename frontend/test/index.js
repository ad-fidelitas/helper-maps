// This example creates a simple polygon representing the Bermuda Triangle.

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: {lat: 24.886, lng: -70.268},
      mapTypeId: 'terrain'
    });
  
    // Define the LatLng coordinates for the polygon's path.
    var triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757},
      {lat: 25.774, lng: -80.190}
    ];
  
    // Construct the polygon.
    var bermudaTriangle = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: '#FF0F00',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FFF000',
      fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);
  }