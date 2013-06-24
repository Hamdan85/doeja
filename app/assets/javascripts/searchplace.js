function getMapByGeoLocation(address) {
    var geocoder = new google.maps.Geocoder();
    var lat = "";
    var lng = "";
    var latlng = [];

    return latlng = setLatLng(address,function(lat,lng) {

        calcusermarkerhash(lat,lng);

    });

    function setLatLng (address, callback) {
        geocoder.geocode( { 'address': address, 'region': 'br' }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0].geometry.location.lat(), results[0].geometry.location.lng());
            } else {
                result = "Unable to find address: " + status;
            }
        });
    }


}


function calcusermarkerhash(lat, lng) {

    position = new Gmaps.map.createLatLng(lat,lng);

    Gmaps.map.serviceObject.setCenter(position);

    usermarkhash = {"title": "Você", "description": "Você está aqui!", "animation": 'BOUNCE', "picture": "/assets/user.png", "height": 64, "width": 64, "lat": "", "lng": ""};

    usermarkhash['lat'] = lat;
    usermarkhash['lng'] = lng;

    putUserMarker(usermarkhash);
}

function putUserMarker(marker) {

    alert(marker);

    //var position = new google.maps.LatLng(marker.lat, marker.lng);

    Gmaps.map.replaceMarkers(usermarkhash);

    if (Gmaps.map.serviceObject.Mark == 1) {
        //only one marker, choose the zoom level you expect
        Gmaps.map.serviceObject.Zoom(10);
    }
    else {
        //more than one marker, let's auto_zoom
        Gmaps.map.auto_zoom = true;
        Gmaps.map.adjustMapToBounds();
    }
}