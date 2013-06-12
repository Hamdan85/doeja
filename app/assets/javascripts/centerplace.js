function getMapByGeoLocation(address) {
    var geocoder = new google.maps.Geocoder();
    var lat = "";
    var lng = "";
    geocoder.geocode( { 'address': address, 'region': 'br' }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
        } else {
            result = "Unable to find address: " + status;
        }

        setTimeout(function() {
            //var bounds = new google.maps.LatLngBounds(new google.maps.LatLng(lat, lng),new google.maps.LatLng(lat, lng));
            Gmaps.map.serviceObject.setCenter(new google.maps.LatLng(lat, lng));
            Gmaps.map.centerAndZoom(new google.maps.LatLng(lat, lng), 0)
        }, 50);

    });
}

