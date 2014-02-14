var myMap;
var canEdit = false;
var userLocation = null;

function Map(lat, lng) {
	var mapOptions = {
		center : new google.maps.LatLng(31.20044877356022, 29.915771484375),
		zoom : 13,
		disableDefaultUI : true,
		scaleControl : true,
		zoomControl : true,
		mapTypeId : google.maps.MapTypeId.ROADMAP
		// disableDoubleClickZoom : true
	};
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
	
	if(lat != null && lng != null) {
		addMarker(lat, lng);
	}

	google.maps.event.addListener(map, 'rightclick', function(event) {
		if(canEdit) {
			if(userLocation != null)
				userLocation.setMap(null);
			addMarker(event.latLng.lat(), event.latLng.lng());
			
			// update the location
			// $("#user_location_lat").val(userLocation.getPosition().lat());
			// $("#user_location_lng").val(userLocation.getPosition().lng());
			$("#user_location_attributes_lat").val(userLocation.getPosition().lat());
			$("#user_location_attributes_lng").val(userLocation.getPosition().lng());
		}

	});
	
	function addMarker(lat, lng) {
		userLocation = new Marker(lat, lng, map);
		userLocation.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
			userLocation.setAnimation(null);
		}, 2000);
		map.panTo(userLocation.getPosition());
	}
}

function Marker(lat, lng, map) {
	var marker = new google.maps.Marker({
		position : new google.maps.LatLng(lat, lng),
		map : map,
		title : "thanks my god",
		animation : google.maps.Animation.DROP,
	});

	return marker;
}

function show() {
	myMap = new Map(currentUserLoc.location.lat, currentUserLoc.location.lng);
}

function edit() {
	var lat = $("#user_location_attributes_lat").val();
	var lng = $("#user_location_attributes_lng").val();
	myMap = new Map(lat, lng);
	canEdit = true;
}

function create() {
	myMap = new Map(null, null);
	canEdit = true;
}