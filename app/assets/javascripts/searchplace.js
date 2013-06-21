function getMapByGeoLocation(address,add) {
    var add = function(){
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({ 'address': address, 'region': 'br' }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                lat = results[0].geometry.location.lat();
                lng = results[0].geometry.location.lng();
            } else {
                alert("Endereço não encontrado: " + status);
            }
        });
        return [lat,lng];
    }

    var arr = Object();

    arr.lat = add[0];
    arr.lng = add[1];
    alert(arr);
    return arr;
}


function calcusermarkerhash(lat, lng) {

    Gmaps.map.serviceObject.setCenter(position);

    usermarkhash = {"title": "Você", "description": "Você está aqui!", "animation": 'BOUNCE', "picture": "/assets/user.png", "height": 64, "width": 64, "lat": "", "lng": ""};

    usermarkhash['lat'] = lat;
    usermarkhash['lng'] = lng;
}

function putUserMarker(marker) {

    var position = new google.maps.LatLng(marker.lat, marker.lng);

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