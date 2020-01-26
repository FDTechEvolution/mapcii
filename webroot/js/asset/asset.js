$(document).ready(function () {
    mapWithMarkerDraggable('map');

    $('#li_utility').css('pointer-events', 'none');
    $('#li_place').css('pointer-events', 'none');
    $('#li_address').css('pointer-events', 'none');
    $('#li_image').css('pointer-events', 'none');

    

    //set options
    var asset_option_url = apiurl + 'api-assets/option?type=faci';
    $.get(asset_option_url).done(function (res) {
        var options = JSON.parse(res);
        //console.log(asset_types.types);
        $.each(options.optionlist, function (key, item) {
            //console.log(item);
            var c = '<div class="col-3">';
            c += '<label class="form-check-label g-mb-20">';
            c += '<input type="checkbox" name="asset_option[][option_id]" class="form-check-input mr-1" value="' + item.id + '"><span></span>';
            c += item.name + '</label></div>';

            $('#div_fac').append(c);
        });
    });

    var asset_option_url = apiurl + 'api-assets/option?type=plac';
    $.get(asset_option_url).done(function (res) {
        var options = JSON.parse(res);
        //console.log(asset_types.types);
        $.each(options.optionlist, function (key, item) {
            //console.log(item);
            var c = '<div class="col-3">';
            c += '<label class="form-check-label g-mb-20">';
            c += '<input type="checkbox" name="asset_option[][option_id]" class="form-check-input mr-1" value="' + item.id + '"><span></span>';
            c += item.name + '</label></div>';

            $('#div_plac').append(c);
        });
    });


    //Asset process
    //Detail save
    $('#bt_save_detail').on('click', function () {
        if ($('#frm_detail').valid()) {

            var formdata = $("#frm_detail").serialize();
            $('#page-load').show();
            $.post(apiurl + 'api-assets/create', formdata).done(function (res) {
                res = JSON.parse(res);
                console.log(res);
                if (res.status === 200) {
                    $('#asset_id').val(res.data.id);
                    $('#address_id').val(res.data.address_id);

                    //enable other bt
                    $('#li_utility').css('pointer-events', 'auto');
                    $('#li_place').css('pointer-events', 'auto');
                    $('#li_address').css('pointer-events', 'auto');
                    $('#li_image').css('pointer-events', 'auto');
                    success('บันทึกแล้ว');
                    window.location.href = siteurl+'myassets/update?id='+res.data.id;
                }
                $('#page-load').hide();
            });

        }
    });

    //Address save
    $('#bt_save_address').on('click', function () {
        if ($('#frm_address').valid()) {
            $('#page-load').show();
            var formdata = $("#frm_address").serialize();
            var address_id = $('#address_id').val();
            $.post(apiurl + 'api-address/update?id='+address_id, formdata).done(function (res) {
                res = JSON.parse(res);
                console.log(res);
                if (res.status === 200) {
                    
                }
            });
        }
    });

    //Utility save
    $('#bt_save_utility').on('click', function () {
        if ($('#frm_address').valid()) {
            $('#page-load').show();
            var formdata = $("#frm_utility").serialize();
            var asset_id = $('#asset_id').val();
            var url = apiurl + 'api-assets/create-asset-option?id=' + asset_id;
            $.post(url, formdata).done(function (res) {
                res = JSON.parse(res);
                console.log(res);
                if (res.status === 200) {
                    success('บันทึกแล้ว ' + res.message);
                }
                $('#page-load').hide();
            });
        }
    });

});