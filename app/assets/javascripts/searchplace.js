function getMapByGeoLocation(address) {
    var geocoder = new google.maps.Geocoder();
    var lat = "";
    var lng = "";
    geocoder.geocode( { 'address': address, 'region': 'br' }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            lat = results[0].geometry.location.lat();
            lng = results[0].geometry.location.lng();
        } else {
            alert("Endereço não encontrado: " + status);
        }

        var position = new google.maps.LatLng(lat, lng)


        Gmaps.map.serviceObject.setCenter(position);

        Gmaps.map.createMarker({
            Lat: lat,
            Lng: lng,
            rich_marker: false,
            marker_picture: ""
        });


    });
}