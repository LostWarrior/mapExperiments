function initMap(sensors){

	console.log('initmap called');

	var bounds  = new google.maps.LatLngBounds();
	var infowindow = new google.maps.InfoWindow(); 


	var mapDiv = document.getElementById('map-canvas');

	var overlay = new google.maps.OverlayView(); 

	map = new google.maps.Map(mapDiv, {
	  zoom: 18,
	  center: {lat:51.7063278, lng: -0.612019444444444}
	});

	for(var i = 0; i < sensors.length; i++){

		var sensor = sensors[i];

		console.log(sensor);

		var marker = new google.maps.Marker({
		    map: map,
		    draggable: true,
		    animation: google.maps.Animation.DROP,
		   	title:sensor[0],
	    	position: {lat: sensors[i][1], lng: sensors[i][2]}

	  	});
	}


		// google.maps.event.addListener(marker, 'click', (function(marker, i) {
		//     return function() {
		//       infowindow.setContent(sensors[i][0]);
		//       infowindow.open(map, marker);
		//     }
		//   })(marker, i));
	
}