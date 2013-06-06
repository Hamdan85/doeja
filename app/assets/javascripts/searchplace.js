function getMapByGeoLocation() {
    //build the address using many fields.
    var city = $("#city").val();
    var street = $("#street").val();
    var neigborhood = $("#neighborhood").val();
    var number = $("#number").val();

    var fulladdress = street + ', ' + number + ', ' + neigborhood + ', ' + city;

    geocoder.geocode(
        {
            'address': fulladdress
        },
        function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var location = results[0].geometry.location;
                console.log(location);
                //map and marker should be previously created
                map.setCenter(location);
                map.setZoom(14);
                marker.setPosition(location);

                //These 2 hidden inputs will be posted to the server
                $("#HotelLatitude").val(location.Ya);
                $("#HotelLongitude").val(location.Za);

            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
}

$("#city, #street, #neighborhood, #number").change(getMapByGeoLocation);