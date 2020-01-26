function appendAssetList(data) {
    var body = '';
    body += '<article class="row no-gutters g-mb-0">';
    body += '   <div class="col-lg-4 g-bg-img-hero g-brd-around g-brd-top-none g-brd-gray-light-v3" style="background-image: url(' + data.url + ');"></div>';
    body += '       <div class="col-lg-8">';
    body += '           <div class="g-brd-around g-brd-top-none g-brd-gray-light-v3 g-bg-white">';
    body += '               <div class="g-pa-5">';
    body += '                   <div class="row">';
    body += '                       <div class="col-12">';
    body += '                           <a href="' + siteurl + 'property/view?id=' + data.id + '"><h3 class="g-font-weight-600 g-font-size-12 g-color-black">' + data.name + '</h3></a>';
    body += '                       </div>';   
    body += '                       <div class="col-6 g-font-size-13">';
    body += '                           <i class="icon-hotel-restaurant-053 u-line-icon-pro"></i> '+data.bathroom;
    body += '                           <i class="icon-hotel-restaurant-125 u-line-icon-pro ml-2"></i> '+data.bedroom;
    body += '                       </div>';
    body += '                       <div class="col-6 text-right g-font-size-13">';
    body += '                           <span class="g-font-weight-600">฿' + Number(data.price).toLocaleString('en') + '</span> | ';
    body += '                           <a href="javascript:void(0)" data-action="favorite" data-id="'+data.id+'"><i class="fa fa-heart"></i></a>';
    body += '                       </div>';
    
    body += '                   </div>';
    body += '               </div>';
    body += '           </div>';
    body += '       </div>';
    body += '   </div>';
    body += '</article>';
    body += '';
    body += '';
    $('#div_assetlist').append(body);
}



function setMapHeight() {
    var headerHeight = parseInt($('#div_header').height());
    var footerHeight = parseInt($('#div_footer').height());
    var bannerHeight = parseInt($('#div_banner_top').height());
    console.log('headerHeight:' + headerHeight);
    console.log('footerHeight:' + footerHeight);
    var screenSize = getWindowSize();
    var mapHeight = screenSize.h - headerHeight - footerHeight;
    console.log('mapHeight:'+mapHeight);
    $('#map').height(mapHeight);
    $('#div_assetlist').height(mapHeight);

}

function getContent() {
    $('#page-load').show();
    var form_data = $('#frm_search').serialize();
    console.log(form_data);
    $.get(apiurl + 'api-assets/avaliable-asset?' + form_data).done(function (res) {
        res = JSON.parse(res);
        console.log(res);
        var assets = res.list;
        $('#div_assetlist').empty();
        var lat, lng;
        $.each(assets, function (key, value) {
            if (key == 0) {
                lat = value.latitude;
                lng = value.longitude;
            }
            appendAssetList(value);
            addNewMarker(value.latitude, value.longitude);
        });
        asset_map_banner();

        setCenter(lat, lng);
        $('a[data-action="favorite"]').on('click',function(e){
            
            var id = $(this).attr('data-id');
            //alert(id);
        });
        
        $('#page-load').hide();
    });
}