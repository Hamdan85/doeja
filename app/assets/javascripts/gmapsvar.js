var mystyles = [
    {
        featureType: 'water',
        elementType: 'all',
        stylers: [
            { hue: '#4C9CF1' },
            { saturation: 74 },
            { lightness: -18 },
            { visibility: 'on' }
        ]
    },{
        featureType: 'landscape',
        elementType: 'all',
        stylers: [
            { hue: '#ffffff' },
            { saturation: -100 },
            { lightness: 100 },
            { visibility: 'on' }
        ]
    },{
        featureType: 'road',
        elementType: 'all',
        stylers: [
            { hue: '#258ecd' },
            { saturation: -31 },
            { lightness: -26 },
            { visibility: 'on' }
        ]
    },{
        featureType: 'landscape.man_made',
        elementType: 'all',
        stylers: [
            { hue: '#ffffff' },
            { saturation: -100 },
            { lightness: 100 },
            { visibility: 'on' }
        ]
    },{
        featureType: 'road.local',
        elementType: 'all',
        stylers: [
            { hue: '#0d77b6' },
            { saturation: -13 },
            { lightness: -62 },
            { visibility: 'on' }
        ]
    }
];
var options = {
    mapTypeControlOptions: {
        mapTypeIds: [ 'Styled']
    },
    center: new google.maps.LatLng(-19.92573152776731, -43.94514908790586),
    zoom: 15,
    mapTypeId: 'Styled'
};
var div = document.getElementById('map');
var map = new google.maps.Map(div, options);
var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
map.mapTypes.set('Styled', styledMapType);
