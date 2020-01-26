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
    body += '                           <i class="icon-hotel-restaurant-053 u-line-icon-pro"></i> ' + data.bathroom;
    body += '                           <i class="icon-hotel-restaurant-125 u-line-icon-pro ml-2"></i> ' + data.bedroom;
    body += '                       </div>';
    body += '                       <div class="col-6 text-right g-font-size-13">';
    body += '                           <span class="g-font-weight-600">฿' + Number(data.price).toLocaleString('en') + '</span> | ';
    body += '                           <a href="javascript:void(0)" data-action="favorite" data-id="' + data.id + '"><i class="fa fa-heart"></i></a>';
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

function getContent() {
    $('#page-load').show();
    var form_data = $('#frm_search').serializeArray();
    //console.log(form_data);
    var search_url = '', param = '', param_value = '', params = [];

    $.each(form_data, function (key, value) {
        //param_value = value.value;
        // param = value['name'].replace('[]','');
        param = value['name'].replace('[]', '');
        if (value['name'].endsWith('[]')) {
            
            if (!(param in params)) {
                params[param] = [];
                
            }
            params[param].push(value.value);
            param = '';
        } else {
            params[param] = value.value;
        }
    });
    
    console.log(params);
    if(typeof params['asset_for'] !== 'undefined'){
        search_url += '&for='+params['asset_for'];
    }
    if(typeof params['orderby'] !== 'undefined'){
        search_url += '&order='+params['orderby'];
    }
    if(typeof params['price_start'] !== 'undefined'){
        search_url += '&price_start='+params['price_start'];
    }
    if(typeof params['price_end'] !== 'undefined'){
        search_url += '&price_end='+params['price_end'];
    }
    if(typeof params['search_text'] !== 'undefined'){
        search_url += '&search_text='+params['search_text'];
    }
    if(typeof params['search_province_id'] !== 'undefined'){
        
        $.each(params['search_province_id'],function(key,value){
            if(key===0){
                param_value = value;
            }else{
                param_value = param_value+','+value;
            }
        });
        search_url += '&province='+param_value;
        param_value = '';
    }
    if(typeof params['search_asset_type_id'] !== 'undefined'){
        
        $.each(params['search_asset_type_id'],function(key,value){
            if(key===0){
                param_value = value;
            }else{
                param_value = param_value+','+value;
            }
        });
        search_url += '&type='+param_value;
        param_value = '';
    }
    //console.log(search_url);
    


    $.get(apiurl + 'api-assets/avaliable-asset?' + search_url).done(function (res) {
        res = JSON.parse(res);
        console.log(res);
        var assets = res.list;
        $('#div_assetlist').empty();
        var lat, lng;
        clearMarkers();
        $.each(assets, function (key, value) {
            if (key == 0) {
                lat = value.latitude;
                lng = value.longitude;
            }
            appendAssetList(value);
            assetMarker(value.latitude, value.longitude, value);
        });
        asset_map_banner();

        setCenter(lat, lng);
        $('#page-load').hide();
    });
}

$(document).ready(function () {
    $('#page-load').show();
    $.get(apiurl + 'api-assets/avaliable-asset?province=1').done(function (res) {
        res = JSON.parse(res);
        var assets = res.list;
        $('#div_assetlist').empty();
        var lat, lng;
        $.each(assets, function (key, value) {
            if (key == 0) {
                lat = value.latitude;
                lng = value.longitude;
            }
            appendAssetList(value);
            assetMarker(value.latitude, value.longitude, value);
        });
        asset_map_banner();

        setCenter(lat, lng);
        $('a[data-action="favorite"]').on('click', function (e) {

            var id = $(this).attr('data-id');
            //alert(id);
        });
        $('#page-load').hide();
    });

    



});