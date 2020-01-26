var map, marker, position,markers = [];
var default_latLong = {lat: 13.756494, lng: 100.494037};

function newMap(id, latLong = {}) {
    console.log('latLong.length:' + latLong.lat);
    if (latLong.lat === undefined) {
        latLong = default_latLong;
    }
    map = new google.maps.Map(document.getElementById(id), {
        center: latLong,
        zoom: 11
    });
}
function mapWithMarker(id, latLong = {}){
    if (latLong.lat === undefined) {
        latLong = default_latLong;
    }

    map = new google.maps.Map(document.getElementById(id), {
        zoom: 11,
        center: latLong
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: latLong
    });

}

function mapWithMarkerDraggable(id, latLong = {}){
    if (latLong.lat === undefined) {
        latLong = default_latLong;
    }

    map = new google.maps.Map(document.getElementById(id), {
        zoom: 11,
        center: latLong
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: latLong
    });
    //console.log(map);
    //marker.addListener('click', toggleBounce);
    map.addListener('mousemove', function () {
        //console.log(marker.getPosition().lat());
        //alert(marker.getPosition());
        position = marker.getPosition();
        document.getElementById('latitude').value = position.lat();
        document.getElementById('longitude').value = position.lng();
    });
}

function setCenter(lat, lng) {
    var myLatLng = new google.maps.LatLng(lat, lng);
    map.setCenter(myLatLng);
}

function addNewMarker(lat, lng) {
    var myLatLng = new google.maps.LatLng(lat, lng);
    var assetMarker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: myLatLng
    });
}
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    //markers = [];
}

function assetMarker(lat, lng, data) {
    var markerImage = {
        url: "https://office.mapcii.com/img/icon/map_label.png",
        size: new google.maps.Size(100, 33),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(40, 40)
    };

    var myLatLng = new google.maps.LatLng(lat, lng);
    var price = (parseFloat(data.price) / 1000000).toString() + 'ลบ';


    var contentString = '<div class="container" style="width:240px;padding:0px;">' +
            '<div class="row no-gutters">' +
            '<div class="col-4"><image src="' + data.url + '" class="w-100" /></div>' +
            '<div class="col-8" style="padding-left:3px;">' +
            '<p style="margin-bottom:0.5rem;">' +
            '<i class="icon-hotel-restaurant-053 u-line-icon-pro"></i> ' + data.bathroom + ' - ' +
            '<i class="icon-hotel-restaurant-125 u-line-icon-pro"></i> ' + data.bedroom + ' - ' +
            Number(data.usefulspace).toLocaleString('en') + ' ตรม.</p>' +
            '<p class="g-font-weight-600 g-color-primary">฿' + Number(data.price).toLocaleString('en') + '</p>' +
            '</div>' +
            '</div>' +
            '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var assetMarker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: myLatLng,
        icon: markerImage,
        label: {
            text: price,
            color: "#424242",
            fontWeight: "bold"
        }
    });

    assetMarker.addListener('mouseover', function () {
        infowindow.open(map, assetMarker);
    });
    
    markers.push(assetMarker);
}