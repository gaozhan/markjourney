/**
 * @fileOverview 旅途的"详细"页
 *               
 * @author qinian<qinian.wmq@taobao.com>
 *
 */

(function () {
    var detail = (function () {
    	
    	var options = {
	      zoom: 12,
	      center: new google.maps.LatLng(22.011, 113.239),
	      mapTypeId:google.maps.MapTypeId.ROADMAP,
	      panControl:false,
	      zoomControl:true,
	      mapTypeControl:false,
	      scaleControl:false,
	      streetViewControl:false,
	      overviewMapControl:false
	    },
	    map,
	    inited = false,
	    infoWindow,
	    route = [
             new google.maps.LatLng(22.028, 113.121),
             new google.maps.LatLng(22.008, 113.111),
             new google.maps.LatLng(21.991, 113.079),
             new google.maps.LatLng(21.981, 113.119)
         ];
        
    	function initMap() {
    		
    		console.log("init map");
    		map = new google.maps.Map(document.getElementById('map'), options);
    		for (var i = 0; i < route.length; i++) {
    	        
    	        // Adding the markers
    	        var marker = new google.maps.Marker({
    	          position: route[i], 
    	          map: map,
    	          title: 'Place number ' + i
    	        });
    	              
    	        // Wrapping the event listener inside an anonymous function 
    	        // that we immediately invoke and passes the variable i to.
    	        (function(i, marker) {
    	          
    	          // Creating the event listener. It now has access to the values of
    	          // i and marker as they were during its creation
    	          google.maps.event.addListener(marker, 'click', function() {
    	            
    	        	// Check to see if we already have an InfoWindow  
    	            if (!infoWindow) {
    	            	infoWindow = new google.maps.InfoWindow();
    	            }
    	            
    	            // Setting the content of the InfoWindow
    	            if (i < 3) {
    	            	infoWindow.setContent(
    	                        '<img src="img/squirrel.jpg" alt="" />' + 
    	                        '<span>No ' + (i+1) + '</span>' );
    	            } else {
    	            	var video = document.createElement('video');
    	                video.setAttribute('src',
    	                    'http://upload.wikimedia.org/wikipedia/commons/3/3f/ACA_Allertor_125_video.ogv');
    	                video.setAttribute('width', '300');
    	                video.setAttribute('height', '200');
    	                video.setAttribute('controls', 'controls');
    	                video.setAttribute('autoplay', 'autoplay');
    	                infoWindow.setContent(video);
    	            }
    	            
    	            
    	            // Tying the InfoWindow to the marker 
    	            infoWindow.open(map, marker);
    	            
    	          });
    	          
    	        })(i, marker);      
    	      }
    	    
    	    // Creating the polyline object
    	    var polyline = new google.maps.Polyline({
    	      path: route,
    	      strokeColor: "#ff0000",
    	      strokeOpacity: 0.6,
    	      strokeWeight: 5
    	    });
    	    
    	    // Adding the polyline to the map
    	    polyline.setMap(map);
    	}
    	
    	function initTrip() {
    		console.log("init Trip");
    		inited = true;
    	}

        return {
            render:function (obj) {
                if (!inited) {
                	console.log(obj.name);
                	initMap();
                    initTrip();
                }
            }
        }
    })();

    window.MJ = window.MJ || {};
    window.MJ.detail = detail;

})();