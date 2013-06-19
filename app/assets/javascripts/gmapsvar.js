var mystyles = [
    {
        featureType: 'water',
        elementType: 'all',
        stylers: [
            { hue: '#79a3fa' },
            { saturation: 87 },
            { lightness: -4 },
            { visibility: 'simplified' }
        ]
    },
    {
        featureType: 'road',
        elementType: 'all',
        stylers: [

        ]
    },
    {
        featureType: 'landscape.natural',
        elementType: 'all',
        stylers: [
            { hue: '#e8e9ef' },
            { saturation: 3 },
            { lightness: -3 },
            { visibility: 'on' }
        ]
    },
    {
        featureType: 'poi',
        elementType: 'all',
        stylers: [
            { hue: '#cccccc' },
            { saturation: -100 },
            { lightness: 9 },
            { visibility: 'simplified' }
        ]
    },
    {
        featureType: 'transit',
        elementType: 'all',
        stylers: [
            { hue: '#b8babc' },
            { saturation: 3 },
            { lightness: -3 },
            { visibility: 'simplified' }
        ]
    },
    {
        featureType: 'administrative',
        elementType: 'all',
        stylers: [

        ]
    },
    {
        featureType: 'road.arterial',
        elementType: 'all',
        stylers: [

        ]
    }
];
var options = {
    mapTypeControlOptions: {
        mapTypeIds: [ 'Styled']
    }
};