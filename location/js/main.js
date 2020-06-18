
$(document).ready(function(){



    
    //MENU
    $(transformicons.add('.tcon'));


    $('.activator_menu').on('click', function() {
        $('.menu_location_wrap').toggleClass('open');
        $('.map_wrapper').toggleClass('open');
    });
    $(document).on('click', function(e) {
        if (!$(e.target).closest(".menu_location_wrap, .activator_menu").length) {
            $('.menu_location_wrap').removeClass('open');
            $('.map_wrapper').removeClass('open');
            $(".family_list>li").removeClass("active");
        };
        e.stopPropagation();
    });

    $(".family_list").on("click", ">li", function(){
        $(".family_list li").removeClass("active");
        $(this).addClass("active");
    });


    //widget openWeather
    $('.weather-temperature').openWeather({
        lang: 'us',
        key: 'c9d49310f8023ee2617a7634de23c2aa',
        city: 'Arlington,US',
        placeTarget: '.weather-place',
        units: 'c',
        windSpeedUnit: 'mph',
        descriptionTarget: '.weather_description',
        minTemperatureTarget: '.weather-min-temperature',
        maxTemperatureTarget: '.weather-max-temperature',
        windSpeedTarget: '.weather_wind_speed',
        humidityTarget: '.weather-humidity',
        sunriseTarget: '.weather-sunrise',
        sunsetTarget: '.weather-sunset',
        iconTarget: '.weather-icon',
        customIcons: 'https://raw.githubusercontent.com/christiannaths/Climacons-Font/c24e8093c2d3d982a6c7b1bedb5eebc5ebf7d65f/SVG',
        success: function() {
            $('.weather-temperature').show();
        },
        error: function(message) {
            console.log(message);
        }
    });


});

// TO MAKE THE MAP APPEAR YOU MUST
// ADD YOUR ACCESS TOKEN FROM
// https://account.mapbox.com
mapboxgl.accessToken = 'pk.eyJ1IjoiYWxleDEyNzE0IiwiYSI6ImNrOXVicHFjODAwNmUzbXBnMjFsYmxpZmYifQ.EvrXE5fhp-gUpHLkAyPy6Q';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [-122.4088476, 37.8037343],
    zoom: 16

});

var size = 318;

// implementation of CustomLayerInterface to draw a pulsing dot icon on the map
// see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
var pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

// get rendering context for the map canvas when layer is added to the map
    onAdd: function() {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext('2d');
    },

// called once before every frame where the icon will be used
    render: function() {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = (size / 2) * 0.1;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;

// draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
        context.fill();

// draw inner circle
        context.beginPath();
        context.arc(
            this.width / 2,
            this.height / 2,
            radius,
            0,
            Math.PI * 2
        );
        context.fillStyle = 'rgba(255, 100, 100, 1)';
        context.strokeStyle = 'white';
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

// update this image's data with data from the canvas
        this.data = context.getImageData(
            0,
            0,
            this.width,
            this.height
        ).data;

// continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

// return `true` to let the map know that the image was updated
        return true;
    }
};

map.on('load', function() {
    map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });
    map.addSource('points', {
        'type': 'geojson',
        'data': {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [-122.4088476, 37.8037343]

                    }
                }
            ]
        }
    });
    map.addLayer({
        'id': 'points',
        'type': 'symbol',
        'source': 'points',
        'layout': {
            'icon-image': 'pulsing-dot'
        }
    });
    document.getElementById('my_place').addEventListener('click', function() {
        map.flyTo({
            center: [-122.4088476, 37.8037343],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });
    });
    var popup = new mapboxgl.Popup({ closeOnClick: false, className: 'popup_text' })
        .setLngLat([-122.4088476, 37.8037343])
        .setHTML('<span>You’re here</span>')
        .addTo(map);

    map.loadImage( //isabella
        //'../images/kate_4x.png',
        'http://learning.lanos.co.uk/app/images/kate_4x.png',
        function(error, image) {
            if (error) throw error;
            map.addImage('cat', image);
            map.addSource('point-2', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-122.4120174, 37.8049305]
                            }
                        }
                    ]
                }
            });
            map.addLayer({
                'id': 'points-2',
                'type': 'symbol',
                'source': 'point-2',
                'layout': {
                    'icon-image': 'cat',
                    'icon-size': 0.20
                }
            });
        }
    );//load Image point-2

    document.getElementById('isabella').addEventListener('click', function() {
        map.flyTo({
            center: [-122.4120174, 37.8049305],
            essential: true,
            zoom: 17
        });
    });

    map.loadImage( //daniel
        //'../images/map_icon_2.png',
        'http://learning.lanos.co.uk/app/images/map_icon_2.png',
        function(error, image) {
            if (error) throw error;
            map.addImage('daniel', image);
            map.addSource('point-3', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [
                        {
                            'type': 'Feature',
                            'geometry': {
                                'type': 'Point',
                                'coordinates': [-122.4149523, 37.801437]
                            }
                        }
                    ]
                }
            });
            map.addLayer({
                'id': 'points-3',
                'type': 'symbol',
                'source': 'point-3',
                'layout': {
                    'icon-image': 'daniel',
                    'icon-size': 0.8
                }
            });
        }
    );//load Image point-2

    document.getElementById('daniel').addEventListener('click', function() {
        map.flyTo({
            center: [-122.4149523, 37.801437],
            essential: true,
            zoom: 17
        });
    });




});