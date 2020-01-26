function setMapHeight() {
    var headerHeight = parseInt($('header[data-id="div_header"]').height());
    var footerHeight = parseInt($('#div_footer').height());
    var bannerHeight = parseInt($('#div_banner_top').height());
    console.log('headerHeight:' + headerHeight);
    console.log('footerHeight:' + footerHeight);
    var screenSize = getWindowSize();
    var mapHeight = screenSize.h - headerHeight - footerHeight - bannerHeight;
    console.log('mapHeight:' + mapHeight);
    $('#map').height(mapHeight);
    $('#div_assetlist').height(mapHeight);

}

$(document).ready(function () {
    /*
     newMap('map');
     setMapHeight();
     
     $('#div_assetlist').scroll(function () {
     //$("span").css("display", "inline").fadeOut("slow");
     });
     */

    $.get(apiurl + 'api-articles?limit=1', {}, function (data) {
        var json = JSON.parse(data);
        json = json[0];
        //console.log(json);
        var str = '<article>';
        str += '<h3 class=" g-font-weight-700 g-mb-10">';
        str += '<a class="u-link-v5 g-color-gray-dark-v2 g-color-primary--hover" href="' + siteurl + 'article/read/' + json['id'] + '">' + json['title'] + '</a>';
        str += '</h3>';
        str += '<img class="img-fluid w-100 g-mb-20" src="' + json['image']['url'] + '" alt="">';
        str += '<p>' + json['short_content'] + '</p>';

        str += '</article>';

        $('#box_article').append(str);
    });



    $.get(apiurl + 'api-assets/avaliable-asset?limit=3&orderby=datedesc').done(function (res) {
        res = JSON.parse(res);
        //console.log(res);
        $.each(res['list'], function (index, value) {
            var str = '<div class="col-md-3">';
            str += '<article>';
            str += '<img class="img-fluid w-100" src="' + value['url'] + '" alt="">';
            str += '<div class="g-brd-around g-brd-top-none g-brd-gray-light-v3 g-bg-white">';
            str += '<ul class="d-flex list-inline g-brd-y g-brd-gray-light-v3 mb-0">';
            str += '<li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-10 mr-0">';
            var bedroom = '-';
            if ((typeof value['bedroom']) === "string") {
                bedroom = value['bedroom'];
            }
            var bathroom = '-';
            if ((typeof value['bathroom']) === "string") {
                bathroom = value['bathroom'];
            }
            var usefulspace = '-';
            if ((typeof value['usefulspace']) === "string") {
                usefulspace = value['usefulspace'];
            }
            str += '            <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i> ' + bedroom + '</li>';
            str += '<li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-10 mr-0">';
            str += '            <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i> ' + bathroom + '</li>';
            str += '<li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-10 mr-0">';
            str += '            <i class="align-middle g-color-text mr-1 icon-real-estate-047 u-line-icon-pro"></i> ' + usefulspace + '</li>';
            str += '</ul>';

            str += '<div class="g-pa-10">';
            str += ' <h3 class="g-font-weight-600 g-font-size-16">฿' + Number(value['price']).toLocaleString('en') + '</h3>';
            str += '<p><a href="' + siteurl + 'property/view?id=' + value['id'] + '">' + value['name'].substr(0, 55) + '...</a></p>';
            str += '</div>';
            str += '</article>';
            str += '</div>';

            $('#box_last_asset').append(str);
        });
    });

    $.get(apiurl + 'api-assets/avaliable-asset?limit=4&orderby=datedesc').done(function (res) {
        res = JSON.parse(res);
        //console.log(res);
        $.each(res['list'], function (index, value) {
            var str = '<div class="col-md-3">';
            str += '<article>';
            str += '<img class="img-fluid w-100" src="' + value['url'] + '" alt="">';
            str += '<div class="g-brd-around g-brd-top-none g-brd-gray-light-v3 g-bg-white">';
            str += '<ul class="d-flex list-inline g-brd-y g-brd-gray-light-v3 mb-0">';
            str += '<li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-10 mr-0">';
            var bedroom = '-';
            if ((typeof value['bedroom']) === "string") {
                bedroom = value['bedroom'];
            }
            var bathroom = '-';
            if ((typeof value['bathroom']) === "string") {
                bathroom = value['bathroom'];
            }
            var usefulspace = '-';
            if ((typeof value['usefulspace']) === "string") {
                usefulspace = value['usefulspace'];
            }
            str += '            <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i> ' + bedroom + '</li>';
            str += '<li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-10 mr-0">';
            str += '            <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i> ' + bathroom + '</li>';
            str += '<li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-10 mr-0">';
            str += '            <i class="align-middle g-color-text mr-1 icon-real-estate-047 u-line-icon-pro"></i> ' + usefulspace + '</li>';
            str += '</ul>';

            str += '<div class="g-pa-10">';
            str += ' <h3 class="g-font-weight-600 g-font-size-16">฿' + Number(value['price']).toLocaleString('en') + '</h3>';
            str += '<p><a href="' + siteurl + 'property/view?id=' + value['id'] + '">' + value['name'].substr(0, 55) + '...</a></p>';
            str += '</div>';
            str += '</article>';
            str += '</div>';

            $('#box_last_second_asset').append(str);
        });
    });

    $.get(apiurl + 'api-assets/avaliable-asset?limit=4&orderby=datedesc').done(function (res) {
        res = JSON.parse(res);
        //console.log(res);
        $.each(res['list'], function (index, value) {
            var str = '<div class="col-md-3">';
            str += '<article>';
            str += '<img class="img-fluid w-100" src="' + value['url'] + '" alt="">';
            str += '<div class="g-brd-around g-brd-top-none g-brd-gray-light-v3 g-bg-white">';
            str += '<ul class="d-flex list-inline g-brd-y g-brd-gray-light-v3 mb-0">';
            str += '<li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-py-10 mr-0">';
            var bedroom = '-';
            if ((typeof value['bedroom']) === "string") {
                bedroom = value['bedroom'];
            }
            var bathroom = '-';
            if ((typeof value['bathroom']) === "string") {
                bathroom = value['bathroom'];
            }
            var usefulspace = '-';
            if ((typeof value['usefulspace']) === "string") {
                usefulspace = value['usefulspace'];
            }
            str += '            <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-022 u-line-icon-pro"></i> ' + bedroom + '</li>';
            str += '<li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-10 mr-0">';
            str += '            <i class="align-middle g-color-text mr-1 icon-hotel-restaurant-008 u-line-icon-pro"></i> ' + bathroom + '</li>';
            str += '<li class="list-inline-item col-4 g-font-weight-500 g-font-size-13 text-center g-px-0 g-brd-x g-brd-gray-light-v3 g-py-10 mr-0">';
            str += '            <i class="align-middle g-color-text mr-1 icon-real-estate-047 u-line-icon-pro"></i> ' + usefulspace + '</li>';
            str += '</ul>';

            str += '<div class="g-pa-10">';
            str += ' <h3 class="g-font-weight-600 g-font-size-16">฿' + Number(value['price']).toLocaleString('en') + '</h3>';
            str += '<p><a href="' + siteurl + 'property/view?id=' + value['id'] + '">' + value['name'].substr(0, 55) + '...</a></p>';
            str += '</div>';
            str += '</article>';
            str += '</div>';

            $('#box_last_newproject_asset').append(str);
        });
    });



    //Search section
    $("#bt-search").on("click", function (e) {
        e.preventDefault();
        $('#frm_search').attr('action', siteurl+"search").submit();
    });



});

$(window).resize(function () {
    setMapHeight();
});