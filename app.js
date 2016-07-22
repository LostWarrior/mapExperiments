function initMap(sensors,styleArray,data){

	var bounds  = new google.maps.LatLngBounds();
	var infowindow = new google.maps.InfoWindow(); 


	var mapDiv = document.getElementById('map-canvas');

	var overlay = new google.maps.OverlayView(); 

	// Create Map //

	map = new google.maps.Map(mapDiv, {
	  zoom: 18,
	  styles: styleArray,
	  center: {lat:51.7063278, lng: -0.612019444444444}
	});


	overlay.onAdd = function(){

		var width = 1200;

	   	var height = 500;

		var layer = d3.select(this.getPanes().overlayLayer)
					  .append("div")
					  .attr({'width': width, 'height': height})
        			  .attr("class", "zones");


        overlay.draw = function(){

        	var projection = this.getProjection();

        	var padding = 10;

        	var svg = layer.append('svg')
        				   .attr({'width': width, 'height': height});

        	var marker = svg.selectAll('.marker')
        					.data(sensors);

        	marker.enter().append('g')
        		  .attr('class','marker');

        	var markerImage = marker.selectAll('.markerImage')
        							.data(sensors);



			markerImage.enter().append("svg:image")
				  .attr('xlink:href', "location.png")
				  .attr({'width': '40px', 'height': '40px','class': 'markerImage'})
		          .attr("x", function(d,i){
		          	var coord = transform(d);
		          	return coord[0] - padding;
		          })
		          .attr("y", function(d,i){
		          	var coord = transform(d);
		          	return coord[1] - padding;
		          })
		         
		    markerImage.on('click', function(d,i){
        		  	console.log('hey there');
        		  	d3.event.stopPropagation();
        		  });



		    marker.append('text')
					.attr("x", function(d,i){
						var coord = transform(d);
		          		return coord[0] + (padding * 3);
					})
					.attr("y",function(d,i){
						var coord = transform(d);
		          		return coord[1] + (padding * 2);
					})
					.attr("dy", ".31em")
					.text(function(d) { 
						return d[0]; 
					});

			function transform(d){
				d = new google.maps.LatLng(d[1], d[2]);

		        d = projection.fromLatLngToDivPixel(d);

		        return [d.x, d.y];

			}

        }
	}
	

	overlay.setMap(map);
}


